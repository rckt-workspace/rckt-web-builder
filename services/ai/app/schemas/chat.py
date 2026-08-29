"""Chat request/response schemas."""

from pydantic import BaseModel, ConfigDict, Field
from typing import Optional, Literal


class ChatMessage(BaseModel):
    """Message in conversation."""

    model_config = ConfigDict(
        json_schema_extra={
            "example": {
                "role": "user",
                "content": "¿Cómo puedo mejorar mis conversiones en ecommerce?"
            }
        }
    )

    role: Literal["user", "assistant"]
    content: str


class ChatRequest(BaseModel):
    """Chat request body."""

    model_config = ConfigDict(
        json_schema_extra={
            "example": {
                "messages": [
                    {"role": "user", "content": "Hola, ¿cómo estás?"}
                ],
                "system": "Eres un asistente de RCKT especializado en crecimiento ecommerce",
                "max_tokens": 1024
            }
        }
    )

    messages: list[ChatMessage] = Field(
        ..., min_length=1, description="Conversation messages (at least one required)"
    )
    system: Optional[str] = Field(
        None,
        description="System prompt to guide assistant behavior"
    )
    max_tokens: Optional[int] = Field(
        1024, ge=100, le=4096, description="Maximum tokens in response"
    )


class ChatResponse(BaseModel):
    """Chat response."""

    model_config = ConfigDict(
        json_schema_extra={
            "example": {
                "message": {
                    "role": "assistant",
                    "content": "Puedo ayudarte con estrategias de conversión..."
                },
                "model": "claude-sonnet-5",
                "stop_reason": "end_turn"
            }
        }
    )

    message: ChatMessage = Field(..., description="Assistant response")
    model: str = Field(..., description="Model used")
    stop_reason: str = Field(..., description="Why generation stopped")
