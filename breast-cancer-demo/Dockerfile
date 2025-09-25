FROM node:18-alpine3.19 AS builder

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nexths:nodejs /app/.next/static ./.next/static

# Set the user to a non-root user for security
USER nextjs

EXPOSE 3000

# Set the PORT environment variable that Cloud Run expects
ENV PORT 3000

# Start the Node.js server
CMD ["node", "server.js"]