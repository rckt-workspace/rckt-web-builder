#!/usr/bin/env python3
"""
TEST 17: Direct reference pattern validation.

Tests the proven patterns from proyecto-agente-rckt:
1. Provider-aware model resolution (NEVER mix models)
2. OpenRouter simple payload
3. Ordered provider chain
4. Local safe fallback on complete failure
"""

import asyncio
import sys
from pathlib import Path

# Add app to path
sys.path.insert(0, str(Path(__file__).parent))

from app.core import settings
from app.llm.simple_client import _build_chain, _call_openrouter


async def main():
    print("=" * 80)
    print("TEST 17: REFERENCE PATTERN VALIDATION")
    print("=" * 80)

    # Test 1: Configuration
    print("\n[1] Configuration Check")
    print(f"  Environment file: {Path(__file__).parent / '.env'}")
    print(f"  LLM Provider: {settings.llm_provider}")
    print(f"  LLM Fallback Provider: {settings.llm_fallback_provider}")
    print(f"  Has OpenRouter: {settings.has_openrouter}")
    print(f"  Has Anthropic: {settings.has_anthropic}")

    if not settings.has_any_llm_provider():
        print("  [FAIL] No providers configured!")
        return

    # Test 2: Provider chain resolution
    print("\n[2] Provider Chain Resolution")
    chain = _build_chain()
    print(f"  Resolved chain:")
    for i, (prov, model) in enumerate(chain, 1):
        print(f"    {i}. {prov} / {model}")

    if not chain:
        print("  [FAIL] Empty chain!")
        return

    # Test 3: Provider-aware model matching (CRITICAL)
    print("\n[3] Provider-Model Matching (CRITICAL)")
    for prov, model in chain:
        if prov == "openrouter" and model.startswith("claude"):
            print(f"  [FAIL] OpenRouter paired with Claude model: {model}")
            return
        if prov == "anthropic" and not model.startswith("claude"):
            print(f"  [FAIL] Anthropic paired with non-Claude model: {model}")
            return
        print(f"  [PASS] {prov} -> {model}")

    # Test 4: Direct OpenRouter call
    print("\n[4] Direct OpenRouter Call")
    if not settings.has_openrouter:
        print("  [SKIP] OpenRouter not configured")
    else:
        test_messages = [{"role": "user", "content": "Responde unicamente OK"}]
        print(f"  Calling {settings.openrouter_primary_model}...")

        result = await _call_openrouter(
            model=settings.openrouter_primary_model,
            messages=test_messages,
            temperature=0.2,
            max_tokens=10,
            timeout_sec=10.0,
        )

        if result is None:
            print("  [FAIL] OpenRouter call returned None")
        else:
            reply, tokens, latency_ms = result
            print(f"  [PASS] {latency_ms}ms | {tokens} tokens")
            print(f"  Reply: {reply[:100]}")

    # Test 5: Full chain execution
    print("\n[5] Full Provider Chain Execution")
    from app.llm.simple_client import generate_chat_response

    messages = [
        {
            "role": "user",
            "content": "Eres un asistente conciso. Responde en maximo 20 palabras.",
        }
    ]

    reply, tokens, latency_ms = await generate_chat_response(messages)

    if reply.startswith("En este momento tengo dificultad"):
        print(f"  [WARN] Returned local fallback (all providers failed)")
        print(f"  Fallback: {reply}")
    else:
        print(f"  [PASS] Generated response")
        print(f"  Latency: {latency_ms}ms | Tokens: {tokens}")
        print(f"  Reply: {reply[:100]}")

    print("\n" + "=" * 80)
    print("TEST COMPLETE")
    print("=" * 80)


if __name__ == "__main__":
    asyncio.run(main())
