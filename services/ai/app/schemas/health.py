"""Health and readiness check schemas."""

from pydantic import BaseModel, ConfigDict, Field
from typing import Literal


class HealthResponse(BaseModel):
    """Response for GET /healthz (basic liveness)."""

    model_config = ConfigDict(
        json_schema_extra={
            "example": {"status": "ok", "service": "rckt-ai", "version": "0.1.0"}
        }
    )

    status: Literal["ok", "degraded"]
    service: str = "rckt-ai"
    version: str


class ReadinessResponse(BaseModel):
    """Response for GET /readyz (startup readiness)."""

    model_config = ConfigDict(
        json_schema_extra={
            "example": {
                "ready": True,
                "checks": {
                    "anthropic": True,
                    "supabase": False,
                    "observability": False,
                },
            }
        }
    )

    ready: bool
    checks: dict[str, bool] = Field(
        default_factory=dict,
        description="Individual check results (anthropic, supabase, etc)",
    )
