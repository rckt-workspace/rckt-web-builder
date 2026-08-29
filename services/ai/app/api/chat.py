"""Chat endpoint - main AI assistant interface with multi-provider support."""

import logging
from fastapi import APIRouter, HTTPException, Depends
from anthropic import BadRequestError, APIError

from app.core import get_settings, Settings
from app.llm.router import LLMRouter
from app.llm.base import Message
from app.schemas.chat import ChatRequest, ChatResponse, ChatMessage

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/chat", tags=["chat"])


async def get_llm_router(settings: Settings = Depends(get_settings)) -> LLMRouter:
    """Dependency to provide LLM router with failover support."""
    if not settings.has_any_llm_provider():
        raise HTTPException(
            status_code=503,
            detail="No LLM providers configured. Set ANTHROPIC_API_KEY or OPENROUTER_API_KEY.",
        )
    try:
        return LLMRouter()
    except Exception as e:
        logger.error(f"Failed to initialize LLM router: {e}")
        raise HTTPException(status_code=503, detail="LLM provider initialization failed")


@router.post("", response_model=ChatResponse)
async def chat(
    request: ChatRequest,
    router: LLMRouter = Depends(get_llm_router),
) -> ChatResponse:
    """
    Chat with Claude or fallback assistant.

    Routes between primary (Anthropic Claude) and fallback (OpenRouter) providers.
    Automatically fails over if primary provider is unavailable.
    """
    try:
        # Convert ChatMessage to internal Message format
        messages = [
            Message(role=m.role, content=m.content)
            for m in request.messages
        ]

        # Generate response with automatic failover
        response_text = await router.generate(
            messages=messages,
            system=request.system,
            max_tokens=request.max_tokens,
        )

        # Return structured response
        return ChatResponse(
            message=ChatMessage(role="assistant", content=response_text),
            model=router.get_active_model(),
            stop_reason="end_turn",
        )

    except BadRequestError as e:
        logger.error(f"Invalid request: {e}")
        raise HTTPException(status_code=400, detail=f"Invalid request: {str(e)}")
    except APIError as e:
        logger.error(f"LLM API error: {e}")
        raise HTTPException(status_code=502, detail="LLM API error")
    except RuntimeError as e:
        logger.error(f"All LLM providers failed: {e}")
        raise HTTPException(status_code=503, detail="All LLM providers unavailable")
    except Exception as e:
        logger.error(f"Unexpected error in chat: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")
