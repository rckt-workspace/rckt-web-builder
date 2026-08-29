"""OpenRouter provider implementation for fallback/redundancy."""

import json
import logging
import time
from typing import AsyncIterator, Optional, Tuple

from httpx import AsyncClient

from app.core import settings
from app.schemas.generation import GenerationResult
from .base import LLMProvider, Message, PartialMetadata

logger = logging.getLogger(__name__)


class OpenRouterProvider(LLMProvider):
    """OpenRouter LLM provider for fallback when Anthropic unavailable."""

    def __init__(self, model: Optional[str] = None):
        if not settings.openrouter_configured():
            raise ValueError(
                "OpenRouter not configured. Set OPENROUTER_API_KEY and OPENROUTER_MODEL."
            )
        self.api_key = settings.openrouter_api_key
        self.model = model or settings.openrouter_model
        self.base_url = settings.openrouter_base_url
        logger.info(f"OpenRouterProvider initialized with model={self.model}")

    async def generate(
        self,
        messages: list[Message],
        system: Optional[str] = None,
        max_tokens: Optional[int] = None,
    ) -> GenerationResult:
        """Generate a single response via OpenRouter."""
        try:
            start_time = time.time()
            msg_dicts = [{"role": m.role, "content": m.content} for m in messages]

            # Build messages list with system prompt
            all_messages = (
                [{"role": "system", "content": system}] if system else []
            ) + msg_dicts

            async with AsyncClient() as client:
                response = await client.post(
                    f"{self.base_url}/chat/completions",
                    json={
                        "model": self.model,
                        "messages": all_messages,
                        "max_tokens": max_tokens or 1024,
                        "usage": {"include_usage": True},
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

                latency_ms = int((time.time() - start_time) * 1000)

                # OpenRouter returns choices[0].message.content
                content = ""
                if data.get("choices"):
                    content = data["choices"][0]["message"]["content"]

                # Parse usage
                usage = data.get("usage", {})
                input_tokens = usage.get("prompt_tokens", 0)
                output_tokens = usage.get("completion_tokens", 0)

                return GenerationResult(
                    content=content,
                    provider="openrouter",
                    model=self.model,
                    fallback_used=False,
                    input_tokens=input_tokens,
                    output_tokens=output_tokens,
                    cached_tokens=0,
                    cost_usd=None,  # OpenRouter pricing varies, mark as None
                    cost_type="estimated",
                    latency_ms=latency_ms,
                )

        except Exception as e:
            logger.error(f"OpenRouter generate failed: {e}")
            raise

    async def stream(
        self,
        messages: list[Message],
        system: Optional[str] = None,
        max_tokens: Optional[int] = None,
    ) -> AsyncIterator[Tuple[str, Optional[PartialMetadata]]]:
        """Stream response chunks via OpenRouter."""
        try:
            start_time = time.time()
            first_token_time: Optional[float] = None
            msg_dicts = [{"role": m.role, "content": m.content} for m in messages]

            # Build messages list with system prompt
            all_messages = (
                [{"role": "system", "content": system}] if system else []
            ) + msg_dicts

            async with AsyncClient() as client:
                async with client.stream(
                    "POST",
                    f"{self.base_url}/chat/completions",
                    json={
                        "model": self.model,
                        "messages": all_messages,
                        "max_tokens": max_tokens or 1024,
                        "stream": True,
                        "usage": {"include_usage": True},
                    },
                    headers={
                        "Authorization": f"Bearer {self.api_key}",
                        "HTTP-Referer": "https://rckt.es",
                        "X-Title": "RCKT AI",
                    },
                    timeout=45.0,
                ) as response:
                    response.raise_for_status()
                    input_tokens = 0
                    output_tokens = 0

                    async for line in response.aiter_lines():
                        if line.startswith("data: "):
                            try:
                                chunk_text = line[6:]
                                if chunk_text == "[DONE]":
                                    # Emit final metadata
                                    ttft_ms = (
                                        int((first_token_time - start_time) * 1000)
                                        if first_token_time
                                        else None
                                    )
                                    metadata = PartialMetadata(
                                        input_tokens=input_tokens,
                                        output_tokens=output_tokens,
                                        cached_tokens=0,
                                        cost_usd=None,
                                    )
                                    yield "", metadata
                                    continue

                                chunk = json.loads(chunk_text)

                                # Try to extract usage from chunk
                                if "usage" in chunk:
                                    usage = chunk["usage"]
                                    input_tokens = usage.get("prompt_tokens", 0)
                                    output_tokens = usage.get("completion_tokens", 0)

                                if chunk.get("choices"):
                                    delta = chunk["choices"][0].get("delta", {})
                                    content = delta.get("content", "")
                                    if content:
                                        if first_token_time is None:
                                            first_token_time = time.time()
                                        yield content, None
                            except json.JSONDecodeError:
                                pass
                            except Exception as e:
                                logger.warning(f"Error parsing chunk: {e}")

        except Exception as e:
            logger.error(f"OpenRouter stream failed: {e}")
            raise
