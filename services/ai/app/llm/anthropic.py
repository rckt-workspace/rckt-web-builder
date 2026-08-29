"""Anthropic Claude provider implementation."""

import logging
from typing import AsyncIterator, Optional

from anthropic import AsyncAnthropic

from app.core import settings
from .base import LLMProvider, Message

logger = logging.getLogger(__name__)


class AnthropicProvider(LLMProvider):
    """Claude integration via Anthropic API."""

    def __init__(self, model: Optional[str] = None):
        if not settings.anthropic_configured():
            raise ValueError(
                "Anthropic not configured. Set ANTHROPIC_API_KEY and ANTHROPIC_MODEL."
            )
        self.api_key = settings.anthropic_api_key
        self.model = model or settings.anthropic_model
        self.client = AsyncAnthropic(api_key=self.api_key)
        logger.info(f"AnthropicProvider initialized with model={self.model}")

    async def generate(
        self,
        messages: list[Message],
        system: Optional[str] = None,
        max_tokens: Optional[int] = None,
    ) -> str:
        """Generate a single response."""
        try:
            msg_dicts = [{"role": m.role, "content": m.content} for m in messages]

            response = await self.client.messages.create(
                model=self.model,
                max_tokens=max_tokens or 1024,
                system=system,
                messages=msg_dicts,
            )

            # Collect text blocks (future-proof for tool use and other content types)
            text_parts = [
                block.text
                for block in response.content
                if hasattr(block, "type") and block.type == "text"
            ]
            return "".join(text_parts)
        except Exception as e:
            logger.error(f"Anthropic generate failed: {e}")
            raise

    async def stream(
        self,
        messages: list[Message],
        system: Optional[str] = None,
        max_tokens: Optional[int] = None,
    ) -> AsyncIterator[str]:
        """Stream response chunks."""
        try:
            msg_dicts = [{"role": m.role, "content": m.content} for m in messages]

            async with self.client.messages.stream(
                model=self.model,
                max_tokens=max_tokens or 1024,
                system=system,
                messages=msg_dicts,
            ) as stream:
                async for text in stream.text_stream:
                    yield text
        except Exception as e:
            logger.error(f"Anthropic stream failed: {e}")
            raise
