"""LLM Provider router with automatic fallback for redundancy."""

import logging
from typing import AsyncIterator, Optional

from app.core import settings
from .base import LLMProvider, Message
from .anthropic import AnthropicProvider
from .openrouter import OpenRouterProvider

logger = logging.getLogger(__name__)


class LLMRouter:
    """Routes requests between multiple LLM providers with fallback."""

    def __init__(self):
        self.primary_provider_name = settings.llm_provider
        self.fallback_provider_name = settings.llm_fallback_provider
        self.primary = None
        self.fallback = None

        self._init_providers()

    def _init_providers(self):
        """Initialize available providers based on configuration."""
        # Initialize primary provider
        if self.primary_provider_name == "anthropic" and settings.anthropic_configured():
            try:
                self.primary = AnthropicProvider()
                logger.info("Primary provider: Anthropic Claude")
            except Exception as e:
                logger.error(f"Failed to initialize Anthropic: {e}")

        elif self.primary_provider_name == "openrouter" and settings.openrouter_configured():
            try:
                self.primary = OpenRouterProvider()
                logger.info("Primary provider: OpenRouter")
            except Exception as e:
                logger.error(f"Failed to initialize OpenRouter: {e}")

        # Initialize fallback provider
        if self.fallback_provider_name == "anthropic" and settings.anthropic_configured():
            try:
                self.fallback = AnthropicProvider()
                logger.info("Fallback provider: Anthropic Claude")
            except Exception as e:
                logger.error(f"Failed to initialize Anthropic fallback: {e}")

        elif self.fallback_provider_name == "openrouter" and settings.openrouter_configured():
            try:
                self.fallback = OpenRouterProvider()
                logger.info("Fallback provider: OpenRouter")
            except Exception as e:
                logger.error(f"Failed to initialize OpenRouter fallback: {e}")

        if not self.primary and not self.fallback:
            raise RuntimeError(
                "No LLM providers configured. Configure at least one of: "
                "ANTHROPIC_API_KEY or OPENROUTER_API_KEY"
            )

    async def generate(
        self,
        messages: list[Message],
        system: Optional[str] = None,
        max_tokens: Optional[int] = None,
    ) -> str:
        """Generate response with automatic fallback."""
        # Try primary provider first
        if self.primary:
            try:
                logger.debug(f"Using primary provider: {self.primary_provider_name}")
                return await self.primary.generate(messages, system, max_tokens)
            except Exception as e:
                logger.warning(
                    f"Primary provider ({self.primary_provider_name}) failed: {e}. "
                    f"Attempting fallback..."
                )

        # Fall back to secondary provider
        if self.fallback:
            try:
                logger.debug(f"Using fallback provider: {self.fallback_provider_name}")
                return await self.fallback.generate(messages, system, max_tokens)
            except Exception as e:
                logger.error(f"Fallback provider also failed: {e}")
                raise RuntimeError(
                    f"All LLM providers failed. Primary: {self.primary_provider_name}, "
                    f"Fallback: {self.fallback_provider_name}"
                )

        # No providers available
        raise RuntimeError("No LLM providers available")

    async def stream(
        self,
        messages: list[Message],
        system: Optional[str] = None,
        max_tokens: Optional[int] = None,
    ) -> AsyncIterator[str]:
        """Stream response with automatic fallback."""
        # Try primary provider first
        if self.primary:
            try:
                logger.debug(f"Streaming via primary: {self.primary_provider_name}")
                async for chunk in self.primary.stream(messages, system, max_tokens):
                    yield chunk
                return
            except Exception as e:
                logger.warning(
                    f"Primary streaming failed: {e}. Attempting fallback..."
                )

        # Fall back to secondary provider
        if self.fallback:
            try:
                logger.debug(f"Streaming via fallback: {self.fallback_provider_name}")
                async for chunk in self.fallback.stream(messages, system, max_tokens):
                    yield chunk
                return
            except Exception as e:
                logger.error(f"Fallback streaming also failed: {e}")
                raise RuntimeError(
                    f"All streaming providers failed. Primary: {self.primary_provider_name}, "
                    f"Fallback: {self.fallback_provider_name}"
                )

        # No providers available
        raise RuntimeError("No streaming providers available")

    def get_active_model(self) -> str:
        """Get the model name of the active (primary or fallback) provider."""
        if self.primary:
            return self.primary.model
        elif self.fallback:
            return self.fallback.model
        return "unknown"

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
        }
