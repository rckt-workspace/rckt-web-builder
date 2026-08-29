"""Base adapter for metrics sources."""

from abc import ABC, abstractmethod
from app.metrics.schemas import MetricsSnapshot


class MetricsAdapter(ABC):
    """Abstract base for metrics source adapters."""

    source_name: str

    @abstractmethod
    async def collect(self) -> MetricsSnapshot:
        """Fetch and normalize metrics from source."""
        pass

    @abstractmethod
    async def is_configured(self) -> bool:
        """Check if adapter has required configuration."""
        pass
