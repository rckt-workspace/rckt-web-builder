"""CrUX (Chrome User Experience Report) adapter (future implementation)."""

from app.metrics.adapters.base import MetricsAdapter
from app.metrics.schemas import MetricsSnapshot


class CrUXAdapter(MetricsAdapter):
    """Collect metrics from CrUX / PageSpeed Insights."""

    source_name = "crux"

    async def is_configured(self) -> bool:
        """Check if PageSpeed API credentials are available."""
        return False  # Not implemented yet

    async def collect(self) -> MetricsSnapshot:
        """Fetch CrUX data (placeholder)."""
        return MetricsSnapshot(
            source="crux",
            metrics=[],
            status="not_configured",
        )
