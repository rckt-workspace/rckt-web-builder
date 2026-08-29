"""Base LLM provider interface."""

from abc import ABC, abstractmethod
from typing import AsyncIterator, Optional, Tuple

from app.schemas.generation import GenerationResult


class Message:
    """LLM message structure."""

    def __init__(self, role: str, content: str):
        self.role = role
        self.content = content

    def to_dict(self) -> dict:
        return {"role": self.role, "content": self.content}


class PartialMetadata:
    """Partial metadata for streaming responses."""

    def __init__(
        self,
        input_tokens: int = 0,
        output_tokens: int = 0,
        cached_tokens: int = 0,
        cost_usd: Optional[float] = None,
    ):
        self.input_tokens = input_tokens
        self.output_tokens = output_tokens
        self.cached_tokens = cached_tokens
        self.cost_usd = cost_usd


class LLMProvider(ABC):
    """Abstract base for LLM providers."""

    @abstractmethod
    async def generate(
        self,
        messages: list[Message],
        system: Optional[str] = None,
        max_tokens: Optional[int] = None,
    ) -> GenerationResult:
        """Generate a single response (non-streaming)."""
        pass

    @abstractmethod
    async def stream(
        self,
        messages: list[Message],
        system: Optional[str] = None,
        max_tokens: Optional[int] = None,
    ) -> AsyncIterator[Tuple[str, Optional[PartialMetadata]]]:
        """Stream response chunks with optional metadata."""
        pass
