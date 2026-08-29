"""Health and readiness endpoints."""

import logging
from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse

from app.core import Settings, get_settings
from app.schemas import HealthResponse, ReadinessResponse

logger = logging.getLogger(__name__)
router = APIRouter(tags=["health"])


@router.get("/healthz", response_model=HealthResponse)
async def healthz(settings: Settings = Depends(get_settings)):
    """
    Liveness probe.
    Returns immediately with service status.
    Used by Kubernetes/load balancers to detect if pod is alive.
    No external calls.
    """
    return HealthResponse(
        status="ok",
        service="rckt-ai",
        version=settings.app_version,
    )


@router.get("/readyz")
async def readyz(settings: Settings = Depends(get_settings)):
    """
    Readiness probe.
    Validates critical local configuration before accepting traffic.
    No external API calls, no token consumption.
    Returns same JSON contract regardless of HTTP status.
    """
    checks = {}

    # LLM providers - at least one is REQUIRED for runtime
    checks["anthropic"] = settings.anthropic_configured()
    checks["openrouter"] = settings.openrouter_configured()

    # Supabase is OPTIONAL (for future integrations)
    checks["supabase"] = settings.supabase_configured()

    # Observability is OPTIONAL
    checks["observability"] = settings.observability_configured()

    # Service is ready only if at least one LLM provider is configured
    ready = settings.has_any_llm_provider()

    response = ReadinessResponse(ready=ready, checks=checks)

    if not ready:
        return JSONResponse(
            status_code=503,
            content=response.model_dump(),
        )

    return response
