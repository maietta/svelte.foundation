ARG BUN_VERSION=latest
FROM oven/bun:${BUN_VERSION} AS builder

WORKDIR /app
ENV NODE_ENV=production

COPY --link package.json bun.lock* ./
RUN bun install --ci

COPY --link src/ ./src/
COPY --link static/ ./static/
COPY --link svelte.config.js tsconfig.json vite.config.ts ./
# Optional build-time config
COPY --link tailwind.config.js* drizzle.config.ts* ./

RUN bun --bun run build

FROM oven/bun:${BUN_VERSION} AS runtime

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV PROTOCOL_HEADER=x-forwarded-proto
ENV HOST_HEADER=x-forwarded-host

COPY --link package.json bun.lock* ./
RUN bun install --ci --production

# Copy build output from builder stage
COPY --from=builder --chown=bun:bun /app/build ./build
COPY --link --chown=bun:bun healthcheck.ts ./

EXPOSE 3000/tcp

USER bun

HEALTHCHECK --interval=5s --timeout=3s --start-period=1s --retries=3 \
    CMD bun healthcheck.ts || exit 1

# adapter-node entrypoint
CMD ["bun", "--bun", "build/index.js"]