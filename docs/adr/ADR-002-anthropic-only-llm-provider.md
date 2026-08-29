# ADR-002: Multi-Provider LLM Architecture - Anthropic Primary + OpenRouter Redundancy

**Date**: August 25, 2026 (Updated: August 29, 2026)
**Status**: Accepted (Revised)
**Affects**: LLM layer, API design, admin control center, Supabase configuration

## Context

Following Phase 1 implementation, the platform evolved from Anthropic-exclusive to a runtime-configurable dual-provider system:

1. **Previous state**: Single provider (Anthropic Claude) hardcoded at deploy time
2. **Current need**: Runtime provider selection, weighted routing, and cost-aware failover without redeployment
3. **Operational pressure**: Need to switch providers, test alternatives, and respond to availability issues without engineering changes

## Decision

**Adopt runtime-configurable dual-provider LLM architecture**:
- **Primary**: Anthropic Claude (preferred for quality, tool use, streaming)
- **Fallback**: OpenRouter (redundancy, cost alternatives when Claude unavailable)
- **Configuration**: Stored in Supabase `ai_runtime_config` table, editable via `/ops/ai-control` dashboard
- **Routing modes**: Failover (try primary, fallback on failure) + Weighted (probabilistic provider selection)

## Rationale

**Operational Excellence**:
- Switch providers and models in real time without redeployment or downtime
- Cost optimization: prefer cheaper models when budget pressure exists
- Redundancy: OpenRouter fallback ensures service never goes down due to single provider failure
- Observable: track which provider served each request via `ai_usage_events` table

**Technical Advantages**:
- Anthropic remains primary (superior quality, better tool support, native streaming)
- OpenRouter provides escape hatch (Llama, Mistral, and others) without extra integration work
- Error classification (distinguish 5xx from 4xx, rate limits, quota) informs fallback decisions
- Usage tracking enables cost forecasting and budget enforcement

**Strategic Flexibility**:
- Deployment-time `env vars` still set initial defaults
- Runtime config can override without rebuild
- Foundation for future providers (add new `LLMProvider` subclass, configure in dashboard)
- Audit trail: `ai_config_audit` table tracks all config changes with who/when/what

## What Changed vs. ADR-002-v1

| Aspect | Before | After |
|--------|--------|-------|
| Provider selection | Hardcoded at build time | Runtime configurable |
| Fallback strategy | Fail fast | Automatic OpenRouter fallback |
| Routing | Simple try-primary | Failover + Weighted modes |
| Cost control | Environment budgets only | Budget policies (warn, prefer_cheaper, hard_stop) |
| Observability | Per-call logging | Structured usage events + audit log |
| Admin control | CI/CD, PR review | Dashboard (`/ops/ai-control`) |

## Non-Decisions (Affirmed from v1)

### 1. ✅ Anthropic as Primary

**Why Anthropic primary, not OpenRouter?**
- Superior streaming implementation and token counting
- Best-in-class tool use for agent patterns
- Native system prompt handling
- We pay Anthropic directly → better pricing than OpenRouter markup

**When to reconsider**: If Anthropic prices increase >20% above alternatives or reliability drops below 99%.

### 2. ✅ Dual-Provider Model, Not Single

**Why not stick with Anthropic-only?**
- Single provider = single point of failure
- Anthropic API occasionally has brief downtime (hours/year)
- Cost arbitrage: Llama 3.1 (OpenRouter) costs 90% less than Claude for lower-quality tasks
- Weighted routing enables canary testing of new models before migration

### 3. ✅ No Multi-Provider Abstraction Layer

We use `LLMProvider` abstract class, but **do NOT** hide provider details:
- Each provider (Anthropic, OpenRouter) is instantiated explicitly
- Router chooses which instance to call, doesn't hide the choice
- Clear tradeoff visibility: operator sees "using OpenRouter" not "using provider X"

## Explicit Non-Decisions

### ❌ No OpenAI GPT-4o Support

