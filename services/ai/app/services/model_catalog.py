"""Model catalog service for tracking available models."""

import logging
import time
from typing import Optional

import httpx

logger = logging.getLogger(__name__)

# Cache OpenRouter models for 10 minutes
CACHE_TTL = 600


class ModelCatalogService:
    """Manages available LLM models from providers."""

    def __init__(self):
        self._cache: Optional[list] = None
        self._cache_time: float = 0
        self._last_known_good: Optional[list] = None

    async def get_openrouter_models(self) -> list:
        """Get available models from OpenRouter with caching."""
        now = time.time()

        # Check cache
        if self._cache and (now - self._cache_time) < CACHE_TTL:
            return self._cache

        # Try fetch
        try:
            async with httpx.AsyncClient() as client:
                response = await client.get(
                    "https://openrouter.ai/api/v1/models",
                    timeout=10.0,
                )
                response.raise_for_status()
                data = response.json()

                models = data.get("data", [])
                self._cache = models
                self._cache_time = now
                self._last_known_good = models
                return models

        except Exception as e:
            logger.warning(f"Failed to fetch OpenRouter models: {e}")

        # Fall back to last known good
        if self._last_known_good:
            logger.debug("Using cached OpenRouter models")
            return self._last_known_good

        return []
