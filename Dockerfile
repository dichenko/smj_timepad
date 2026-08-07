FROM node:22-bookworm-slim AS base
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci
COPY . .
RUN npm run build
FROM node:22-bookworm-slim
WORKDIR /app
ENV NODE_ENV=production
COPY --from=base /app/public ./public
COPY --from=base /app/.next/standalone ./
COPY --from=base /app/.next/static ./.next/static
RUN useradd --system --uid 1001 app && mkdir -p /app/uploads/speakers && chown -R app:app /app
USER app
EXPOSE 3000
CMD ["node", "server.js"]
