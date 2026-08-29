# RCKT Platform Architecture

Platform overview, C1/C2 diagrams, and component relationships.

## High-Level Philosophy

RCKT is a **Claude-first growth operating system** built as a modular platform:

1. **Web Layer** (TanStack Start): Marketing site + embedded chat
2. **AI Layer** (FastAPI): LLM orchestration, agents, reasoning
3. **Data Layer** (Supabase): Leads, conversations, internal events
4. **Intelligence Layer** (Google): Analytics, search, UX metrics
5. **Observability Layer** (Langfuse, Sentry): Tracing, error tracking

**Guiding principle**: Start simple, scale gradually. No over-engineering until demand proves it.

## C1: System Context

```
┌─────────────────────────────────────────────────────────────┐
│                                                               │
│  Client (Browser)                                             │
│  ├── RCKT Web (rckt-launchpad.onrender.com)                  │
│  │   ├── Marketing pages (Sistema, Servicios, Método)        │
│  │   ├── AdvisorChat (embedded Claude)                       │
│  │   └── Diagnostico form                                    │
│  │                                                            │
│  └──→ HTTP (port 443)                                        │
│                                                               │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
        ┌──────────────────────────┐
        │   Render Services        │
        │                          │
        │  1. rckt-web (Node.js)   │
        │  ├─ /api/leads           │
        │  ├─ /api/save-chat       │
        │  └─ Marketing HTML/CSS   │
        │                          │
        │  2. rckt-ai (Python)     │
        │  ├─ /healthz, /readyz    │
        │  ├─ /chat (future)       │
        │  └─ /metrics (future)    │
        └──────────────────────────┘
                    │
        ┌───────────┼───────────┐
        │           │           │
        ▼           ▼           ▼
    Supabase    Anthropic   Google
    (data)      (Claude)    (metrics)
```

## C2: Component Architecture

### 1. Web Layer (TanStack Start + Nitro)

```
Client Browser
    │
    ├─→ GET /               (HTML, CSS, JS)
    ├─→ POST /api/leads     (lead capture)
    ├─→ POST /api/advisor-chat (LLM call via Lovable gateway)
    ├─→ POST /api/save-chat-lead (conversation storage)
    │
Nitro Router (/src/routes/)
    │
    ├─→ [/api/leads.ts]
    │   └─→ Supabase.insert("leads")
    │
    ├─→ [/api/advisor-chat.ts] ← WILL MIGRATE to FastAPI
    │   └─→ Claude (soon), Lovable gateway (now)
    │
    └─→ [/api/save-chat-lead.ts]
        └─→ Supabase.insert("chat_leads")

Supabase (PostgreSQL + Auth)
    ├─→ leads (name, email, company, source)
    ├─→ chat_leads (session_id, messages, email extracted)
    └─→ Future: RAG vectors (pgvector)
```

### 2. AI Service (FastAPI/Python)

```
FastAPI Application (services/ai/)
    │
    ├─→ [GET /healthz]
    │   └─→ Status: ok (always)
    │
    ├─→ [GET /readyz]
    │   ├─→ Check: Anthropic configured?
    │   ├─→ Check: Supabase configured? (optional)
    │   ├─→ Check: Observability configured? (optional)
    │   └─→ Ready: true if Anthropic OK
    │
    ├─→ [POST /chat] ← Future (replaces /api/advisor-chat)
    │   ├─→ LLMProvider.stream(messages, system_prompt)
    │   └─→ Response: SSE (Server-Sent Events)
    │
    ├─→ [GET /metrics/snapshot?source=ga4]
    │   └─→ MetricsSnapshot (normalized metrics)
    │
    └─→ [POST /events] ← Future (RCKT internal events)
        └─→ RCKTProductEvent (lead_generated, etc.)

LLM Layer
    │
    ├─→ LLMProvider (abstract base)
    │   └─→ AnthropicProvider (Claude implementation)
    │       └─→ Anthropic API (claude-sonnet-5)
    │
Metrics Layer
    │
    ├─→ GA4Adapter (→ Google Analytics 4)
    ├─→ SearchConsoleAdapter (→ Google Search Console)
    ├─→ CrUXAdapter (→ Chrome UX Report)
    └─→ RenderAdapter (→ Render metrics)

Observability
    │
    └─→ Langfuse (LLM tracing) ← Future
    └─→ Sentry (error tracking) ← Future
```

### 3. Data Layer (Supabase)

```
Supabase (Cloud PostgreSQL + Auth + Storage)
    │
    Tables:
    │
    ├─→ leads (public, RLS: anon can insert)
    │   ├─→ id, name, email, company, website, concern, source
    │   ├─→ created_at, user_agent
    │   └─→ Index: email, created_at
    │
    ├─→ chat_leads (private, RLS: service_role only)
    │   ├─→ session_id, messages (JSONB), email (extracted)
    │   ├─→ name, company, phone
    │   ├─→ created_at, updated_at
    │   └─→ Index: email, created_at
    │
    └─→ vectors (future pgvector for RAG, Phase 2+)
        ├─→ content, embedding (dimension TBD by embedding model)
        ├─→ source, metadata
        └─→ Index: TBD (determined by volume and query patterns)

RLS Policies:
    │
    ├─→ leads: public can insert (diagnostics)
    └─→ chat_leads: service_role only (backend inserts)
```

### 4. Intelligence Layer (Google Ecosystem)

