"""LLM Provider router with advanced routing strategies and error classification."""

import logging
import random
from typing import AsyncIterator, Optional, Tuple

import httpx
from anthropic import APIError as AnthropicAPIError
from anthropic import APIConnectionError, APIStatusError, RateLimitError

from app.core import settings
from app.errors import (
    ProviderError,
    ProviderQuotaError,
    ProviderRateLimitError,
    ProviderRequestError,
    ProviderUnavailableError,
)
from app.schemas.admin import RuntimeConfig
from app.schemas.generation import GenerationResult
from .anthropic import AnthropicProvider
from .base import LLMProvider, Message, PartialMetadata
from .openrouter import OpenRouterProvider

logger = logging.getLogger(__name__)


class LLMRouter:
    """Routes requests between multiple LLM providers with advanced strategies."""

    def __init__(self, config: RuntimeConfig):
        self.config = config
        self.primary_provider_name = config.primary_provider
        self.fallback_provider_name = config.secondary_provider
        self.routing_mode = config.routing_mode  # 'failover' or 'weighted'
        self.primary_weight = config.primary_weight
        self.fallback_enabled = config.fallback_enabled

        self.primary = None
        self.fallback = None

        self._init_providers()

    def _init_providers(self):
        """Initialize available providers based on configuration."""
        # Initialize primary provider
        if self.primary_provider_name == "anthropic" and settings.anthropic_configured():
            try:
                self.primary = AnthropicProvider(model=self.config.primary_model)
                logger.info("Primary provider: Anthropic Claude")
            except Exception as e:
                logger.error(f"Failed to initialize Anthropic: {e}")

        elif self.primary_provider_name == "openrouter" and settings.openrouter_configured():
            try:
                self.primary = OpenRouterProvider(model=self.config.primary_model)
                logger.info("Primary provider: OpenRouter")
            except Exception as e:
                logger.error(f"Failed to initialize OpenRouter: {e}")

        # Initialize fallback provider
        if self.fallback_enabled:
            if (
                self.fallback_provider_name == "anthropic"
                and settings.anthropic_configured()
            ):
                try:
                    self.fallback = AnthropicProvider(model=self.config.secondary_model)
                    logger.info("Fallback provider: Anthropic Claude")
                except Exception as e:
                    logger.error(f"Failed to initialize Anthropic fallback: {e}")

            elif (
                self.fallback_provider_name == "openrouter"
                and settings.openrouter_configured()
            ):
                try:
                    self.fallback = OpenRouterProvider(model=self.config.secondary_model)
                    logger.info("Fallback provider: OpenRouter")
                except Exception as e:
                    logger.error(f"Failed to initialize OpenRouter fallback: {e}")

        if not self.primary and not self.fallback:
            raise RuntimeError("No LLM providers configured")

    def _should_use_primary(self) -> bool:
        """Determine which provider to use based on routing mode."""
        if self.routing_mode == "weighted":
            return random.random() < (self.primary_weight / 100.0)
        # Default to failover
        return True

    def _classify_error(self, error: Exception) -> ProviderError:
        """Classify an error into a typed ProviderError for fallback logic."""
        provider = (
            "anthropic" if isinstance(error, AnthropicAPIError) else "openrouter"
        )

        # Anthropic errors
        if isinstance(error, RateLimitError):
            return ProviderRateLimitError("Rate limit exceeded", provider, 429)
        elif isinstance(error, APIStatusError):
            if error.status_code == 429:
                return ProviderRateLimitError(str(error), provider, 429)
            elif error.status_code == 402:
                return ProviderQuotaError("Quota exceeded", provider, 402)
            elif 400 <= error.status_code < 500:
                return ProviderRequestError(str(error), provider, error.status_code)
            else:
                return ProviderUnavailableError(str(error), provider, error.status_code)
        elif isinstance(error, APIConnectionError):
            return ProviderUnavailableError(
                "Connection error", provider, None
            )
        elif isinstance(error, AnthropicAPIError):
            return ProviderUnavailableError(str(error), provider, None)

        # httpx/OpenRouter errors
        if isinstance(error, httpx.HTTPStatusError):
            status_code = error.response.status_code
            if status_code == 429:
                return ProviderRateLimitError("Rate limit exceeded", provider, 429)
            elif status_code == 402:
                return ProviderQuotaError("Quota exceeded", provider, 402)
            elif 400 <= status_code < 500:
                return ProviderRequestError(str(error), provider, status_code)
            else:
                return ProviderUnavailableError(str(error), provider, status_code)
        elif isinstance(error, (httpx.ConnectError, httpx.TimeoutException)):
            return ProviderUnavailableError("Connection error", provider, None)
        elif isinstance(error, httpx.HTTPError):
            return ProviderUnavailableError(str(error), provider, None)

        # Default to unavailable
        return ProviderUnavailableError(str(error), provider, None)

    async def generate(
        self,
        messages: list[Message],
        system: Optional[str] = None,
        max_tokens: Optional[int] = None,
    ) -> GenerationResult:
        """Generate response with intelligent fallback."""
        use_primary = self._should_use_primary()

        if use_primary and self.primary:
            try:
                logger.debug(f"Using primary provider: {self.primary_provider_name}")
                return await self.primary.generate(messages, system, max_tokens)
            except Exception as e:
                classified_error = self._classify_error(e)
                logger.warning(
                    f"Primary provider failed ({classified_error.__class__.__name__}): {e}"
                )

                # Only allow fallback for specific error types
                if not isinstance(
                    classified_error,
                    (
                        ProviderUnavailableError,
                        ProviderRateLimitError,
                        ProviderQuotaError,
                    ),
                ):
                    raise classified_error

        # Try fallback if enabled and primary failed
        if self.fallback:
            try:
                logger.debug(f"Using fallback provider: {self.fallback_provider_name}")
                result = await self.fallback.generate(messages, system, max_tokens)
                result.fallback_used = True
                return result
            except Exception as e:
                logger.error(f"Fallback provider also failed: {e}")
                raise RuntimeError(
                    f"All LLM providers failed. Primary: {self.primary_provider_name}, "
                    f"Fallback: {self.fallback_provider_name}"
                )

        raise RuntimeError("No LLM providers available")

    async def stream(
        self,
        messages: list[Message],
        system: Optional[str] = None,
        max_tokens: Optional[int] = None,
    ) -> AsyncIterator[Tuple[str, Optional[PartialMetadata]]]:
        """Stream response with fallback only before first token."""
        use_primary = self._should_use_primary()
        first_token_sent = False

        if use_primary and self.primary:
            try:
                logger.debug(f"Streaming via primary: {self.primary_provider_name}")
                async for chunk, metadata in self.primary.stream(
                    messages, system, max_tokens
                ):
                    if chunk:
                        first_token_sent = True
                    yield chunk, metadata
                return
            except Exception as e:
                classified_error = self._classify_error(e)
                logger.warning(
                    f"Primary streaming failed ({classified_error.__class__.__name__}): {e}"
                )

                # Only fallback if we haven't sent any tokens yet
                if first_token_sent:
                    raise classified_error

                # Only allow fallback for specific error types
                if not isinstance(
                    classified_error,
                    (
                        ProviderUnavailableError,
                        ProviderRateLimitError,
                        ProviderQuotaError,
                    ),
                ):
                    raise classified_error

        # Try fallback if enabled and no tokens sent
        if self.fallback:
            try:
                logger.debug(f"Streaming via fallback: {self.fallback_provider_name}")
                async for chunk, metadata in self.fallback.stream(
                    messages, system, max_tokens
                ):
                    # Mark fallback_used in final metadata
                    if metadata is not None:
                        # We'd need to track this differently; for now just yield
                        pass
                    yield chunk, metadata
                return
            except Exception as e:
                logger.error(f"Fallback streaming also failed: {e}")
                raise RuntimeError(
                    f"All streaming providers failed. Primary: {self.primary_provider_name}, "
                    f"Fallback: {self.fallback_provider_name}"
                )

        raise RuntimeError("No streaming providers available")

    def get_provider_status(self) -> dict:
        """Get status of all providers."""
        return {
            "primary": {
                "name": self.primary_provider_name,
                "available": self.primary is not None,
                "model": self.primary.model if self.primary else None,
            },
            "fallback": {
                "name": self.fallback_provider_name,
                "available": self.fallback is not None,
                "model": self.fallback.model if self.fallback else None,
            },
            "routing_mode": self.routing_mode,
            "primary_weight": self.primary_weight,
        }