**Why not**: RCKT standardized on Anthropic. If GPT-4o needed:
1. Create `OpenAIProvider(LLMProvider)` in `app/llm/openai.py`
2. Add `primary_provider: 'openai'` option to `ai_runtime_config`
3. Deploy and switch via dashboard

**Cost**: ~2 hours engineering. Decision: not needed yet.

### ❌ No Gemini/Vertex AI

**Why not**: Gemini is for:
- Data understanding (Google Analytics, Search Console — handled separately in ADR-003)
- Google Workspace automation (Sheets, Docs — use native integrations)

NOT for production LLM reasoning calls. Anthropic/OpenRouter are better.

### ❌ No Runtime Provider Secrets

**Why not**: Provider API keys stay in environment variables only:
- `ANTHROPIC_API_KEY` → not in Supabase
- `OPENROUTER_API_KEY` → not in Supabase
- `ai_runtime_config` table only stores model names, weights, policies

**Rationale**: Secrets in databases are a compliance risk. Environment secrets are more defensible.

## Consequences

### Positive
- ✅ Redundancy: single provider failure doesn't stop service
- ✅ Cost savings: can switch to cheaper models on-demand
- ✅ No redeployment needed for routing changes
- ✅ Structured usage tracking enables forecasting and optimization
- ✅ Audit trail for compliance (who changed config when)

### Negative
- ⚠️ Operational complexity: must manage two provider integrations
- ⚠️ Response time variance: fallback adds latency if primary fails
- ⚠️ Cost tracking harder: two providers, variable pricing

**Mitigation**:
- Dashboard shows provider status and recent errors
- Budget policies enforce cost guardrails
- Usage events table enables cost forecasting

## Implementation

### Backend (`services/ai/`)
1. ✅ New database tables: `ai_runtime_config`, `ai_usage_events`, `ai_config_audit`
2. ✅ Error classification: typed exception hierarchy (ProviderUnavailableError, ProviderRateLimitError, etc.)
3. ✅ `GenerationResult` dataclass: tracks cost, tokens, latency, provider, fallback_used
4. ✅ `RuntimeConfigService`: loads config from Supabase with 30s cache
5. ✅ `LLMRouter`: accepts `RuntimeConfig`, supports failover + weighted routing
6. ✅ `/internal/config`, `/internal/usage`, `/internal/models`, `/internal/test-provider` admin APIs
7. ✅ `/v1/chat/stream`: new streaming endpoint with OpenAI-compatible SSE format
8. ✅ Budget enforcement: `BudgetService` applies cost policies

### Frontend (`src/`)
1. ✅ `/ops/login`: password-protected admin login with rate limiting
2. ✅ `/ops/ai-control`: dashboard to view/edit runtime config
3. ✅ `/api/admin/*`: session-authenticated proxy routes to AI service
4. ✅ `/api/advisor-chat`: updated to use rckt-ai (with Lovable fallback)

### Data
1. ✅ `supabase/migrations/20260829000001_ai_runtime_config.sql`
2. ✅ `supabase/migrations/20260829000002_ai_usage_events.sql`
3. ✅ `supabase/migrations/20260829000003_ai_config_audit.sql`

## Related ADRs

- [[ADR-001-platform-modular-architecture]]
- [[ADR-003-google-as-data-intelligence-layer]]

## Appendix: Config Example

```json
{
  "active_agent_profile": "rckt_advisor",
  "routing_mode": "failover",
  "primary_provider": "anthropic",
  "primary_model": "claude-sonnet-5",
  "secondary_provider": "openrouter",
  "secondary_model": "meta-llama/llama-3.1-8b-instruct:free",
  "primary_weight": 100,
  "fallback_enabled": true,
  "max_tokens": 900,
  "primary_timeout_ms": 45000,
  "fallback_timeout_ms": 45000,
  "daily_budget_usd": 10.0,
  "budget_policy": "warn_only",
  "enabled": true
}
```
