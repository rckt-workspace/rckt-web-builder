"""
Centralized settings for RCKT AI Service.
Never read environment variables directly from modules.
Always use this Settings object via get_settings dependency.
"""

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Application configuration from environment."""

    model_config = SettingsConfigDict(
        env_file=".env",
        case_sensitive=False,
        extra="ignore",
    )

    # App
    app_env: str = Field(default="development")
    app_name: str = Field(default="rckt-ai")
    app_version: str = Field(default="0.1.0")

    # LLM - Anthropic (REQUIRED for runtime)
    anthropic_api_key: str = Field(default="")
    anthropic_model: str = Field(default="claude-sonnet-5")

    # Supabase - Database layer (OPTIONAL for health check)
    supabase_url: str = Field(default="")
    supabase_service_role_key: str = Field(default="")

    # Observability
    langfuse_public_key: str = Field(default="")
    langfuse_secret_key: str = Field(default="")
    langfuse_host: str = Field(default="https://cloud.langfuse.com")
    sentry_dsn: str = Field(default="")

    # CORS - Web frontend access
    cors_origins: list[str] = Field(
        default=["https://rckt-launchpad.onrender.com", "http://localhost:5173"]
    )

    # Logging
    log_level: str = Field(default="INFO")

    def is_production(self) -> bool:
        return self.app_env == "production"

    def anthropic_configured(self) -> bool:
        """Check if Anthropic is properly configured."""
        return bool(self.anthropic_api_key and self.anthropic_model)

    def supabase_configured(self) -> bool:
        """Check if Supabase is properly configured."""
        return bool(self.supabase_url and self.supabase_service_role_key)

    def observability_configured(self) -> bool:
        """Check if observability services are configured."""
        has_langfuse = bool(self.langfuse_public_key and self.langfuse_secret_key)
        has_sentry = bool(self.sentry_dsn)
        return has_langfuse or has_sentry


# Global settings instance
settings = Settings()  # type: ignore


def get_settings() -> Settings:
    """Dependency injection function for FastAPI."""
    return settings
