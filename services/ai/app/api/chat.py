"""
Simple chat endpoint following proyecto-agente-rckt reference pattern.

Accepts messages, returns completed response.
No streaming at provider level (SSE wrapper added by BFF).
"""

import logging
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.llm.simple_client import generate_chat_response

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/v1", tags=["chat"])


class Message(BaseModel):
    """Single message in conversation."""
    role: str  # "user" | "assistant" | "system"
    content: str


class ChatRequest(BaseModel):
    """Request for chat completion."""
    messages: list[Message]
    agent_profile: str = "rckt_advisor"


class ChatResponse(BaseModel):
    """Response with completed chat."""
    choices: list[dict]
    usage: dict


@router.post("/chat/completions", response_model=ChatResponse)
async def chat_completions(req: ChatRequest):
    """
    Chat completion endpoint.

    Returns OpenAI-compatible response with completed text.
    No streaming at provider level.
    """
    # Convert pydantic messages to plain dicts
    messages = [{"role": m.role, "content": m.content} for m in req.messages]

    try:
        reply, tokens, latency_ms = await generate_chat_response(messages)

        # Return OpenAI-compatible format
        return ChatResponse(
            choices=[
                {
                    "index": 0,
                    "message": {"role": "assistant", "content": reply},
                    "finish_reason": "stop",
                }
            ],
            usage={
                "prompt_tokens": 0,
                "completion_tokens": tokens,
                "total_tokens": tokens,
            },
        )

    except Exception as e:
        logger.error(f"Chat error: {e}")
        raise HTTPException(status_code=500, detail="Error processing chat request")
