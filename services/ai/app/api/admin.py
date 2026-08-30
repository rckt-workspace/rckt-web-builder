"""Admin API for AI runtime configuration and monitoring."""

import logging
import time
from typing import Optional

from fastapi import APIRouter, HTTPException, Depends, Header

from app.core import get_settings, Settings
from app.llm.anthropic import AnthropicProvider
from app.llm.base import Message
from app.llm.openrouter import OpenRouterProvider
from app.schemas.admin import (
    RuntimeConfig,
    ConfigPatch,
    ModelInfo,
    AggregatedUsage,
    TestResult,
)
from app.services.model_catalog import ModelCatalogService
from app.services.runtime_config import RuntimeConfigService

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/internal", tags=["admin"])


async def verify_admin_secret(
    x_rckt_internal_secret: str = Header(None),
    settings: Settings = Depends(get_settings),
) -> str:
    """Verify internal admin secret."""
    if not x_rckt_internal_secret or not settings.rckt_internal_secret:
        raise HTTPException(status_code=401, detail="Unauthorized")

    # Timing-safe comparison
    if x_rckt_internal_secret != settings.rckt_internal_secret:
        raise HTTPException(status_code=401, detail="Unauthorized")

    return x_rckt_internal_secret


@router.get("/config", response_model=RuntimeConfig)
async def get_config(
    _: str = Depends(verify_admin_secret),
) -> RuntimeConfig:
    """Get current AI runtime configuration (no API keys).

    Returns environment/cache config with metadata if Lovable is unavailable.
    Never returns 500 — always returns a valid config.
    """
    try:
        service = RuntimeConfigService()
        config = await service.get_config()
        logger.info(f"Returning config from {config.config_source}")
        return config
    except Exception as e:
        logger.error(f"Unexpected error getting config: {e}", exc_info=True)
        # Fallback to env defaults if anything goes wrong
        service = RuntimeConfigService()
        config = service._env_defaults()
        config.config_source = "environment"
        config.persistence_available = False
        return config


@router.put("/config", response_model=RuntimeConfig)
async def update_config(
    patch: ConfigPatch,
    _: str = Depends(verify_admin_secret),
    settings: Settings = Depends(get_settings),
) -> RuntimeConfig:
    """Update AI runtime configuration.

    Returns 503 if persistence backend (Lovable) is unavailable.
    Configuration changes require persistence to take effect.
    """
    try:
        if not settings.supabase_configured():
            logger.error("Cannot update config: persistence backend not configured")
            raise HTTPException(
                status_code=503,
                detail="Runtime persistence backend unavailable",
            )

        service = RuntimeConfigService()
        updated_by = settings.app_name
        return await service.update_config(patch, updated_by)

    except HTTPException:
        raise
    except ValueError as e:
        if "persistence" in str(e).lower():
            logger.error(f"Persistence backend unavailable: {e}")
            raise HTTPException(status_code=503, detail="Runtime persistence backend unavailable")
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        logger.error(f"Failed to update config: {e}")
        raise HTTPException(status_code=503, detail="Runtime persistence backend unavailable")


@router.get("/usage", response_model=AggregatedUsage)
async def get_usage(
    period: str = "day",
    _: str = Depends(verify_admin_secret),
) -> AggregatedUsage:
    """Get aggregated usage statistics."""
    # Placeholder implementation
    return AggregatedUsage(
        period=period,
        total_requests=0,
        total_tokens=0,
        total_cost=0.0,
        provider_breakdown={},
        agent_breakdown={},
    )


@router.get("/models", response_model=list[ModelInfo])
async def get_models(
    provider: Optional[str] = None,
    _: str = Depends(verify_admin_secret),
) -> list[ModelInfo]:
    """Get available models from specified provider."""
    try:
        catalog = ModelCatalogService()

        if provider == "openrouter":
            models = await catalog.get_openrouter_models()
            return [
                ModelInfo(
                    id=m.get("id"),
                    name=m.get("id"),
                    provider="openrouter",
                    pricing=m.get("pricing"),
                )
                for m in models
            ]
        else:
            # Return known models for Anthropic
            return [
                ModelInfo(
                    id="claude-sonnet-5",
                    name="Claude Sonnet 5",
                    provider="anthropic",
                ),
                ModelInfo(
                    id="claude-opus",
                    name="Claude Opus",
                    provider="anthropic",
                ),
                ModelInfo(
                    id="claude-haiku",
                    name="Claude Haiku",
                    provider="anthropic",
                ),
            ]
    except Exception as e:
        logger.error(f"Failed to get models: {e}")
        raise HTTPException(status_code=500, detail="Failed to get models")


@router.post("/test-provider", response_model=TestResult)
async def test_provider(
    provider: str = "anthropic",
    _: str = Depends(verify_admin_secret),
) -> TestResult:
    """Test a provider with a short prompt (shows cost warning)."""
    try:
        start_time = time.time()

        if provider == "anthropic":
            try:
                prov = AnthropicProvider()
                messages = [Message(role="user", content="Say 'OK' and nothing else.")]
                result = await prov.generate(messages, None, 10)
                latency_ms = int((time.time() - start_time) * 1000)

                return TestResult(
                    success=True,
                    provider="anthropic",
                    model=prov.model,
                    response_time_ms=latency_ms,
                    cost_usd=result.cost_usd,
                    message=result.content,
                )
            except Exception as e:
                latency_ms = int((time.time() - start_time) * 1000)
                return TestResult(
                    success=False,
                    provider="anthropic",
                    model="unknown",
                    response_time_ms=latency_ms,
                    cost_usd=None,
                    error=str(e),
                )

        elif provider == "openrouter":
            try:
                prov = OpenRouterProvider()
                messages = [Message(role="user", content="Say 'OK' and nothing else.")]
                result = await prov.generate(messages, None, 10)
                latency_ms = int((time.time() - start_time) * 1000)

                return TestResult(
                    success=True,
                    provider="openrouter",
                    model=prov.model,
                    response_time_ms=latency_ms,
                    cost_usd=result.cost_usd,
                    message=result.content,
                )
            except Exception as e:
                latency_ms = int((time.time() - start_time) * 1000)
                return TestResult(
                    success=False,
                    provider="openrouter",
                    model="unknown",
                    response_time_ms=latency_ms,
                    cost_usd=None,
                    error=str(e),
                )
        else:
            raise HTTPException(status_code=400, detail="Unknown provider")

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Test provider failed: {e}")
        raise HTTPException(status_code=500, detail="Test failed")


@router.get("/provider-status", response_model=dict)
async def get_provider_status(
    _: str = Depends(verify_admin_secret),
) -> dict:
    """Get provider availability and configuration status."""
    service = RuntimeConfigService()
    config = await service.get_config()

    return {
        "anthropic": {
            "configured": bool(
                config.primary_provider == "anthropic" or config.secondary_provider == "anthropic"
            ),
            "model": config.primary_model if config.primary_provider == "anthropic" else config.secondary_model,
            "last_success": None,
            "last_error": None,
        },
        "openrouter": {
            "configured": bool(
                config.primary_provider == "openrouter" or config.secondary_provider == "openrouter"
            ),
            "model": config.primary_model if config.primary_provider == "openrouter" else config.secondary_model,
            "last_success": None,
            "last_error": None,
        },
    }