```
Google APIs (Data sources only)
    │
    ├─→ Google Analytics 4
    │   └─→ POST /v1/properties/{id}:runReport
    │       └─→ Sessions, events, pageviews, conversions
    │
    ├─→ Google Search Console
    │   └─→ POST /sites/{siteUrl}/searchAnalytics/query
    │       └─→ Clicks, impressions, CTR, position
    │
    ├─→ Chrome UX Report (CrUX API)
    │   └─→ Field data for real-user Core Web Vitals (LCP, INP, CLS)
    │
    └─→ BigQuery (future Phase 2)
        └─→ Data warehouse for historical analysis

Flow:
    │
    GA4 / GSC / CrUX
        │
        ├─→ MetricsAdapter.collect()
        │
        └─→ MetricPoint {
            source: "ga4",
            metric: "sessions",
            value: 1250,
            unit: "count",
            dimensions: {page, device, country},
            timestamp: now,
            metadata: {...}
        }
        │
        ├─→ Normalize to canonical schema
        │
        └─→ Feed to Claude context:
            "Your sessions: 1250 this week (up 12% from last)"
```

## Data Flow

### User → Lead Capture

```
1. User visits rckt-launchpad.onrender.com
2. Fills diagnostico form
3. POST /api/leads {name, email, company, ...}
4. Nitro handler validates (Zod schema)
5. supabaseAdmin.from("leads").insert(...)
6. Database returns success
7. Frontend shows "Gracias"
8. User in "leads" table, ready for outreach
```

### User → Chat → Conversation Storage

```
1. User opens AdvisorChat
2. Browser generates session_id
3. User types message
4. POST /api/advisor-chat {messages: [...]}
5. Nitro streams response from Claude (via Lovable gateway, soon FastAPI)
6. Client receives streamed chunks
7. User's message + assistant response stored locally
8. When conversation ends, POST /api/save-chat-lead {session_id, messages}
9. Nitro handler extracts email/phone via regex
10. supabaseAdmin.from("chat_leads").upsert(...)
11. Database stores full conversation for follow-up
12. User in "chat_leads" table, qualified for consultation
```

### Metrics → Claude Context (Future)

```
1. Scheduled job (every 6 hours)
2. AI Service calls GA4Adapter.collect()
3. GA4 returns {sessions: 1250, events: 3400, ...}
4. Adapter normalizes to MetricPoint[]
5. Store MetricsSnapshot in Supabase
6. Claude agent fetches latest metrics
7. Claude adds context: "Traffic is..."
8. Claude makes decisions: "Recommend..."
9. Langfuse logs call + metrics context
10. Team reviews in Control Center (Phase 2 UI)
```

## Key Decisions

See `/docs/adr/`:

1. **[[ADR-001]]**: Modular architecture (web + AI services)
2. **[[ADR-002]]**: Anthropic Claude only (no Gemini API)
3. **[[ADR-003]]**: Google for data/metrics (not LLM)
4. **[[ADR-004]]**: Control Center deferred to Phase 2

## Current Status

**Phase 1 (Foundation)**:
- ✅ Web application (production, working)
- ✅ Supabase integration (leads, chat_leads)
- ✅ Lead capture (diagnostico form)
- ✅ Chat storage (conversations persisted)
- ✅ FastAPI scaffold created
- ✅ LLMProvider abstraction
- ✅ Metrics adapters (contracts defined)
- ⏳ Anthropic migration (from Lovable → FastAPI)
- ⏳ Agent implementation
- ⏳ RAG with pgvector

**Phase 2 (Growth)**:
- ⏳ Control Center UI (React dashboard)
- ⏳ Real-time metrics streaming
- ⏳ BigQuery integration
- ⏳ Langfuse observability (full)
- ⏳ Looker Studio dashboards

**Phase 3+ (Scale)**:
- Microservices (if demand)
- Multi-provider LLM support (if needed)
- Advanced RAG (semantic search, agents)
- Custom models (if beneficial)

## Deployment

Two independent services run on **Render** in the same GitHub repository:

```
Render Web Service: rckt-web
├─→ Build: bun install && bun run build
├─→ Start: bun .output/server/index.mjs
├─→ Runtime: Bun + Node.js (Nitro node-server preset)
├─→ Health: GET /healthz
├─→ Port: 3000 (auto-assigned)
└─→ Env:
    ├─→ SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
    ├─→ LOVABLE_API_KEY (→ will migrate to ANTHROPIC_API_KEY for new endpoints)
    └─→ LANGFUSE_* (observability)

Render Web Service: rckt-ai (separate service, same repo)
├─→ Build: pip install services/ai/
├─→ Start: python -m uvicorn app.main:app --port 8000
├─→ Runtime: Python 3.12 + FastAPI
├─→ Health: GET /healthz, GET /readyz
├─→ Port: 8000 (auto-assigned)
└─→ Env:
    ├─→ ANTHROPIC_API_KEY
    ├─→ SUPABASE_* (optional, for future RAG)
    └─→ LANGFUSE_* (observability)
```

**Service separation**: Both services can scale independently. Web service (Node) handles HTTP + SSR. AI service (Python) handles LLM, agents, metrics. Monorepo structure keeps related code together without forcing organizational coupling.

## Monitoring

| Layer | Tool | Signal |
|-------|------|--------|
| Web | Render logs | Errors, response time |
| AI | Langfuse | LLM latency, token use, cost |
| Data | Supabase | Query latency, storage |
| UX | GA4 | Sessions, bounce, conversions |
| Infrastructure | Render | CPU, memory, uptime |

## Next Steps

1. ✅ Scaffold AI service (this PR)
2. ⏳ Implement Anthropic provider with tool support
3. ⏳ Migrate AdvisorChat from Lovable → FastAPI Claude
4. ⏳ Add metrics adapters (GA4, GSC)
5. ⏳ Implement Claude agents with decision-making
6. ⏳ Set up Langfuse observability
7. ⏳ Phase 2: Control Center UI

---

**Questions?** See `/docs/adr/` for detailed decisions, or ask in the GitHub discussion.
