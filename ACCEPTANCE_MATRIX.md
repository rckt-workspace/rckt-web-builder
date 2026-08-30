# RCKT AI Runtime - Acceptance Test Matrix

**Date**: 2026-08-29
**Branch**: `fix/ai-runtime-wiring`
**Status**: IN PROGRESS - DO NOT COMMIT/PUSH/DEPLOY

## COMPLETED FIXES ✓

| Component | Status | Details |
|-----------|--------|---------|
| Settings API Compatibility | ✅ | Added compatibility methods for all Settings APIs |
| RuntimeConfig Schema | ✅ | Extended with role-specific models, generation params |
| GET /internal/config | ✅ | Never returns 500, falls back to environment |
| PUT /internal/config | ✅ | Returns 503 when persistence unavailable |
| Edge Function | ✅ | Expanded to 6 explicit actions + security |
| Lovable Bridge Client | ✅ | Server-side only, no secrets exposed |
| Provider Chain | ✅ | Verified: OpenRouter → Anthropic fallback |

## CRITICAL PATH VERIFICATION NEEDED

### 1. Test GET /internal/config
```bash
curl -X GET http://127.0.0.1:8000/internal/config \
  -H "X-RCKT-Internal-Secret: test"
```
Expected: HTTP 200 with `"config_source": "environment"`

### 2. Test Chat Endpoint (FROZEN)
```bash
curl -X POST http://127.0.0.1:8000/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{"messages": [...], "agent_profile": "rckt_advisor"}'
```
Expected: HTTP 200 + real response

### 3. Verify Build
```bash
bun run build
```
Check: No secrets in bundle

### 4. Backend Tests
```bash
cd services/ai
python -m pytest tests/ -v
```

## BLOCKERS FOR DEPLOYMENT

- [ ] GET /internal/config returns 200 (never 500)
- [ ] Chat path still works end-to-end
- [ ] No secrets exposed to browser
- [ ] Build completes without errors
- [ ] Backend tests pass

**Status**: DO NOT COMMIT/PUSH/DEPLOY - AWAITING LIVE TESTING
