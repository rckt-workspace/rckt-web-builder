# RCKT AI Service

Claude-first LLM orchestrator foundation for the RCKT Growth Operating System.

## Quick Start

### Prerequisites

- Python 3.12+
- `pip` or similar package manager

### Setup

```bash
# Install dependencies
pip install -e .

# Set environment variables
export ANTHROPIC_API_KEY="sk-ant-..."
export APP_ENV="development"

# Run tests
pytest

# Start development server
python -m uvicorn app.main:app --reload
```

### Health Checks

- **Liveness**: `GET /healthz` → Always responds with `status: ok` if service is running
- **Readiness**: `GET /readyz` → Validates Anthropic configuration before accepting traffic

## Architecture

### Core Components

**LLM Layer** (`app/llm/`)
- Abstract `LLMProvider` interface
- `AnthropicProvider` for Claude integration
- Pluggable design for future providers

**Metrics** (`app/metrics/`)
- Canonical `MetricPoint` and `MetricsSnapshot` schema
- Adapters for GA4, Search Console, CrUX, Render
- `RCKTProductEvent` contract for internal events

**Configuration** (`app/core/`)
- Centralized `Settings` from environment
- Never read env vars directly from modules
- Methods: `anthropic_configured()`, `supabase_configured()`, etc.

### Future Modules

- **Agents** (`app/agents/`): Multi-step reasoning with tool use
- **RAG** (`app/rag/`): Vector stores and retrieval (pgvector in Supabase)
- **Memory** (`app/memory/`): Conversation context and persistence
- **Prompts** (`app/prompts/`): Template management
- **Tools** (`app/tools/`): Function definitions for agents
- **Observability** (`app/observability/`): Langfuse, Sentry integration

## Security

- **No hardcoded secrets**. All config from environment.
- **CORS restricted** to known origins (Render frontend).
- **Service role key never exposed** to client code.
- **Anthropic API key server-side only**.

## Testing

```bash
# Run all tests
pytest

# With coverage
pytest --cov=app --cov-report=html

# Specific test
pytest tests/test_health.py::test_healthz
```

## Deployment

### Docker

```bash
docker build -t rckt-ai:latest .
docker run -p 8000:8000 \
  -e ANTHROPIC_API_KEY="sk-ant-..." \
  rckt-ai:latest
```

### Environment Variables

```env
# Core
APP_ENV=production
APP_NAME=rckt-ai
APP_VERSION=0.1.0
LOG_LEVEL=INFO

# LLM (REQUIRED)
ANTHROPIC_API_KEY=sk-ant-...
ANTHROPIC_MODEL=claude-3-5-sonnet-20241022

# Database (optional)
SUPABASE_URL=https://...
SUPABASE_SERVICE_ROLE_KEY=...

# Observability (optional)
LANGFUSE_PUBLIC_KEY=...
LANGFUSE_SECRET_KEY=...
SENTRY_DSN=...

# CORS
CORS_ORIGINS=["https://rckt-launchpad.onrender.com"]
```

## Decision Records

See `/docs/adr/` for architecture decisions:

- **ADR-002**: Anthropic-only LLM provider (no OpenRouter, no Gemini)
- **ADR-003**: Google as data/intelligence layer (not for LLM)
- **ADR-004**: RCKT control center architecture

## Roadmap

- [ ] Claude agent with tool use
- [ ] RAG with pgvector embeddings
- [ ] Langfuse observability
- [ ] GA4 metrics adapter
- [ ] Search Console integration
- [ ] Render metrics streaming
- [ ] RCKT internal event pipeline
- [ ] Control center UI

## License

Proprietary - RCKT
