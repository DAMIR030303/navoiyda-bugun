# 🚀 Navoiyda Bugun - Production Dockerfile
# Multi-stage build for optimized production deployment

# Stage 1: Build Frontend
FROM node:18-alpine AS frontend-builder
WORKDIR /app/frontend

# Copy frontend package files
COPY frontend/package*.json ./
RUN npm ci --only=production

# Copy frontend source and build
COPY frontend/ ./
RUN npm run build

# Stage 2: Build Backend
FROM node:18-alpine AS backend-builder
WORKDIR /app/backend

# Copy backend package files
COPY backend/package*.json ./
RUN npm ci --only=production

# Copy backend source and build
COPY backend/ ./
RUN npm run build

# Stage 3: Production Runtime
FROM node:18-alpine AS production

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

# Create app user for security
RUN addgroup -g 1001 -S nodejs
RUN adduser -S navoiyda -u 1001

# Set working directory
WORKDIR /app

# Copy built backend
COPY --from=backend-builder --chown=navoiyda:nodejs /app/backend/dist ./backend/dist
COPY --from=backend-builder --chown=navoiyda:nodejs /app/backend/node_modules ./backend/node_modules
COPY --from=backend-builder --chown=navoiyda:nodejs /app/backend/package*.json ./backend/

# Copy built frontend
COPY --from=frontend-builder --chown=navoiyda:nodejs /app/frontend/dist ./frontend/dist

# Create necessary directories
RUN mkdir -p logs uploads && chown -R navoiyda:nodejs logs uploads

# Switch to non-root user
USER navoiyda

# Expose port
EXPOSE 5001

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node backend/dist/healthcheck.js || exit 1

# Start application
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "backend/dist/index.js"] 