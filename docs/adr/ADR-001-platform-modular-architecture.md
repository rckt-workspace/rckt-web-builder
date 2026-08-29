# ADR-001: Modular Platform Architecture

**Date**: August 25, 2026  
**Status**: Accepted  
**Affects**: Entire platform structure

## Context

RCKT evolved from a single web application (TanStack Start + React 19) into a platform that needs:

1. **Persistent LLM integration** beyond embedded chat
2. **Metrics intelligence** from multiple sources (GA4, Search Console, CrUX)
3. **Lead intelligence** pipeline
4. **Observability** and tracing
5. **Future scaling** without monolithic growth

The current embedded AdvisorChat uses Gemini via Lovable gateway. We need to:

- Adopt Claude as the canonical LLM
- Separate concerns into independent services
- Maintain stability of the existing web application
- Enable incremental migrations (strangler pattern)

## Decision

Create a **modular platform** around the stable web application:

```
rckt-web-builder/
├── src/                          # Web application (TanStack Start)
│   ├── routes/api/               # BFF routes (Node.js/Nitro)
│   ├── components/
│   └── integrations/supabase/
├── services/
│   └── ai/                       # FastAPI service (Python 3.12+)
│       ├── app/
│       │   ├── llm/              # Claude integration
│       │   ├── agents/           # Multi-step reasoning
│       │   ├── rag/              # Vector retrieval
│       │   ├── metrics/          # Data normalization
│       │   └── api/              # HTTP routes
│       ├── tests/
│       ├── pyproject.toml
│       └── Dockerfile
├── packages/
│   └── contracts/                # Shared types (future)
├── docs/
│   ├── architecture/             # C1/C2 diagrams
│   └── adr/                      # Decision records
└── infra/
    └── render/                   # Deployment config
```

## Rationale

**Separation of concerns**:
- Web layer (Node.js/Bun) handles HTTP, SSR, real-time
- AI layer (Python/FastAPI) handles LLM, agents, complex reasoning
- Metrics layer normalizes data from multiple sources
- Services communicate via HTTP or async queues

**No premature fragmentation**:
- Single monorepo keeps related code together
- Services can coexist without organizational friction
- Easy to pull apart later if needed

**Strangler pattern**:
- Existing web app continues to work unchanged
- New AI service runs alongside (can be same Render service or separate)
- AdvisorChat can migrate gradually from Lovable → FastAPI

**Technology alignment**:
- Web: TypeScript, React, TanStack (what the team knows)
- AI: Python, FastAPI, Anthropic (what LLM ecosystem uses)
- Infrastructure: Render, Supabase (already integrated)

## Consequences

**Positive**:
- Clean boundaries between web and AI concerns
- Easy to scale AI service independently
- Supabase pgvector ready for RAG embeddings
- Extensible for metrics adapters without touching web code
- Ready for agents, tools, observability

**Negative**:
- Two runtime environments (Node.js, Python)
- Cross-service communication overhead
- More deployment complexity (solvable with Docker Compose or Render's native services)

**Mitigations**:
- Both services run on same Render instance initially (lightweight FastAPI)
- Clear API contracts between services
- Shared types in `packages/contracts/` (future TypeScript generation)

## Alternatives Considered

1. **Monolithic Node.js**: Keep everything in TypeScript/Node.js
   - ❌ LLM ecosystem is Python-first (LangChain, LlamaIndex, etc.)
   - ❌ Harder to integrate bleeding-edge LLM libraries
   - ❌ Less mature agent/tool frameworks

2. **Microservices from day 1**: Separate services everywhere
   - ❌ Over-engineering for current scale
   - ❌ Operational complexity (Kubernetes, service mesh)
   - ❌ Communication overhead too high

3. **Embed FastAPI in Nitro**: Use Nitro as proxy to Python
   - ⚠️ Possible but adds network latency
   - ⚠️ Harder to debug cross-language stack traces

## Implementation

1. ✅ Create `services/ai/` with FastAPI scaffold
2. ✅ Implement health checks (`/healthz`, `/readyz`)
3. ✅ Define metrics contracts in `app.metrics.schemas`
4. ✅ Create metric adapters (GA4, Search Console, CrUX, Render)
5. ⏳ Implement Claude integration with agents
6. ⏳ Migrate AdvisorChat from Lovable → FastAPI Claude
7. ⏳ Implement pgvector RAG
8. ⏳ Set up observability (Langfuse, Sentry)

## Related ADRs

- [[ADR-002-anthropic-only-llm-provider]]
- [[ADR-003-google-as-data-intelligence-layer]]
- [[ADR-004-rckt-control-center]]
