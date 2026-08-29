"""Budget management and policy enforcement."""

import logging
from datetime import datetime, timedelta
from typing import Optional

import httpx

from app.core import settings
from app.schemas.admin import RuntimeConfig

logger = logging.getLogger(__name__)


class BudgetService:
    """Manages budget checks and cost policies."""

    @staticmethod
    async def check(config: RuntimeConfig) -> Optional[dict]:
        """Check budget status and return policy recommendation or None if OK."""
        if not config.daily_budget_usd and not config.monthly_budget_usd:
            return None  # No budget limits

        cost_info = await BudgetService._get_usage_cost(
            days=1 if config.daily_budget_usd else 30
        )

        if not cost_info:
            return None

        budget_limit = config.daily_budget_usd or config.monthly_budget_usd
        current_cost = cost_info.get("total_cost", 0)

        if current_cost >= budget_limit:
            logger.warning(
                f"Budget limit reached: ${current_cost:.2f} >= ${budget_limit:.2f}"
            )
            return {
                "policy": config.budget_policy,
                "current_cost": current_cost,
                "limit": budget_limit,
            }

        return None

    @staticmethod
    async def _get_usage_cost(days: int = 1) -> Optional[dict]:
        """Get total cost for usage in the past N days."""
        if not settings.supabase_configured():
            return None

        try:
            cutoff = datetime.utcnow() - timedelta(days=days)
            cutoff_iso = cutoff.isoformat()

            async with httpx.AsyncClient() as client:
                # Query usage events and sum costs
                response = await client.get(
                    f"{settings.supabase_url}/rest/v1/ai_usage_events"
                    f"?created_at=gte.{cutoff_iso}"
                    f"&select=cost_usd",
                    headers={
                        "apikey": settings.supabase_service_role_key,
                        "Authorization": f"Bearer {settings.supabase_service_role_key}",
                        "Accept": "application/json",
                    },
                    timeout=5.0,
                )
                response.raise_for_status()
                events = response.json()

                total_cost = sum(e.get("cost_usd") or 0 for e in events)
                return {"total_cost": total_cost, "events": len(events)}

        except Exception as e:
            logger.warning(f"Failed to get usage cost: {e}")
            return None
