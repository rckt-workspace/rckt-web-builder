# RCKT Launchpad - Deployment Guide

## Architecture

Single Render Web Service containing:

1. **FastAPI** (internal) - 127.0.0.1:8000
   - AI orchestration
   - Admin APIs
   - Health checks

2. **Nitro/TanStack Start** (public) - 0.0.0.0:$PORT
   - Web UI
   - BFF proxies
   - Static assets

Both services run in one container with supervised startup.

---

## Prerequisites

- Render account with paid plan (for one Web Service)
- Git repository push access to `rckt-workspace/rckt-web-builder`
- Environment variables configured in Render dashboard

---

## Render Configuration

### Service Details

| Setting | Value |
|---------|-------|
| **Service Name** | rckt-launchpad |
| **Branch** | main |
| **Root Directory** | (blank) |
| **Runtime** | Docker |
| **Dockerfile Path** | ./Dockerfile |
| **Pre-Deploy Command** | (blank) |
| **Auto-Deploy** | On Commit |

### Environment Variables

**Required - LLM Providers:**

```bash
ANTHROPIC_API_KEY=sk-ant-...                    # Anthropic API key
OPENROUTER_API_KEY=sk-or-...                    # OpenRouter API key
```

**Required - Secrets:**

```bash
RCKT_INTERNAL_SECRET=<32+ random hex>           # Internal auth (BFF ↔ FastAPI)
ADMIN_CONTROL_SECRET=<strong password>          # Admin login password
ADMIN_SESSION_SECRET=<32+ random hex>           # Session signing key
```

**Required - Database:**

```bash
SUPABASE_URL=https://...supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

**Required - Configuration:**

```bash
APP_ENV=production
LOG_LEVEL=INFO
CORS_ORIGINS=["https://rckt-launchpad.onrender.com"]
```

**Optional - Models:**

```bash
ANTHROPIC_MODEL=claude-sonnet-5
OPENROUTER_MODEL=meta-llama/llama-3.1-8b-instruct:free
```

---

## Generate Secure Random Values

```bash
# RCKT_INTERNAL_SECRET (32 hex chars)
openssl rand -hex 32

# ADMIN_SESSION_SECRET (32 hex chars)
openssl rand -hex 32
```

Store these securely. **Do NOT commit to repository.**

---

## Render Deployment Steps

### 1. Create/Update Service

1. Go to https://dashboard.render.com
2. Select **New +** → **Web Service**
3. Connect `rckt-workspace/rckt-web-builder`
4. Select branch: `main`
5. Fill in settings as above

### 2. Configure Environment

In Render dashboard service settings:

1. Go to **Environment**
2. Add all variables from "Environment Variables" section above
3. Click **Save**

### 3. Deploy

Option A: Auto-deploy on commit
```bash
git push origin main
# Render will automatically deploy
```

Option B: Manual deploy
- In Render dashboard, click **Deploy**

### 4. Monitor Deployment

```
Real-time logs visible in Render dashboard:
- FastAPI startup messages
- Nitro build messages
- Health check status
```

Expected sequence:
```
[INFO] Starting RCKT Launchpad
[INFO] Starting FastAPI on 127.0.0.1:8000...
[INFO] FastAPI started with PID ...
[INFO] Waiting for FastAPI health check...
[SUCCESS] FastAPI is healthy
[INFO] Starting Nitro on 0.0.0.0:10000...
[SUCCESS] Nitro started with PID ...
```

---

## Verify Deployment

### 1. Check Service Status

```bash
curl https://rckt-launchpad.onrender.com
# Should return HTML from Nitro
```

### 2. Test Admin Login

```bash
curl -X POST https://rckt-launchpad.onrender.com/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"password":"YOUR_ADMIN_CONTROL_SECRET"}'

# Should return 200 with session cookie
```

### 3. Test Advisor Chat

```bash
curl -X POST https://rckt-launchpad.onrender.com/api/advisor-chat \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"Hello"}]}'

# Should return chat response from FastAPI
```

### 4. Check Admin Dashboard

```
https://rckt-launchpad.onrender.com/ops/ai-control
```

Login with `ADMIN_CONTROL_SECRET` and verify:
- Runtime config loads
- Provider status shows
- Can toggle providers

---

## Troubleshooting

### FastAPI Won't Start

**Logs show:** `Connection refused to 127.0.0.1:8000`

**Check:**
1. Required env vars set (ANTHROPIC_API_KEY, OPENROUTER_API_KEY)
2. No syntax errors in `services/ai/app/`

```bash
# Local test
python -m compileall services/ai/app
python -m uvicorn app.main:app --host 127.0.0.1 --port 8000
```

### Nitro Won't Start

**Logs show:** `Nitro exited with code 1`

**Check:**
1. `bun run build` succeeds locally
2. `.output/server/index.mjs` exists
3. Required env vars set (RCKT_INTERNAL_SECRET, ADMIN_CONTROL_SECRET, etc.)

### Admin Config Returns 500

**Logs show:** `AI service returned non-JSON response`

**Likely:** FastAPI crashed or not healthy

**Check:**
1. FastAPI health: `curl http://127.0.0.1:8000/healthz`
2. Admin secret matches: `RCKT_INTERNAL_SECRET`
3. FastAPI logs for errors

### Admin Login Returns 401

**Check:**
1. `ADMIN_CONTROL_SECRET` is set
2. Password sent in POST body matches exactly
3. No extra whitespace

---

## Database Migrations

Before first deployment, apply Supabase migrations:

```bash
cd supabase
supabase db push --linked  # or use Render's Supabase link
```

This creates:
- `ai_runtime_config` table
- `ai_usage_events` table
- `ai_config_audit` table

---

## Security Notes

1. **Secrets:** Never commit `.env` files. Use Render environment variables only.
2. **RCKT_INTERNAL_SECRET:** Must match on both services (both in same container, so same value).
3. **Session cookies:** HTTP-only, Secure flag set (HTTPS only).
4. **Admin login:** Rate-limited (5 attempts per IP per 15 min).
5. **API keys:** Never returned to client, stored server-side only.

---

## Scaling

Current setup runs both FastAPI and Nitro in one container.

For future scaling:

**Option 1: Keep unified** (recommended for MVP)
- Increase Render instance size
- Both services scale together

**Option 2: Split services** (if needed later)
- Create separate `rckt-ai` Render service
- Change `AI_SERVICE_URL` to https://rckt-ai.onrender.com
- Remove FastAPI from this container

---

## Monitoring

### Logs

Render dashboard shows real-time logs from both services.

**FastAPI logs prefix:** `[INFO] Starting FastAPI...`

**Nitro logs prefix:** `[INFO] Listening on http://...`

### Health Checks

**Render health check:**
- Automatically pings the service
- Should see 200 response on public endpoint

**Internal checks:**
- Scripts check FastAPI health before starting Nitro
- Supervisor restarts both if either crashes

---

## Rollback

If deployment fails:

1. Go to Render dashboard → Service
2. Click **Deployments** tab
3. Select previous working version
4. Click **Deploy**

Or push a revert commit:
```bash
git revert 8ca36ef  # ID of problematic commit
git push origin main
```

---

## Support

For issues, check:
1. Render deployment logs (real-time)
2. Environment variables set correctly
3. Local `bun run build && bun run preview` works
4. Local FastAPI startup succeeds

---

**Last updated:** 2026-09-08
**Deployment type:** Single Render Web Service
**Status:** Ready for production
