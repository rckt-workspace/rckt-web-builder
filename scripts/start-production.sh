#!/bin/sh
# Production startup script for RCKT Launchpad
# Starts both FastAPI (internal) and Nitro (public) in a supervised manner

set -e

# Colors for output
BLUE='\033[0;34m'
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

log_info() {
  echo "${BLUE}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1"
}

log_success() {
  echo "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1"
}

log_error() {
  echo "${RED}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1"
}

# Ensure PORT is set for Nitro
if [ -z "$PORT" ]; then
  PORT=10000
  export PORT
fi

log_info "Starting RCKT Launchpad (PORT=$PORT)"

# Change to services/ai directory and start FastAPI
log_info "Starting FastAPI on 127.0.0.1:8000..."
cd /app/services/ai

# Start FastAPI in background
python -m uvicorn app.main:app \
  --host 127.0.0.1 \
  --port 8000 \
  --log-level info &

FASTAPI_PID=$!
log_info "FastAPI started with PID $FASTAPI_PID"

# Function to kill both processes on exit
cleanup() {
  log_info "Cleaning up processes..."
  if [ -n "$FASTAPI_PID" ]; then
    kill $FASTAPI_PID 2>/dev/null || true
  fi
  if [ -n "$NITRO_PID" ]; then
    kill $NITRO_PID 2>/dev/null || true
  fi
  exit
}

# Set up signal handlers
trap cleanup TERM INT EXIT

# Wait for FastAPI to be healthy
MAX_ATTEMPTS=30
ATTEMPT=0

log_info "Waiting for FastAPI health check..."
while [ $ATTEMPT -lt $MAX_ATTEMPTS ]; do
  if curl -s http://127.0.0.1:8000/healthz > /dev/null 2>&1; then
    log_success "FastAPI is healthy"
    break
  fi
  ATTEMPT=$((ATTEMPT + 1))
  if [ $ATTEMPT -lt $MAX_ATTEMPTS ]; then
    sleep 1
  fi
done

if [ $ATTEMPT -eq $MAX_ATTEMPTS ]; then
  log_error "FastAPI failed to become healthy after $MAX_ATTEMPTS seconds"
  exit 1
fi

# Start Nitro from app root
log_info "Starting Nitro on 0.0.0.0:$PORT..."
cd /app

export AI_SERVICE_URL=http://127.0.0.1:8000
export HOST=0.0.0.0

# Start Nitro in background
bun .output/server/index.mjs &

NITRO_PID=$!
log_success "Nitro started with PID $NITRO_PID"

# Wait for both processes
wait $FASTAPI_PID
FASTAPI_EXIT=$?

wait $NITRO_PID
NITRO_EXIT=$?

if [ $FASTAPI_EXIT -ne 0 ]; then
  log_error "FastAPI exited with code $FASTAPI_EXIT"
  exit $FASTAPI_EXIT
fi

if [ $NITRO_EXIT -ne 0 ]; then
  log_error "Nitro exited with code $NITRO_EXIT"
  exit $NITRO_EXIT
fi
