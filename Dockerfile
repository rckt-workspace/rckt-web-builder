# Multi-stage build for RCKT Launchpad
# Single container with Nitro (public) + FastAPI (internal)

# Stage 1: Builder - Bun/Node dependencies and TanStack build
FROM oven/bun:1.2 AS builder-bun

WORKDIR /build

# Copy package files
COPY package.json bun.lock ./

# Install dependencies
RUN bun install --frozen-lockfile

# Copy source code
COPY . .

# Build TanStack/Nitro
RUN bun run build

# Stage 2: Builder - Python dependencies
FROM python:3.12-slim AS builder-python

WORKDIR /build

# Copy pyproject.toml from services/ai
COPY services/ai/pyproject.toml .

# Install build dependencies for any compiled packages
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
RUN pip install --no-cache-dir --upgrade pip setuptools wheel && \
    pip install --no-cache-dir -e .

# Stage 3: Runtime - Multi-runtime image
FROM python:3.12-slim

WORKDIR /app

# Install Bun runtime
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Install Bun
RUN curl -fsSL https://bun.sh/install | bash && \
    ln -s /root/.bun/bin/bun /usr/local/bin/bun

# Copy built artifacts from bun builder
COPY --from=builder-bun /build/.output ./.output
COPY --from=builder-bun /build/package.json package.json
COPY --from=builder-bun /build/node_modules ./node_modules

# Copy Python dependencies from python builder
COPY --from=builder-python /usr/local/lib/python3.12/site-packages /usr/local/lib/python3.12/site-packages
COPY --from=builder-python /usr/local/bin /usr/local/bin

# Copy application source
COPY services/ai ./services/ai
COPY scripts ./scripts

# Copy startup script and make it executable
RUN chmod +x ./scripts/start-production.sh

# Create non-root user for security
RUN useradd -m -u 1000 appuser && \
    chown -R appuser:appuser /app

USER appuser

# Expose port (Nitro will bind here)
EXPOSE 10000

# Health check for Nitro (public)
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD curl -f http://127.0.0.1:10000/ || exit 1

# Start both services
CMD ["/app/scripts/start-production.sh"]
