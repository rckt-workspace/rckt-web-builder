"""Google Search Console adapter (future implementation)."""

from app.metrics.adapters.base import MetricsAdapter
from app.metrics.schemas import MetricsSnapshot


class SearchConsoleAdapter(MetricsAdapter):
    """Collect metrics from Google Search Console."""

    source_name = "search_console"

    async def is_configured(self) -> bool:
        """Check if Search Console credentials are available."""
        return False  # Not implemented yet

    async def collect(self) -> MetricsSnapshot:
        """Fetch Search Console data (placeholder)."""
        return MetricsSnapshot(
            source="search_console",
            metrics=[],
            status="not_configured",
        )
