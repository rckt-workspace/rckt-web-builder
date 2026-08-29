# ADR-002: Anthropic as Exclusive LLM Provider

**Date**: August 25, 2026  
**Status**: Accepted  
**Affects**: LLM layer, API design, frontend chat

## Context

The platform currently uses **Gemini 3 Flash via Lovable gateway**. We need to evaluate:

1. **Single provider vs. multi-provider abstraction**: Should we build a router that supports OpenAI, Anthropic, and others?
2. **Cost and capability**: Which provider aligns with RCKT's needs?
3. **Future flexibility**: Can we add providers later without rewriting?

## Decision

**Adopt Anthropic Claude as the exclusive LLM provider** for the foreseeable future.

**Explicit non-decisions**:
- ❌ Do NOT integrate OpenRouter (removes direct Anthropic control)
- ❌ Do NOT add Gemini API (Google handled separately for data/metrics)
- ❌ Do NOT create abstraction for "pluggable LLMs" yet

## Rationale

**Operational**:
- Single provider simplifies observability, debugging, and iteration
- Avoids router complexity and cross-provider coordination overhead
- Focused monitoring (one LLM to instrument and trace)

**Technical**:
- Claude supports the capabilities required for RCKT's Advisor use case
- Native tool use, system prompts, and streaming
- Well-documented API with clear versioning

**Strategic**:
- Deliberate standardization reduces operational complexity during Phase 1
- Foundation for potential future multi-provider support if business requirements emerge
- Clear focus during initial platform development

## Multi-Provider: When, Not If

We explicitly choose **single provider now** because:

1. **Premature abstraction costs**: Building a router adds complexity without demand
2. **One provider teaches us the space**: Learn LLM patterns with Claude before multi-provider
3. **Easy to add later**: The `LLMProvider` interface in `app/llm/base.py` makes multi-provider addition trivial
4. **Flexibility via the interface**: If a project needs OpenAI, we create `OpenAIProvider(LLMProvider)` without refactoring core logic

## Explicit Non-Decisions

### 1. ❌ No OpenRouter

**Why not**: OpenRouter abstracts many providers (good for testing) but:
- Adds latency (extra hop)
- Increases cost (OpenRouter markup)
- Loses direct observability into Anthropic
- Harder to optimize Claude-specific features

**When to reconsider**: If RCKT's product requires multi-LLM support for A/B testing or specific workloads.

### 2. ❌ No Gemini API

**Why not**: Gemini (Vertex AI) is for:
- Quick exploration (NOT production LLM)
- Data understanding (handled via Google Analytics, Search Console, BigQuery — see ADR-003)
- Google-ecosystem automation

Gemini is NOT for:
- Production LLM calls in the API (that's Claude)
- Lead qualification and advice (Claude does this better)
- Tool use and agents (Claude has better tool support)

**Clarification**: Gemini Pro in Google Workspace (Gmail, Sheets, Docs) is fine for RCKT staff. Gemini API is not.

### 3. ❌ No OpenAI GPT-4o

**Why not**: RCKT selected Anthropic to maintain focus during Phase 1. If future business requirements demand multi-provider support, the `LLMProvider` interface makes OpenAI integration straightforward.

## Consequences

**Positive**:
- Clear decision: all code targets Claude
- Simpler observability (one LLM to monitor)
- Easier cost forecasting
- Stronger relationship with Anthropic

**Negative**:
- Less flexibility if Claude is unavailable (mitigation: fallback to cached responses)
- Vendor lock-in (mitigation: clear abstraction, easy to add providers later)

## Implementation

1. ✅ `LLMProvider` base class supports future providers
2. ✅ `AnthropicProvider` implementation with health checks
3. ✅ No OpenRouter integration
4. ✅ No GEMINI_API_KEY in environment
5. ❌ Do NOT build router/dispatch logic (premature)
6. ⏳ Implement agents with Claude tool use
7. ⏳ Add observability (Langfuse tracks Claude calls, not abstractions)

## Related ADRs

- [[ADR-001-platform-modular-architecture]]
- [[ADR-003-google-as-data-intelligence-layer]]
