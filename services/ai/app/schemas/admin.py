"""Pydantic models for admin API."""

from pydantic import BaseModel, Field
from typing import Optional


class RuntimeConfig(BaseModel):
    """AI runtime configuration (no API keys)."""

    active_agent_profile: str = Field(default="rckt_advisor")
    routing_mode: str = Field(default="failover")
    primary_provider: str = Field(default="anthropic")
    primary_model: str = Field(default="claude-sonnet-5")
    secondary_provider: str = Field(default="openrouter")
    secondary_model: str = Field(default="meta-llama/llama-3.1-8b-instruct:free")
    primary_weight: int = Field(default=100, ge=0, le=100)
    secondary_weight: int = Field(default=0)
    fallback_enabled: bool = Field(default=True)
    max_tokens: int = Field(default=1024)
    primary_timeout_ms: int = Field(default=45000)
    fallback_timeout_ms: int = Field(default=45000)
    daily_budget_usd: Optional[float] = None
    monthly_budget_usd: Optional[float] = None
    budget_policy: str = Field(default="warn_only")
    enabled: bool = Field(default=True)
    version: int = Field(default=1)


class ConfigPatch(BaseModel):
    """Patch for runtime config."""

    active_agent_profile: Optional[str] = None
    routing_mode: Optional[str] = None
    primary_provider: Optional[str] = None
    primary_model: Optional[str] = None
    secondary_provider: Optional[str] = None
    secondary_model: Optional[str] = None
    primary_weight: Optional[int] = None
    fallback_enabled: Optional[bool] = None
    max_tokens: Optional[int] = None
    primary_timeout_ms: Optional[int] = None
    fallback_timeout_ms: Optional[int] = None
    daily_budget_usd: Optional[float] = None
    monthly_budget_usd: Optional[float] = None
    budget_policy: Optional[str] = None
    enabled: Optional[bool] = None


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
