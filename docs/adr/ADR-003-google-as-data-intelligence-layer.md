# ADR-003: Google as Data & Intelligence Layer (Not LLM)

**Date**: August 25, 2026  
**Status**: Accepted  
**Affects**: Metrics architecture, observability, future BigQuery pipeline

## Context

RCKT serves growth-focused companies that already have Google ecosystem:

- Google Analytics 4 (GA4) for traffic & behavior
- Google Search Console (GSC) for SEO & search performance
- Chrome User Experience Report (CrUX) for real-user metrics
- Google Workspace (Sheets, Docs, Gmail) for team collaboration
- Looker Studio for BI/dashboarding
- BigQuery for future data warehouse

**The question**: Should Google also be an LLM provider? **No.**

## Decision

**Google provides data and intelligence layers, NOT LLM services.**

```
Google Ecosystem (Data Sources)
├── Analytics 4              → Session, event, user behavior
├── Search Console          → Organic search, keywords, impressions
├── CrUX / PageSpeed        → Real-user experience (UX)
├── Looker Studio           → Dashboarding / reporting (future)
└── BigQuery                → Data warehouse (future Phase 2)

RCKT Control Center
├── Normalizes GA4 + GSC + CrUX → MetricPoint schema
├── Feeds metrics into Claude context → "Here's your traffic this week..."
├── Agents use metrics → Decision-making with data
└── Observability tracks Claude → Langfuse (not Google Analytics)

LLM (Anthropic Claude)       ← Exclusive provider
├── Understands metrics context
├── Makes recommendations
├── Plans actions
└── Calls tools (not just reading Google API)
```

## Explicit Non-Decisions

### ❌ No Gemini API for Production LLM

**Why not**:
- Gemini is Google's LLM offering
- Tempting to bundle with GA4 (single vendor)
- BUT: Anthropic Claude is strategically better (ADR-002)
- Gemini for exploration/team use (Google Workspace) is fine

### ✅ YES to BigQuery (Later)

**Phase 2 decision** (not Phase 1):

| Phase | Storage | Analytics | LLM |
|-------|---------|-----------|-----|
| 1 (Now) | Supabase PostgreSQL | GA4, GSC, CrUX | Claude |
| 2 (Q4 2026) | Supabase + BigQuery | GA4 → BQ pipelines | Claude + agents reading BQ |
| 3+ | Data warehouse | BI layer (Looker) | RAG over historical data |

**Trigger for BigQuery**: Once volume justifies the cost. Not before.

### ✅ YES to Looker Studio (Future)

Looker Studio is a BI/dashboard layer:
- Can visualize MetricSnapshots
- Can feed dashboards to team
- Claude context: "Based on this dashboard, our CAC is…"
- NOT on the critical path for Phase 1

## Why This Structure?

### 1. **Metrics as Context, Not Truth**

```
Claude Context:
"Session count 1,250 this week (GA4).
Search impressions +8% vs last week (GSC).
Core Web Vitals: LCP=2.5s (fair) (CrUX).
Your CAC across channels is $120 (Supabase internal)."

Claude Output:
"Your paid search ROI is declining. 
Recommend pause low-intent keywords, 
shift budget to organic + content."
```

Metrics inform Claude. Claude decides. Metrics are NOT the source of truth for AI.

### 2. **Observability Separation**

| System | Tracks | Tool |
|--------|--------|------|
| GA4 | User behavior (sessions, events) | Google Analytics |
| Render | Infrastructure (uptime, CPU) | Render dashboard |
| Langfuse | LLM performance (latency, token use) | Langfuse |
| RCKT internal | Lead flow, chat events | Supabase |

**No circular dependency**: Don't feed GA4 sessions back into GA4 for analysis. Use Claude + Langfuse for LLM observability.

### 3. **Privacy & Compliance**

- GA4 data stays in Google ecosystem (complies with Google's TOS)
- Supabase holds RCKT-specific data (leads, chats, internal events)
- BigQuery (if Phase 2) is RCKT-controlled data warehouse
- No mixing of user-facing metrics with internal decision-making

## Metrics Adapters

Each adapter normalizes data to a canonical `MetricPoint`:

```python
# app/metrics/adapters/

GA4Adapter()              # POST properties/{id}:runReport
SearchConsoleAdapter()    # POST sites/{url}/searchAnalytics/query
CrUXAdapter()             # CrUX API / PageSpeed Insights API
RenderAdapter()           # Render service logs & metrics (future)

# All normalize to MetricPoint:
MetricPoint(
  source="ga4",
  metric="sessions",
  value=1250,
  unit="count",
  dimensions={"page": "/sistema", "device": "desktop"},
  timestamp=...,
  metadata={...},
)
```

### Google Authentication (Not Implemented Phase 1)

Each Google integration requires separate authentication:

- **GA4**: Service account or OAuth with property access
- **Search Console**: OAuth or service account with explicit property authorization
- **CrUX**: Google Cloud API key for Chrome UX Report API

Do not assume one OAuth token works everywhere. Authentication per adapter remains out of scope for Phase 1.

## BigQuery: Phase 2+

**NOT Phase 1**. Why later?

1. **Cost**: BigQuery has per-query costs (manageable at scale)
2. **Complexity**: SQL knowledge required
3. **Benefit unclear**: Supabase + GA4 API cover 80% of needs
4. **Trigger**: When RCKT needs historical trend analysis across months/years

**When to add**:
```
if RCKT.historical_data_required() and RCKT.budget >= BIGQUERY_COSTS:
    add BigQueryAdapter()
    create data_pipeline(GA4 → BQ)
    train Claude on historical patterns
```

## Consequences

**Positive**:
- Clear roles: Google = data, Claude = intelligence
- Metrics stay in Google ecosystem (compliance)
- Easier to add more data sources (any adapter can normalize to MetricPoint)
- BigQuery optional, not mandatory
- No vendor lock-in to Gemini

**Negative**:
- Multiple API keys needed (GA4, GSC, CrUX)
- Requires OAuth setup for Google services
- BigQuery deferred (can't do advanced analytics Phase 1)

**Mitigations**:
- `MetricsAdapter` base class makes adding sources painless
- OAuth handled once, works for all Google services
- Cloud Logging / monitoring can bridge gaps until BigQuery

## Implementation

**Phase 1 (Now)**:
1. ✅ Define `MetricPoint` and `MetricsSnapshot` schemas
2. ✅ Create `GA4Adapter`, `SearchConsoleAdapter`, `CrUXAdapter` stubs
3. ⏳ Implement GA4 OAuth setup
4. ⏳ Implement GSC API client
5. ⏳ Feed metrics → Claude context (agents)

**Phase 2 (Q4 2026)**:
6. ⏳ BigQuery data warehouse
7. ⏳ Historical trend analysis in Claude context
8. ⏳ Looker Studio dashboards

## Related ADRs

- [[ADR-001-platform-modular-architecture]]
- [[ADR-002-anthropic-only-llm-provider]]
- [[ADR-004-rckt-control-center]]
