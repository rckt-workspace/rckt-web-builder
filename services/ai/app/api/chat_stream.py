from fastapi.responses import StreamingResponse
"""Streaming chat endpoint with OpenAI-compatible SSE format."""

import json
import logging
from typing import Optional

from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel

from app.agents.profiles import PROFILES
from app.core import get_settings, Settings
from app.errors import ProviderError, ProviderQuotaError
from app.llm.base import Message
from app.llm.router import LLMRouter
from app.services.runtime_config import RuntimeConfigService

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/v1", tags=["streaming"])


class StreamChatRequest(BaseModel):
    """Streaming chat request."""

    agent_profile: str = "rckt_advisor"
    messages: list[dict] = []  # [{role, content}]
    session_id: Optional[str] = None


async def get_llm_router(
    settings: Settings = Depends(get_settings),
) -> LLMRouter:
    """Dependency to provide LLM router with runtime config."""
    if not settings.has_any_llm_provider():
        raise HTTPException(
            status_code=503,
            detail="No LLM providers configured.",
        )
    try:
        config_service = RuntimeConfigService()
        config = await config_service.get_config()
        return LLMRouter(config)
    except Exception as e:
        logger.error(f"Failed to initialize LLM router: {e}")
        raise HTTPException(status_code=503, detail="Provider initialization failed")


@router.post("/chat/stream")
async def chat_stream(
    request: StreamChatRequest,
    router_inst: LLMRouter = Depends(get_llm_router),
    settings: Settings = Depends(get_settings),
):
    """Stream chat response in OpenAI-compatible SSE format."""
    try:
        # Validate agent profile
        if request.agent_profile not in PROFILES:
            raise HTTPException(
                status_code=400,
                detail=f"Unknown agent profile: {request.agent_profile}",
            )

        profile = PROFILES[request.agent_profile]

        # Validate and convert messages
        try:
            messages = [
                Message(role=m["role"], content=m["content"]) for m in request.messages
            ]
        except (KeyError, TypeError) as e:
            raise HTTPException(status_code=400, detail=f"Invalid message format: {e}")

        if not messages:
            raise HTTPException(status_code=400, detail="Messages list is empty")

        # Check budget before streaming
        try:
            from app.services.budget import BudgetService

            config_service = RuntimeConfigService()
            config = await config_service.get_config()
            budget_check = await BudgetService.check(config)

            if budget_check and config.budget_policy == "hard_stop":
                raise HTTPException(
                    status_code=503,
                    detail="Service quota exceeded",
                )
        except ProviderQuotaError:
            raise
        except Exception as e:
            logger.warning(f"Budget check failed: {e}")

        # Stream the response
        async def stream_generator():
            try:
                accumulated_tokens = 0
                async for chunk, metadata in router_inst.stream(
                    messages=messages,
                    system=profile.system_prompt,
                    max_tokens=profile.default_max_tokens,
                ):
                    if chunk:
                        # Send content chunk
                        event = {
                            "choices": [
                                {
                                    "delta": {
                                        "content": chunk,
                                        "role": "assistant",
                                    }
                                }
                            ]
                        }
                        yield f"data: {json.dumps(event)}\n\n"

                    if metadata is not None:
                        # Final metadata event
                        accumulated_tokens = (
                            metadata.input_tokens + metadata.output_tokens
                        )
                        event = {
                            "choices": [{"delta": {"content": ""}}],
                            "usage": {
                                "prompt_tokens": metadata.input_tokens,
                                "completion_tokens": metadata.output_tokens,
                                "total_tokens": accumulated_tokens,
                                "cost_usd": metadata.cost_usd,
                            },
                        }
                        yield f"data: {json.dumps(event)}\n\n"

                # Emit done signal
                yield "data: [DONE]\n\n"

                # Record usage (fire-and-forget)
                try:
                    # We'd need to track the full result for this; for now skip
                    pass
                except Exception as e:
                    logger.warning(f"Failed to record usage: {e}")

            except ProviderQuotaError as e:
                logger.error(f"Quota exceeded: {e.message}")
                error_event = {
                    "choices": [],
                    "error": {"message": "Service quota exceeded", "type": "quota_error"},
                }
                yield f"data: {json.dumps(error_event)}\n\n"

            except ProviderError as e:
                logger.error(f"Provider error: {e.message}")
                error_event = {
                    "choices": [],
                    "error": {"message": "LLM provider error", "type": "provider_error"},
                }
                yield f"data: {json.dumps(error_event)}\n\n"

            except Exception as e:
                logger.error(f"Stream error: {e}")
                error_event = {
                    "choices": [],
                    "error": {"message": "Internal server error", "type": "server_error"},
                }
                yield f"data: {json.dumps(error_event)}\n\n"

        return StreamingResponse(
            stream_generator(),
            media_type="text/event-stream",
            headers={
                "Cache-Control": "no-cache",
                "X-Accel-Buffering": "no",
            },
        )

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Unexpected error in chat_stream: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")


