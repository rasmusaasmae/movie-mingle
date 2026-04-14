# -----------------------------
# Base image
# -----------------------------
FROM oven/bun:1.3.5 AS base

WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1

# -----------------------------
# Dependencies stage
# -----------------------------
FROM base AS deps

COPY package.json bun.lock* ./

RUN bun install --no-save --frozen-lockfile --ignore-scripts

# -----------------------------
# Production dependencies stage
# -----------------------------
FROM base AS prod-deps

COPY package.json bun.lock* ./

RUN bun install --no-save --frozen-lockfile --production --ignore-scripts

# -----------------------------
# Builder stage
# -----------------------------
FROM base AS builder

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN bun run build

# -----------------------------
# Production runner stage
# -----------------------------
FROM oven/bun:1.3.5-slim AS runner

RUN groupadd --system --gid 1001 nodejs && \
    useradd --system --uid 1001 --no-log-init -g nodejs nextjs

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

COPY --from=builder /app/drizzle ./drizzle
COPY --from=builder /app/drizzle.config.ts ./
COPY --from=builder /app/package.json ./
COPY --from=prod-deps /app/node_modules ./node_modules

ENV NODE_ENV=production \
    PORT=3000 \
    HOSTNAME="0.0.0.0"

USER nextjs

EXPOSE 3000

CMD ["bun", "./server.js"]

HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
  CMD wget -qO- http://localhost:3000/health || exit 1