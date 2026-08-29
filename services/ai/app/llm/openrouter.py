"""OpenRouter provider implementation for fallback/redundancy."""

import logging
from typing import AsyncIterator, Optional

from httpx import AsyncClient

from app.core import settings
from .base import LLMProvider, Message

logger = logging.getLogger(__name__)


class OpenRouterProvider(LLMProvider):
    """OpenRouter LLM provider for fallback when Anthropic unavailable."""

    def __init__(self):
        if not settings.openrouter_configured():
            raise ValueError(
                "OpenRouter not configured. Set OPENROUTER_API_KEY and OPENROUTER_MODEL."
            )
        self.api_key = settings.openrouter_api_key
        self.model = settings.openrouter_model
        self.base_url = settings.openrouter_base_url
        logger.info(f"OpenRouterProvider initialized with model={self.model}")

    async def generate(
        self,
        messages: list[Message],
        system: Optional[str] = None,
        max_tokens: Optional[int] = None,
    ) -> str:
        """Generate a single response via OpenRouter."""
        try:
            msg_dicts = [{"role": m.role, "content": m.content} for m in messages]

            async with AsyncClient() as client:
                response = await client.post(
                    f"{self.base_url}/chat/completions",
                    json={
                        "model": self.model,
                        "messages": msg_dicts,
                        "system": system,
                        "max_tokens": max_tokens or 1024,
                    },
                    headers={
                        "Authorization": f"Bearer {self.api_key}",
                        "HTTP-Referer": "https://rckt.es",
                        "X-Title": "RCKT AI",
                    },
                    timeout=45.0,
                )
                response.raise_for_status()
                data = response.json()

                # OpenRouter returns choices[0].message.content
                if data.get("choices"):
                    return data["choices"][0]["message"]["content"]
                return ""

        except Exception as e:
            logger.error(f"OpenRouter generate failed: {e}")
            raise

    async def stream(
        self,
        messages: list[Message],
        system: Optional[str] = None,
        max_tokens: Optional[int] = None,
    ) -> AsyncIterator[str]:
        """Stream response chunks via OpenRouter."""
        try:
            msg_dicts = [{"role": m.role, "content": m.content} for m in messages]

            async with AsyncClient() as client:
                async with client.stream(
                    "POST",
                    f"{self.base_url}/chat/completions",
                    json={
                        "model": self.model,
                        "messages": msg_dicts,
                        "system": system,
                        "max_tokens": max_tokens or 1024,
                        "stream": True,
                    },
                    headers={
                        "Authorization": f"Bearer {self.api_key}",
                        "HTTP-Referer": "https://rckt.es",
                        "X-Title": "RCKT AI",
                    },
                    timeout=45.0,
                ) as response:
                    response.raise_for_status()
                    async for line in response.aiter_lines():
                        if line.startswith("data: "):
                            try:
                                import json

                                chunk = json.loads(line[6:])
                                if chunk.get("choices"):
                                    delta = chunk["choices"][0].get("delta", {})
                                    content = delta.get("content", "")
                                    if content:
                                        yield content
                            except Exception:
                                pass

        except Exception as e:
            logger.error(f"OpenRouter stream failed: {e}")
            raise
