"""Pydantic models for admin API."""

from pydantic import BaseModel, Field
from typing import Optional


class RuntimeConfig(BaseModel):
    """AI runtime configuration (no API keys)."""

    # Agent & Routing
    active_agent_profile: str = Field(default="rckt_advisor")
    routing_mode: str = Field(default="failover")
    enabled: bool = Field(default=True)

    # Primary/Fallback Providers (legacy naming kept for compatibility)
    primary_provider: str = Field(default="openrouter")
    secondary_provider: str = Field(default="anthropic")
    primary_weight: int = Field(default=100, ge=0, le=100)
    secondary_weight: int = Field(default=0)

    # Pipeline Features
    chat_use_fallback: bool = Field(default=True)
    chat_use_enhancement: bool = Field(default=False)
    chat_use_judge: bool = Field(default=False)

    # Generation Parameters
    temperature: float = Field(default=0.2, ge=0.0, le=2.0)
    top_p: float = Field(default=0.8, ge=0.0, le=1.0)
    max_tokens: int = Field(default=900, ge=100, le=4000)

    # Timeouts (ms)
    primary_timeout_ms: int = Field(default=45000)
    fallback_timeout_ms: int = Field(default=45000)
    enhancement_timeout_ms: int = Field(default=30000)
    judge_timeout_ms: int = Field(default=20000)

    # OpenRouter Models (Role-Specific)
    openrouter_primary_model: str = Field(default="openrouter/free")
    openrouter_fallback_model: str = Field(default="meta-llama/llama-3.1-8b-instruct:free")
    openrouter_enhancement_model: str = Field(default="openrouter/free")
    openrouter_judge_model: str = Field(default="openrouter/free")

    # Anthropic Models (Role-Specific)
    anthropic_primary_model: str = Field(default="claude-haiku-4-5-20251001")
    anthropic_fallback_model: str = Field(default="claude-sonnet-4-6")
    anthropic_enhancement_model: str = Field(default="claude-haiku-4-5-20251001")
    anthropic_judge_model: str = Field(default="claude-haiku-4-5-20251001")

    # Embeddings / RAG
    embeddings_provider: str = Field(default="local")
    embeddings_model: str = Field(default="sentence-transformers/all-MiniLM-L6-v2")
    embedding_dim: int = Field(default=384)

    # Budget & Observability
    daily_budget_usd: Optional[float] = None
    monthly_budget_usd: Optional[float] = None
    budget_policy: str = Field(default="warn_only")

    # Metadata
    version: int = Field(default=1)

    # Config Source Metadata (read-only, added by service)
    config_source: str = Field(default="environment")  # "environment", "cache", "lovable"
    persistence_available: bool = Field(default=False)


class ConfigPatch(BaseModel):
    """Patch for runtime config (all fields optional)."""

    # Agent & Routing
    active_agent_profile: Optional[str] = None
    routing_mode: Optional[str] = None
    enabled: Optional[bool] = None
    primary_provider: Optional[str] = None
    secondary_provider: Optional[str] = None
    primary_weight: Optional[int] = None
    secondary_weight: Optional[int] = None

    # Pipeline Features
    chat_use_fallback: Optional[bool] = None
    chat_use_enhancement: Optional[bool] = None
    chat_use_judge: Optional[bool] = None

    # Generation Parameters
    temperature: Optional[float] = None
    top_p: Optional[float] = None
    max_tokens: Optional[int] = None

    # Timeouts
    primary_timeout_ms: Optional[int] = None
    fallback_timeout_ms: Optional[int] = None
    enhancement_timeout_ms: Optional[int] = None
    judge_timeout_ms: Optional[int] = None

    # OpenRouter Models
    openrouter_primary_model: Optional[str] = None
    openrouter_fallback_model: Optional[str] = None
    openrouter_enhancement_model: Optional[str] = None
    openrouter_judge_model: Optional[str] = None

    # Anthropic Models
    anthropic_primary_model: Optional[str] = None
    anthropic_fallback_model: Optional[str] = None
    anthropic_enhancement_model: Optional[str] = None
    anthropic_judge_model: Optional[str] = None

    # Embeddings
    embeddings_provider: Optional[str] = None
    embeddings_model: Optional[str] = None
    embedding_dim: Optional[int] = None

    # Budget
    daily_budget_usd: Optional[float] = None
    monthly_budget_usd: Optional[float] = None
    budget_policy: Optional[str] = None


class ProviderStatusResponse(BaseModel):
    """Provider status information."""

    configured: bool
    model: Optional[str]
    last_success: Optional[str]
    last_error: Optional[str]


class ModelInfo(BaseModel):
    """Information about an available model."""

    id: str
    name: str
    provider: str
    pricing: Optional[dict] = None


class AggregatedUsage(BaseModel):
    """Aggregated usage statistics."""

    period: str
    total_requests: int
    total_tokens: int
    total_cost: float
    provider_breakdown: dict
    agent_breakdown: dict


class TestResult(BaseModel):
    """Result of a provider test."""

    success: bool
    provider: str
    model: str
    response_time_ms: int
    cost_usd: Optional[float]
    message: Optional[str]
    error: Optional[str]
