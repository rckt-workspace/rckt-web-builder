"""Usage tracking service for analytics and billing."""

import logging
from typing import Optional

import httpx

from app.core import settings
from app.schemas.generation import GenerationResult

logger = logging.getLogger(__name__)


class UsageTracker:
    """Tracks LLM usage events to Supabase (fire-and-forget)."""

    @staticmethod
    async def record(
        result: GenerationResult,
        session_id: Optional[str] = None,
        agent_profile: str = "rckt_advisor",
        status: str = "success",
        error_type: Optional[str] = None,
    ) -> None:
        """Record usage event to Supabase (fire-and-forget, never raises)."""
        if not settings.supabase_configured():
            logger.debug("Supabase not configured, skipping usage record")
            return

        try:
            event_record = {
                "request_id": str(result.request_id),
                "session_id": session_id,
                "agent_profile": agent_profile,
                "provider": result.provider,
                "model": result.model,
                "fallback_used": result.fallback_used,
                "input_tokens": result.input_tokens,
                "output_tokens": result.output_tokens,
                "cached_tokens": result.cached_tokens,
                "cost_usd": result.cost_usd,
                "cost_type": result.cost_type,
                "latency_ms": result.latency_ms,
                "ttft_ms": result.ttft_ms,
                "status": status,
                "error_type": error_type,
            }

            async with httpx.AsyncClient() as client:
                await client.post(
                    f"{settings.supabase_url}/rest/v1/ai_usage_events",
                    json=event_record,
                    headers={
                        "apikey": settings.supabase_service_role_key,
                        "Authorization": f"Bearer {settings.supabase_service_role_key}",
                        "Content-Type": "application/json",
                    },
                    timeout=3.0,
                )
        except Exception as e:
            logger.warning(f"Failed to record usage event: {e}")
