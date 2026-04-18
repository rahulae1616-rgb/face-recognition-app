# Use Node.js 20-slim as the base for a smaller footprint
FROM node:20-slim AS base

# Install system dependencies required for node-canvas
RUN apt-get update && apt-get install -y \
    build-essential \
    libcairo2-dev \
    libpango1.0-dev \
    libjpeg-dev \
    libgif-dev \
    librsvg2-dev \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# --- Build Frontend ---
FROM base AS frontend-builder
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# --- Build Backend & Final Image ---
FROM base
WORKDIR /app

# Copy backend dependencies
COPY backend/package*.json ./backend/
WORKDIR /app/backend
RUN npm install --production

# Copy backend source
COPY backend/ ./

# Download models during build since they are ignored by git
RUN npm run download-models

# Copy built frontend from previous stage
COPY --from=frontend-builder /app/frontend/dist ../frontend/dist

# Set environment variables
ENV NODE_ENV=production

# Memory limit for Render Free Tier (512MB)
ENV NODE_OPTIONS="--max-old-space-size=450"

# Start the server (respects process.env.PORT provided by Render)
CMD ["node", "src/server.js"]
