"""Google Analytics 4 adapter (future implementation)."""

from app.metrics.adapters.base import MetricsAdapter
from app.metrics.schemas import MetricsSnapshot


class GA4Adapter(MetricsAdapter):
    """Collect metrics from Google Analytics 4."""

    source_name = "ga4"

    async def is_configured(self) -> bool:
        """Check if GA4 credentials are available."""
        return False  # Not implemented yet

    async def collect(self) -> MetricsSnapshot:
        """Fetch GA4 data (placeholder)."""
        return MetricsSnapshot(
            source="ga4",
            metrics=[],
            status="not_configured",
        )
