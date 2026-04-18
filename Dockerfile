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

# Copy models (Assuming they are downloaded or we run the script)
# If models are not in the repo, we run the script
COPY backend/models/ ../models/

# Copy built frontend from previous stage
COPY --from=frontend-builder /app/frontend/dist ../frontend/dist

# Expose the API port
EXPOSE 4000

# Set environment variables
ENV NODE_ENV=production
ENV PORT=4000

# Start the server
CMD ["node", "src/server.js"]
