# Deployment Checklist

## Pre-Deployment (Local)

- [ ] Verify commit is on `main` branch: `git log --oneline -1`
- [ ] Verify build succeeds: `bun run build`
- [ ] Verify Python syntax: `python -m compileall services/ai/app -q`
- [ ] Check git status is clean: `git status`

```bash
git log --oneline -1
bun run build
python -m compileall services/ai/app -q
git status
```

## Pre-Deployment (Render Dashboard)

### Step 1: Prepare Secrets

Generate random values:

```bash
# RCKT_INTERNAL_SECRET (use for both web and AI)
openssl rand -hex 32
# Example output: a1b2c3d4e5f6...

# ADMIN_SESSION_SECRET
openssl rand -hex 32
# Example output: f6e5d4c3b2a1...
```

**Store these securely** - use a password manager or secure note.

### Step 2: Create/Verify Render Service

Go to https://dashboard.render.com

**Create new Web Service OR update existing `rckt-launchpad`:**

| Setting | Value |
|---------|-------|
| Name | rckt-launchpad |
| GitHub Repo | rckt-workspace/rckt-web-builder |
| Branch | main |
| Root Directory | (blank) |
| Runtime | Docker |
| Dockerfile Path | ./Dockerfile |

Click **Create Web Service**

### Step 3: Configure Environment

In Render dashboard, go to **Environment** tab:

**Add these variables:**

```
RCKT_INTERNAL_SECRET=<paste generated value>
ADMIN_CONTROL_SECRET=<strong password, min 16 chars>
ADMIN_SESSION_SECRET=<paste generated value>

ANTHROPIC_API_KEY=sk-ant-...
ANTHROPIC_MODEL=claude-sonnet-5

OPENROUTER_API_KEY=sk-or-...
OPENROUTER_MODEL=meta-llama/llama-3.1-8b-instruct:free

SUPABASE_URL=https://...supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJ...

APP_ENV=production
LOG_LEVEL=INFO
CORS_ORIGINS=["https://rckt-launchpad.onrender.com"]
```

**Click Save**

## Deployment

### Option A: Automatic (Recommended)

Simply push to main:
```bash
git push origin main
```

Render will automatically:
1. Pull latest code
2. Build Docker image
3. Start container
4. Run startup script
5. Deploy

**Monitoring:** Watch Render dashboard logs in real-time.

### Option B: Manual

In Render dashboard:
1. Click **Deploy**
2. Watch deployment progress
3. See logs in real-time

## Post-Deployment Verification

### Check 1: Service Status

```bash
curl https://rckt-launchpad.onrender.com
# Should return HTML (Nitro homepage)
```

### Check 2: FastAPI Health

```bash
curl https://rckt-launchpad.onrender.com/healthz
# Note: This won't work - FastAPI is internal only
# But check Render logs for FastAPI startup messages
```

### Check 3: Admin Login

```bash
curl -X POST https://rckt-launchpad.onrender.com/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"password":"YOUR_ADMIN_CONTROL_SECRET"}'

# Expected: HTTP 200 with Set-Cookie header
```

### Check 4: Admin Dashboard

Open browser:
```
https://rckt-launchpad.onrender.com/ops/ai-control
```

Login with `ADMIN_CONTROL_SECRET`

Verify:
- [ ] Runtime config loads
- [ ] Provider status visible
- [ ] Can read current config
- [ ] Can see usage stats (if data exists)

### Check 5: Advisor Chat

```bash
curl -X POST https://rckt-launchpad.onrender.com/api/advisor-chat \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {"role": "user", "content": "Hola, ¿cómo estás?"}
    ]
  }'

# Expected: Streaming response from FastAPI
```

## Rollback

If something goes wrong:

**Via Git:**
```bash
git revert 8ca36ef
git push origin main
# Render will re-deploy previous working version
```

**Via Render Dashboard:**
1. Go to **Deployments** tab
2. Find previous successful deployment
3. Click **Deploy** button on that deployment

## Monitoring Deployment

### Real-Time Logs

In Render dashboard:
```
Tail logs while deployment is running

Expected sequence:
[timestamp] Starting RCKT Launchpad
[timestamp] Starting FastAPI on 127.0.0.1:8000...
[timestamp] FastAPI started with PID xxxx
[timestamp] Waiting for FastAPI health check...
[timestamp] FastAPI is healthy ✓
[timestamp] Starting Nitro on 0.0.0.0:PORT...
[timestamp] Nitro started with PID xxxx
```

### First-Time Build

First deployment takes longer (10-15 min):
- Downloads base Docker images
- Installs Node dependencies
- Builds TanStack/Nitro
- Installs Python dependencies
- Starts services

Subsequent deploys are faster (~2-3 min).

## Common Issues & Fixes

| Issue | Check | Fix |
|-------|-------|-----|
| Admin login returns 401 | ADMIN_CONTROL_SECRET | Update env var in Render |
| Admin config returns 500 | FastAPI logs | Check RCKT_INTERNAL_SECRET |
| Chat returns error | AI service URL | Internal URL is `http://127.0.0.1:8000` |
| Startup fails | All env vars | Add missing variables |

## Verification Summary

```bash
# All checks passed?
✓ Git push to main successful
✓ Render deployment started
✓ FastAPI healthy (check logs)
✓ Nitro responding
✓ Admin login works
✓ Admin dashboard loads
✓ Chat works
✓ No error logs
```

## Post-Deployment Tasks

- [ ] Notify team of deployment
- [ ] Test admin features
- [ ] Verify advisor chat works
- [ ] Check usage tracking
- [ ] Monitor logs for 24 hours
- [ ] Document any issues

---

**Deployment Date:** _______________
**Deployed By:** _______________
**Environment:** _______________
**Notes:** _______________
