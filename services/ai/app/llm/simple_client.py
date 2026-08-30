"""
Simplified LLM client following proyecto-agente-rckt reference pattern.

Provider chain:
1. Primary provider/model
2. Fallback provider/model (if configured)
3. Local safe response (if everything fails)

Key principles:
- Never mixes providers and models
- Simple HTTP calls (no streaming at provider layer)
- Bounded retries (timeout/connection errors only)
- Always returns (reply_text, tokens, latency_ms)
"""

import httpx
import logging
import time
from app.core import settings

logger = logging.getLogger(__name__)

# Simple bounds
MAX_RETRIES = 2
TIMEOUT = 45.0

_LOCAL_FALLBACK = (
    "En este momento tengo dificultad para conectarme con el motor de IA, "
    "pero el equipo de RCKT.es puede ayudarte de inmediato. "
    "¿Me compartes tus datos de contacto?"
)


def _provider_ready(provider: str) -> bool:
    """Check if a provider has real credentials configured."""
    if provider == "anthropic":
        return settings.has_anthropic
    return settings.has_openrouter


def _primary_model(provider: str) -> str:
    """Get primary model for provider (provider-aware resolution)."""
    if provider == "anthropic":
        return settings.anthropic_primary_model
    return settings.openrouter_primary_model


def _fallback_model(provider: str) -> str:
    """Get fallback model for provider (provider-aware resolution)."""
    if provider == "anthropic":
        return settings.anthropic_fallback_model
    return settings.openrouter_fallback_model


def _build_chain() -> list[tuple[str, str]]:
    """Build ordered provider/model chain to try."""
    chain: list[tuple[str, str]] = []

    # Primary provider
    provider = (settings.llm_provider or "openrouter").lower()
    if _provider_ready(provider):
        prim = _primary_model(provider)
        chain.append((provider, prim))
        # Also try fallback model from same provider
        fb_model = _fallback_model(provider)
        if fb_model and fb_model != prim:
            chain.append((provider, fb_model))

    # Fallback provider
    fallback_provider = (settings.llm_fallback_provider or "anthropic").lower()
    if (
        fallback_provider
        and fallback_provider != provider
        and _provider_ready(fallback_provider)
    ):
        fb_prim = _primary_model(fallback_provider)
        if fb_prim:
            chain.append((fallback_provider, fb_prim))

    return chain


async def _call_openrouter(
    model: str,
    messages: list[dict],
    temperature: float,
    max_tokens: int,
    timeout_sec: float,
) -> tuple[str, int, int] | None:
    """Call OpenRouter API. Returns None on any failure."""
    headers = {
        "Authorization": f"Bearer {settings.openrouter_api_key}",
        "HTTP-Referer": "https://rckt.es",
        "X-Title": "RCKT Advisor",
        "Content-Type": "application/json",
    }
    payload = {
        "model": model,
        "messages": messages,
        "temperature": temperature,
        "max_tokens": max_tokens,
    }

    t0 = time.monotonic()
    try:
        async with httpx.AsyncClient(timeout=timeout_sec) as client:
            resp = await client.post(
                f"{settings.openrouter_base_url}/chat/completions",
                headers=headers,
                json=payload,
            )
        latency_ms = int((time.monotonic() - t0) * 1000)

        if resp.status_code != 200:
            logger.error(
                f"OpenRouter HTTP {resp.status_code} model='{model}' | "
                f"body: {resp.text[:500]}"
            )
            return None

        data = resp.json()
        reply = data["choices"][0]["message"]["content"].strip()
        tokens = data.get("usage", {}).get("total_tokens", 0)
        logger.info(f"OpenRouter [{model}] {latency_ms}ms | {tokens} tokens")
        return reply, tokens, latency_ms

    except httpx.TimeoutException:
        latency_ms = int((time.monotonic() - t0) * 1000)
        logger.warning(f"OpenRouter timeout model='{model}'")
        return None
    except Exception as e:
        latency_ms = int((time.monotonic() - t0) * 1000)
        logger.error(f"OpenRouter exception: {type(e).__name__}: {e}")
        return None


async def _call_anthropic(
    model: str,
    messages: list[dict],
    temperature: float,
    max_tokens: int,
    timeout_sec: float,
) -> tuple[str, int, int] | None:
    """Call Anthropic API. Returns None on any failure."""
    # Extract system message if present
    system_content = ""
    chat_messages: list[dict] = []
    for msg in messages:
        if msg["role"] == "system":
            system_content = msg["content"]
        else:
            chat_messages.append({"role": msg["role"], "content": msg["content"]})

    headers = {
        "x-api-key": settings.anthropic_api_key,
        "anthropic-version": "2023-06-01",
        "Content-Type": "application/json",
    }
    payload: dict = {
        "model": model,
        "messages": chat_messages,
        "max_tokens": max_tokens,
        "temperature": temperature,
    }
    if system_content:
        payload["system"] = system_content

    t0 = time.monotonic()
    try:
        async with httpx.AsyncClient(timeout=timeout_sec) as client:
            resp = await client.post(
                f"{settings.anthropic_base_url}/v1/messages",
                headers=headers,
                json=payload,
            )
        latency_ms = int((time.monotonic() - t0) * 1000)

        if resp.status_code != 200:
            logger.error(
                f"Anthropic HTTP {resp.status_code} model='{model}' | "
                f"body: {resp.text[:500]}"
            )
            return None

        data = resp.json()
        reply = data["content"][0]["text"].strip()
        usage = data.get("usage", {})
        tokens = usage.get("input_tokens", 0) + usage.get("output_tokens", 0)
        logger.info(f"Anthropic [{model}] {latency_ms}ms | {tokens} tokens")
        return reply, tokens, latency_ms

    except httpx.TimeoutException:
        latency_ms = int((time.monotonic() - t0) * 1000)
        logger.warning(f"Anthropic timeout model='{model}'")
        return None
    except Exception as e:
        latency_ms = int((time.monotonic() - t0) * 1000)
        logger.error(f"Anthropic exception: {type(e).__name__}: {e}")
        return None


async def _call(
    provider: str,
    model: str,
    messages: list[dict],
    temperature: float,
    max_tokens: int,
    timeout_ms: int,
) -> tuple[str, int, int] | None:
    """Dispatch to provider. Returns None on failure."""
    timeout_sec = timeout_ms / 1000.0
    if provider == "anthropic":
        return await _call_anthropic(model, messages, temperature, max_tokens, timeout_sec)
    return await _call_openrouter(model, messages, temperature, max_tokens, timeout_sec)


async def generate_chat_response(
    messages: list[dict],
) -> tuple[str, int, int]:
    """
    Generate response using provider chain.
    Always returns (reply, tokens, latency_ms).
    Never raises an exception.
    """
    chain = _build_chain()

    if not chain:
        logger.error(
            "No LLM provider configured with valid credentials. "
            "Check ANTHROPIC_API_KEY and OPENROUTER_API_KEY in .env"
        )
        return _LOCAL_FALLBACK, 0, 0

    logger.info(f"Provider chain: {chain}")

    # Try each provider/model in order
    for i, (provider, model) in enumerate(chain):
        timeout_ms = settings.chat_timeout_ms if i == 0 else settings.chat_fallback_timeout_ms
        logger.info(f"Attempt {i + 1}/{len(chain)}: {provider}/{model}")

        result = await _call(
            provider,
            model,
            messages,
            settings.chat_temperature,
            settings.chat_max_tokens,
            timeout_ms,
        )

        if result is not None:
            return result

    logger.warning("All providers failed, returning local fallback")
    return _LOCAL_FALLBACK, 0, 0
