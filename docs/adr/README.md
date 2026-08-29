# Architecture Decision Records (ADRs)

## Overview

This directory documents significant architectural decisions for the RCKT platform.

Each ADR records:
- **Context**: Why the decision was needed
- **Decision**: What we chose
- **Rationale**: Why this choice
- **Consequences**: Positive and negative outcomes
- **Alternatives**: What we considered but rejected

## ADRs

### [ADR-001: Modular Platform Architecture](./ADR-001-platform-modular-architecture.md)

**Status**: Accepted

RCKT is structured as a **modular platform** around the stable web application:
- Web layer (TanStack Start + Nitro)
- AI service (FastAPI + Claude)
- Data layer (Supabase)
- Intelligence layer (Google ecosystem)

**Why**: Separates concerns, enables independent scaling, allows incremental migration (strangler pattern).

---

### [ADR-002: Anthropic as Exclusive LLM Provider](./ADR-002-anthropic-only-llm-provider.md)

**Status**: Accepted

**Claude (Anthropic) is the exclusive LLM provider.**

- ✅ Anthropic Claude (production LLM)
- ❌ No OpenRouter
- ❌ No Gemini API
- ❌ No multi-provider abstraction yet

**Why**: Claude has best quality/speed/cost balance. Single provider simplifies observability. Easy to add providers later via `LLMProvider` interface.

---

### [ADR-003: Google as Data & Intelligence Layer (Not LLM)](./ADR-003-google-as-data-intelligence-layer.md)

**Status**: Accepted

**Google provides data and metrics, not LLM.**

- ✅ GA4, Search Console, CrUX for metrics
- ✅ BigQuery in Phase 2 (not Phase 1)
- ✅ Looker Studio for dashboards (future)
- ❌ Gemini API not for production LLM

**Why**: Anthropic handles LLM. Google handles data. Clear separation of concerns. BigQuery deferred until volume justifies cost.

---

### [ADR-004: RCKT Control Center (Future Dashboard)](./ADR-004-rckt-control-center.md)

**Status**: Accepted

**Control Center UI deferred to Phase 2.**

- Phase 1 (now): APIs only (health, metrics, events)
- Phase 2 (Q4 2026): React dashboard + real-time streaming
- Phase 3+: Advanced analytics, alerts, automation

**Why**: Phase 1 focuses on backend foundation. UI built after validating workflows via APIs. Reduces scope, clarifies requirements.

---

## Decision Matrix

| Area | Decision | Status | Review Date |
|------|----------|--------|-------------|
| Architecture | Modular services | ✅ Accepted | ADR-001 |
| LLM | Anthropic only | ✅ Accepted | ADR-002 |
| Data/Metrics | Google sources | ✅ Accepted | ADR-003 |
| UI | Deferred to Phase 2 | ✅ Accepted | ADR-004 |

## How to Use These ADRs

1. **New team members**: Read ADR-001 → ADR-003 to understand the strategy
2. **Design decisions**: Check relevant ADR before proposing changes
3. **Debates**: Refer to rationale and alternatives (saves re-discussing)
4. **Updates**: If context changes, propose new ADR or "supersedes" note

## Contributing ADRs

When adding a new ADR:

1. Copy template from an existing ADR
2. Follow the structure: Context → Decision → Rationale → Consequences → Alternatives
3. Link to related ADRs with `[[ADR-###-slug]]` syntax
4. Add summary to this README
5. Get approval before merging

## Template

```markdown
# ADR-XXX: [Title]

**Date**: [ISO date]
**Status**: Pending | Accepted | Superseded
**Affects**: [Components/layers]

## Context
[Why this decision matters]

## Decision
[What we chose]

## Rationale
[Why this choice]

## Consequences
[Positive, negative, mitigations]

## Alternatives Considered
[What else we looked at]

## Implementation
[How to execute this decision]

## Related ADRs
[Links to other ADRs]
```

---

**Last updated**: August 25, 2026
