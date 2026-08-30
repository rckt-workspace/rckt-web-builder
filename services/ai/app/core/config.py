"""
Centralized settings for RCKT AI Service.
Never read environment variables directly from modules.
Always use this Settings object via get_settings dependency.

Follows reference pattern from proyecto-agente-rckt:
- Load from services/ai/.env
- Explicit pathlib-based env resolution
- Placeholder detection to identify unconfigured values
"""

from functools import lru_cache
from pathlib import Path
from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict

# Deterministic path resolution
_APP_DIR = Path(__file__).resolve().parent  # app/core
_PROJECT_DIR = _APP_DIR.parent.parent  # services/ai
_ENV_FILES = (_PROJECT_DIR / ".env",)

_PLACEHOLDER_VALUES = {
    "sk-xxx", "sk-or-v1-xxx", "sk-ant-xxx",
    "xxx", "eyJxxx", "cambiar-en-produccion",
    "cambiar-en-produccion-generado-con-openssl-rand-hex-32",
}

def _has_real_value(value: str | None) -> bool:
    """Check if a value is real (not a placeholder or empty)."""
    if not value:
        return False
    return value.strip() not in _PLACEHOLDER_VALUES


class Settings(BaseSettings):
    """Application configuration from environment."""

    model_config = SettingsConfigDict(
        env_file=_ENV_FILES,
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore",
    )

    # App
    app_env: str = Field(default="development")
    app_name: str = Field(default="rckt-ai")
    app_version: str = Field(default="0.1.0")

    # LLM - OpenRouter (PRIMARY per reference pattern)
    openrouter_api_key: str = Field(default="")
    openrouter_model: str = Field(default="openrouter/free")
    openrouter_base_url: str = Field(default="https://openrouter.ai/api/v1")
    openrouter_primary_model: str = Field(default="openrouter/free")
    openrouter_fallback_model: str = Field(default="meta-llama/llama-3.1-8b-instruct:free")
    openrouter_enhancement_model: str = Field(default="openrouter/free")
    openrouter_judge_model: str = Field(default="openrouter/free")

    # LLM - Anthropic (FALLBACK per reference pattern)
    anthropic_api_key: str = Field(default="")
    anthropic_model: str = Field(default="claude-haiku-4-5-20251001")
    anthropic_base_url: str = Field(default="https://api.anthropic.com")
    anthropic_primary_model: str = Field(default="claude-haiku-4-5-20251001")
    anthropic_fallback_model: str = Field(default="claude-sonnet-4-6")
    anthropic_enhancement_model: str = Field(default="claude-haiku-4-5-20251001")
    anthropic_judge_model: str = Field(default="claude-haiku-4-5-20251001")

    # LLM Provider routing
    llm_provider: str = Field(default="openrouter")  # openrouter | anthropic
    llm_fallback_provider: str = Field(default="anthropic")

    # Supabase - Database layer (OPTIONAL, not in critical path)
    supabase_url: str = Field(default="")
    supabase_service_role_key: str = Field(default="")

    # Observability
    langfuse_public_key: str = Field(default="")
    langfuse_secret_key: str = Field(default="")
    langfuse_host: str = Field(default="https://cloud.langfuse.com")
    sentry_dsn: str = Field(default="")

    # CORS - Web frontend access
    cors_origins: list[str] = Field(
        default=["https://rckt-launchpad.onrender.com", "http://localhost:3000", "http://localhost:5173"]
    )

    # Admin access
    rckt_internal_secret: str = Field(default="")

    # LLM Parameters
    chat_temperature: float = Field(default=0.2)
    chat_top_p: float = Field(default=0.8)
    chat_max_tokens: int = Field(default=900)
    chat_timeout_ms: int = Field(default=45000)
    chat_fallback_timeout_ms: int = Field(default=45000)
    chat_enhancement_timeout_ms: int = Field(default=30000)
    chat_judge_timeout_ms: int = Field(default=20000)

    # Pipeline Features
    chat_use_fallback: bool = Field(default=True)
    chat_use_enhancement: bool = Field(default=False)
    chat_use_judge: bool = Field(default=False)

    # Embeddings / RAG
    embeddings_provider: str = Field(default="local")
    embeddings_model: str = Field(default="sentence-transformers/all-MiniLM-L6-v2")
    embedding_dim: int = Field(default=384)

    # Logging
    log_level: str = Field(default="INFO")

    def is_production(self) -> bool:
        return self.app_env == "production"

    @property
    def has_anthropic(self) -> bool:
        """Check if Anthropic is properly configured with real values."""
        return _has_real_value(self.anthropic_api_key) and _has_real_value(self.anthropic_model)

    @property
    def has_openrouter(self) -> bool:
        """Check if OpenRouter is properly configured with real values."""
        return _has_real_value(self.openrouter_api_key) and _has_real_value(self.openrouter_model)

    def has_any_llm_provider(self) -> bool:
        """Check if at least one LLM provider is configured with real values."""
        return self.has_anthropic or self.has_openrouter

    @property
    def has_supabase(self) -> bool:
        """Check if Supabase is properly configured with real values."""
        return _has_real_value(self.supabase_url) and _has_real_value(self.supabase_service_role_key)

    def supabase_configured(self) -> bool:
        """Alias for has_supabase (compatibility method)."""
        return self.has_supabase

    def anthropic_configured(self) -> bool:
        """Alias for has_anthropic (compatibility method)."""
        return self.has_anthropic

    def openrouter_configured(self) -> bool:
        """Alias for has_openrouter (compatibility method)."""
        return self.has_openrouter

    def observability_configured(self) -> bool:
        """Alias for has_observability (compatibility method)."""
        return self.has_observability

    @property
    def has_observability(self) -> bool:
        """Check if observability services are configured."""
        has_langfuse = _has_real_value(self.langfuse_public_key) and _has_real_value(self.langfuse_secret_key)
        has_sentry = _has_real_value(self.sentry_dsn)
        return has_langfuse or has_sentry


@lru_cache()
def get_settings() -> Settings:
    """Dependency injection function for FastAPI (cached)."""
    return Settings()


# Module-level singleton for direct access
settings = get_settings()
