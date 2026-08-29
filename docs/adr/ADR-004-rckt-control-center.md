# ADR-004: RCKT Control Center (Future Dashboard)

**Date**: August 25, 2026  
**Status**: Accepted  
**Affects**: Future product roadmap, UI architecture

## Context

RCKT currently has:

1. **Public web** (rckt-launchpad.onrender.com): Marketing + AdvisorChat
2. **Internal operations**: Team uses Google Workspace + Render dashboard

We need a **Control Center** to:

- View metrics aggregated from GA4, Search Console, CrUX
- Track leads through the pipeline (diagnostics → consultations)
- Monitor LLM performance (Claude latency, token use)
- Make decisions based on data + AI insights
- Track conversions (qualified leads, consultation bookings)

**Key question**: Is this Phase 1 or deferred?

## Decision

**RCKT Control Center is Phase 2+. NOT Phase 1.**

Phase 1 focuses on:
- ✅ Claude foundation (no GUI needed yet)
- ✅ Metrics adapters (data layer)
- ✅ Health infrastructure (health checks, Langfuse)

Phase 2 adds:
- ⏳ Control Center UI (React dashboard)
- ⏳ Real-time metric streaming
- ⏳ Observability dashboards

## Rationale

**Why defer the Control Center**:

1. **MVP works with APIs only**
   - Team can check metrics via API calls
   - Render dashboard for infrastructure
   - Langfuse for LLM observability
   - GA4/GSC native dashboards for metrics

2. **Clarifies core value first**
   - Can validate Claude agent workflow
   - Can prove metrics → decisions flow
   - Can measure lead conversions before building dashboard

3. **UI decisions emerge from usage**
   - Once team uses APIs, we know what view matters
   - Avoid building dashboard nobody uses

4. **Reduces Phase 1 scope**
   - Focus on backend foundation
   - Clear handoff to frontend team for Phase 2

## What Control Center Might Be (Phase 2)

```
RCKT Control Center (Future)

Home
├── This Week's Metrics
│   ├── Sessions (GA4)
│   ├── Organic clicks (GSC)
│   ├── Core Web Vitals (CrUX)
│   └── Chat volume (internal)
├── Leads Pipeline
│   ├── Chat diagnostics started: 23
│   ├── Contact info captured: 7
│   ├── Consultations requested: 2
│   └── Qualified leads: 1
├── LLM Performance
│   ├── Advisor chat latency: 2.3s avg
│   ├── Advisor quality score: 4.2/5
│   └── Top agent patterns
└── Claude Insights
    ├── "Your CAC rising, recommend…"
    ├── "Organic search recovering, momentum…"
    └── "Lead quality improving Q-o-Q…"

Settings
├── Integrations (GA4, GSC, CrUX)
├── Team members
├── Alerts & thresholds
└── Export to Looker Studio
```

**Who builds Phase 2**: Frontend team (React, Recharts, TailwindCSS) + Data team (API contracts from Phase 1).

## What Phase 1 Must Do

To enable Phase 2, Phase 1 must:

1. ✅ Create metric adapter contracts (`MetricsAdapter` base class)
2. ✅ Define normalized schemas (`MetricPoint`, `MetricsSnapshot`)
3. ✅ Create `/api/metrics` endpoint to serve metric snapshots
4. ✅ Store leads in `chat_leads` + `leads` tables (already done)
5. ✅ Log LLM calls to Langfuse (observability)
6. ✅ Define RCKT internal events (`RCKTProductEvent` enum)

## Not Doing in Phase 1

**Explicitly out of scope**:
- ❌ Dashboard UI (deferred to Phase 2)
- ❌ Real-time streaming (WebSocket, SSE)
- ❌ Alerts/thresholds (can use email rules from Langfuse)
- ❌ Team management UI (use Render/Google Workspace)
- ❌ BigQuery deep analytics (deferred, see ADR-003)

**Why**: These add frontend complexity without proving the backend flow works.

## Consequences

**Positive**:
- Phase 1 stays focused on AI + metrics foundation
- Team can validate workflows with CLI/API calls
- Phase 2 UI built on proven API contracts
- Easier to prototype different dashboard designs

**Negative**:
- Team lacks pretty visualizations Phase 1
- Metrics only accessible via API/code (not UI)
- BigQuery dashboards not available yet

**Mitigations**:
- Can export metrics to Google Sheets / Looker Studio manually
- Langfuse provides free observability dashboard
- CLI tool or Jupyter notebook can visualize metrics locally

## Transition to Phase 2

When to start Phase 2:

```python
if (
    backend_serving_metrics(stable=True)
    and claude_agents_working()
    and leads_pipeline_validated()
):
    start_phase_2 = True
    assign_frontend_team = True
    build_react_dashboard()
```

**Estimated timeline**: Q4 2026 (once Phase 1 stable in production).

## API Contract for Phase 2

Phase 1 must expose:

```
GET /api/metrics/snapshot?source=ga4&hours=24
→ MetricsSnapshot { source, metrics: [MetricPoint...] }

GET /api/metrics/leads?status=captured
→ { leads: [...], total_count: 7 }

GET /api/metrics/events?type=chat_started&limit=100
→ { events: [RCKTProductEvent...] }

GET /api/observability/advisor-performance
→ { latency_p50, latency_p99, quality_score, ... }
```

Phase 2 builds UI on top of these endpoints.

## Related ADRs

- [[ADR-001-platform-modular-architecture]]
- [[ADR-003-google-as-data-intelligence-layer]]
