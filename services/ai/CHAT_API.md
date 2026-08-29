# RCKT AI Chat Assistant - API Documentation

## Overview

The `/chat` endpoint provides a Claude-first interface for the RCKT AI Service. This is the main entry point for conversational interactions with Claude Sonnet.

## Endpoints

### POST /chat

Accepts messages and returns Claude's response.

**Request:**
```json
{
  "messages": [
    {
      "role": "user",
      "content": "¿Cómo puedo mejorar mis conversiones en ecommerce?"
    }
  ],
  "system": "Optional system prompt to guide behavior",
  "max_tokens": 1024
}
```

**Response (HTTP 200):**
```json
{
  "message": {
    "role": "assistant",
    "content": "Claude's response here..."
  },
  "model": "claude-sonnet-5",
  "stop_reason": "end_turn"
}
```

**Error Responses:**
- `400`: Invalid request format
- `503`: Anthropic not configured (missing ANTHROPIC_API_KEY or ANTHROPIC_MODEL)
- `502`: Claude API error
- `500`: Unexpected server error

## Configuration

### Required Environment Variables
```bash
ANTHROPIC_API_KEY=sk-ant-YOUR_API_KEY_HERE
ANTHROPIC_MODEL=claude-sonnet-5
```

### Optional Environment Variables
```bash
LOG_LEVEL=INFO                          # DEBUG, INFO, WARNING, ERROR
SUPABASE_URL=https://your-project...   # For metrics persistence
LANGFUSE_SECRET_KEY=...                # For observability (LangFuse)
```

## Usage Examples

### Basic Chat
```bash
curl -X POST http://localhost:8000/chat \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {"role": "user", "content": "Hola, ¿quién eres?"}
    ]
  }'
```

### With System Prompt
```bash
curl -X POST http://localhost:8000/chat \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {"role": "user", "content": "¿Cómo analizo mi tráfico?"}
    ],
    "system": "Eres un experto en analytics de RCKT especializado en ecommerce",
    "max_tokens": 2048
  }'
```

### Multi-turn Conversation
```bash
curl -X POST http://localhost:8000/chat \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {"role": "user", "content": "¿Cuáles son las mejores prácticas de SEO?"},
      {"role": "assistant", "content": "Las mejores prácticas incluyen..."},
      {"role": "user", "content": "¿Y para ecommerce específicamente?"}
    ]
  }'
```

## Running Locally

1. **Setup**
   ```bash
   cd services/ai
   cp .env.example .env
   # Edit .env and add your ANTHROPIC_API_KEY
   ```

2. **Install**
   ```bash
   pip install -e ".[dev]"
   ```

3. **Run Tests**
   ```bash
   pytest
   ```

4. **Start Server**
   ```bash
   python -m uvicorn app.main:app --reload
   ```

5. **Test Endpoint**
   ```bash
   curl -X POST http://localhost:8000/chat \
     -H "Content-Type: application/json" \
     -d '{"messages": [{"role": "user", "content": "Hola"}]}'
   ```

## Docker Deployment

```bash
docker build -t rckt-ai:latest .
docker run -p 8000:8000 \
  -e ANTHROPIC_API_KEY="sk-ant-..." \
  -e LOG_LEVEL="INFO" \
  rckt-ai:latest
```

## Architecture

- **Provider**: `AnthropicProvider` (app/llm/anthropic.py)
  - Fully async using `AsyncAnthropic`
  - Text extraction with future tool-use support
  - No temperature/top_p/top_k (uses model defaults)

- **Schemas**: `ChatRequest`, `ChatResponse`, `ChatMessage` (app/schemas/chat.py)
  - Pydantic v2 with ConfigDict
  - Validation for max_tokens (100-4096)
  - Role constraints (user/assistant)

- **Endpoint**: POST /chat (app/api/chat.py)
  - Dependency injection for LLM provider
  - Configuration validation
  - Error handling for Anthropic API

## Integration with Web Frontend

The chat endpoint is designed to be called from the React frontend (rckt-web) over HTTP:

```typescript
const response = await fetch('https://rckt-ai.onrender.com/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    messages: [{ role: 'user', content: userInput }],
    system: 'Your system prompt',
    max_tokens: 1024
  })
});

const data = await response.json();
console.log(data.message.content);
```

## Monitoring & Observability

Health checks:
- `GET /healthz`: Liveness (no dependencies)
- `GET /readyz`: Readiness (validates Anthropic configuration)

Both endpoints return structured JSON:
```json
{
  "status": "ok",
  "service": "rckt-ai",
  "version": "0.1.0"
}
```

## Future Enhancements

- [ ] Streaming responses (SSE) for real-time chat
- [ ] Message persistence to Supabase
- [ ] LangFuse integration for observability
- [ ] Function calling (tools) support
- [ ] RAG integration with pgvector
- [ ] Rate limiting per user/session
- [ ] Prompt templates system
