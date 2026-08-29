"""Render deployment metrics adapter (future implementation)."""

from app.metrics.adapters.base import MetricsAdapter
from app.metrics.schemas import MetricsSnapshot


class RenderAdapter(MetricsAdapter):
    """Collect metrics from Render (uptime, CPU, memory, errors)."""

    source_name = "render"

    async def is_configured(self) -> bool:
        """Check if Render API credentials are available."""
        return False  # Not implemented yet

    async def collect(self) -> MetricsSnapshot:
        """Fetch Render deployment metrics (placeholder)."""
        return MetricsSnapshot(
            source="render",
            metrics=[],
            status="not_configured",
        )
