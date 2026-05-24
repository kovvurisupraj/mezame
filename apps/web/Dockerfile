FROM node:20-alpine AS base
RUN apk add --no-cache libc6-compat
WORKDIR /app

# ── development ──────────────────────────────────────────────────
# Volumes are mounted by docker-compose for hot reload
FROM base AS development
ENV NODE_ENV=development
COPY package*.json ./
COPY apps/web/package*.json ./apps/web/
COPY packages/*/package*.json ./packages/
RUN npm install
EXPOSE 3000
CMD ["npm", "run", "dev", "--workspace=apps/web"]

# ── builder ──────────────────────────────────────────────────────
FROM base AS builder
COPY package*.json ./
COPY apps/web/package*.json ./apps/web/
COPY packages/*/package*.json ./packages/
RUN npm ci
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build --workspace=apps/web

# ── production ───────────────────────────────────────────────────
# Optimized in Phase 10 with standalone output
FROM base AS production
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs && \
    adduser  --system --uid 1001 nextjs

COPY --from=builder /app/apps/web/.next ./.next
COPY --from=builder /app/apps/web/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/web/package.json ./

USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
CMD ["node_modules/.bin/next", "start"]
