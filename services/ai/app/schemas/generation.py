"""Data classes for LLM generation results."""

from dataclasses import dataclass, field
from uuid import uuid4, UUID


@dataclass
class GenerationResult:
    """Result of a generation request with full metadata."""

    content: str
    provider: str
    model: str
    fallback_used: bool = False
    input_tokens: int = 0
    output_tokens: int = 0
    cached_tokens: int = 0
    cost_usd: float | None = None
    cost_type: str | None = None  # 'actual' or 'estimated'
    latency_ms: int | None = None
    ttft_ms: int | None = None  # Time to first token in milliseconds
    request_id: UUID = field(default_factory=uuid4)
