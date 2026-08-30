"""Runtime configuration service with Supabase integration."""

import logging
import time
from typing import Optional

import httpx

from app.core import settings
from app.schemas.admin import RuntimeConfig, ConfigPatch

logger = logging.getLogger(__name__)

# Cache duration in seconds
CACHE_TTL = 30


class RuntimeConfigService:
    """Manages AI runtime configuration with Supabase backend and fallback."""

    def __init__(self):
        self._cache: Optional[RuntimeConfig] = None
        self._cache_time: float = 0
        self._last_known_good: Optional[RuntimeConfig] = None

    async def get_config(self) -> RuntimeConfig:
        """Get current configuration from cache, Supabase, or defaults.

        Priority:
        1. Cache (if fresh)
        2. Supabase/Lovable (if available)
        3. Last known good
        4. Environment defaults

        Never raises; always returns a valid config with metadata.
        """
        # Check cache validity
        now = time.time()
        if self._cache and (now - self._cache_time) < CACHE_TTL:
            logger.debug("Returning cached runtime config")
            return self._cache

        # Try Supabase/Lovable bridge
        if settings.supabase_configured():
            try:
                config = await self._fetch_from_supabase()
                config.config_source = "lovable"
                config.persistence_available = True
                self._cache = config
                self._cache_time = now
                self._last_known_good = config
                return config
            except Exception as e:
                logger.warning(f"Failed to fetch config from Lovable: {e}")

        # Fall back to last known good
        if self._last_known_good:
            logger.warning("Using last known good configuration")
            self._last_known_good.config_source = "cache"
            self._last_known_good.persistence_available = False
            return self._last_known_good

        # Fall back to env defaults
        logger.warning("Using environment variable defaults")
        config = self._env_defaults()
        config.config_source = "environment"
        config.persistence_available = False
        return config

    async def _fetch_from_supabase(self) -> RuntimeConfig:
        """Fetch configuration from Supabase REST API."""
        if not settings.supabase_url or not settings.supabase_service_role_key:
            raise ValueError("Supabase not configured")

        async with httpx.AsyncClient() as client:
            response = await client.get(
                f"{settings.supabase_url}/rest/v1/ai_runtime_config?limit=1",
                headers={
                    "apikey": settings.supabase_service_role_key,
                    "Authorization": f"Bearer {settings.supabase_service_role_key}",
                    "Accept": "application/json",
                },
                timeout=10.0,
            )
            response.raise_for_status()
            data = response.json()

            if not data or len(data) == 0:
                raise ValueError("No configuration found in Supabase")

            config_data = data[0]
            return RuntimeConfig(**config_data)

    async def update_config(
        self, patch: ConfigPatch, updated_by: str = "admin"
    ) -> RuntimeConfig:
        """Update configuration and write audit record."""
        current = await self.get_config()

        # Build update dict with only changed fields
        update_dict = {}
        for field, value in patch.dict(exclude_unset=True).items():
            if value is not None:
                update_dict[field] = value

        if not update_dict:
            logger.debug("No fields to update")
            return current

        # Increment version
        new_version = current.version + 1
        update_dict["version"] = new_version
        update_dict["updated_at"] = "now()"
        update_dict["updated_by"] = updated_by

        if not settings.supabase_configured():
            logger.error("Cannot update config: Supabase persistence backend not configured")
            raise ValueError("Runtime persistence backend unavailable")

        try:
            async with httpx.AsyncClient() as client:
                # Update config
                response = await client.patch(
                    f"{settings.supabase_url}/rest/v1/ai_runtime_config?id=eq.{current.dict().get('id', '')}",
                    json=update_dict,
                    headers={
                        "apikey": settings.supabase_service_role_key,
                        "Authorization": f"Bearer {settings.supabase_service_role_key}",
                        "Content-Type": "application/json",
                        "Prefer": "return=representation",
                    },
                    timeout=10.0,
                )
                response.raise_for_status()
                updated_data = response.json()

                if updated_data:
                    updated_config = RuntimeConfig(**updated_data[0])
                    self._cache = updated_config
                    self._cache_time = time.time()

                    # Write audit record (fire-and-forget)
                    await self._write_audit_record(
                        current, updated_config, updated_by, update_dict
                    )

                    return updated_config
                return current

        except Exception as e:
            logger.error(f"Failed to update config in Supabase: {e}")
            raise

    async def _write_audit_record(
        self,
        previous: RuntimeConfig,
        new: RuntimeConfig,
        updated_by: str,
        changed_fields: dict,
    ) -> None:
        """Write audit record to Supabase (fire-and-forget)."""
        if not settings.supabase_configured():
            return

        try:
            fields_changed = list(changed_fields.keys())
            audit_record = {
                "config_version": new.version,
                "fields_changed": fields_changed,
                "previous_values": previous.dict(),
                "new_values": new.dict(),
                "updated_by": updated_by,
            }

            async with httpx.AsyncClient() as client:
                await client.post(
                    f"{settings.supabase_url}/rest/v1/ai_config_audit",
                    json=audit_record,
                    headers={
                        "apikey": settings.supabase_service_role_key,
                        "Authorization": f"Bearer {settings.supabase_service_role_key}",
                        "Content-Type": "application/json",
                    },
                    timeout=5.0,
                )
        except Exception as e:
            logger.warning(f"Failed to write audit record: {e}")

    def _env_defaults(self) -> RuntimeConfig:
        """Build default configuration from environment variables.

        Sources configuration from:
        - LLM_PROVIDER, LLM_FALLBACK_PROVIDER (routing)
        - OPENROUTER_PRIMARY_MODEL, etc. (role-specific models)
        - ANTHROPIC_PRIMARY_MODEL, etc. (role-specific models)
        - CHAT_TEMPERATURE, CHAT_TOP_P, CHAT_MAX_TOKENS (generation)
        - CHAT_TIMEOUT_MS, etc. (timeouts)
        - CHAT_USE_* flags (pipeline features)
        """
        return RuntimeConfig(
            # Agent & Routing
            active_agent_profile="rckt_advisor",
            routing_mode="failover",
            enabled=True,
            primary_provider=settings.llm_provider or "openrouter",
            secondary_provider=settings.llm_fallback_provider or "anthropic",
            primary_weight=100,
            secondary_weight=0,

            # Pipeline Features
            chat_use_fallback=settings.chat_use_fallback,
            chat_use_enhancement=settings.chat_use_enhancement,
            chat_use_judge=settings.chat_use_judge,

            # Generation Parameters
            temperature=settings.chat_temperature,
            top_p=settings.chat_top_p,
            max_tokens=settings.chat_max_tokens,

            # Timeouts
            primary_timeout_ms=settings.chat_timeout_ms,
            fallback_timeout_ms=settings.chat_fallback_timeout_ms,
            enhancement_timeout_ms=settings.chat_enhancement_timeout_ms,
            judge_timeout_ms=settings.chat_judge_timeout_ms,

            # OpenRouter Role-Specific Models
            openrouter_primary_model=settings.openrouter_primary_model,
            openrouter_fallback_model=settings.openrouter_fallback_model,
            openrouter_enhancement_model=settings.openrouter_enhancement_model,
            openrouter_judge_model=settings.openrouter_judge_model,

            # Anthropic Role-Specific Models
            anthropic_primary_model=settings.anthropic_primary_model,
            anthropic_fallback_model=settings.anthropic_fallback_model,
            anthropic_enhancement_model=settings.anthropic_enhancement_model,
            anthropic_judge_model=settings.anthropic_judge_model,

            # Embeddings / RAG
            embeddings_provider=settings.embeddings_provider,
            embeddings_model=settings.embeddings_model,
            embedding_dim=settings.embedding_dim,

            # Budget & Observability
            budget_policy="warn_only",

            # Metadata
            version=1,
        )
