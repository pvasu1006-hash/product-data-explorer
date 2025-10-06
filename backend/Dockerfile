# ✅ Node base instead of Playwright to avoid CI lock issues
FROM node:18-bullseye-slim

# Install Playwright + deps
RUN apt-get update && apt-get install -y wget gnupg ca-certificates \
    && apt-get install -y libnss3 libatk-bridge2.0-0 libxkbcommon0 libxcomposite1 libxrandr2 libpangocairo-1.0-0 libxdamage1 libgbm1 libasound2 libgtk-3-0 \
    && rm -rf /var/lib/apt/lists/*

# Create app directory
WORKDIR /app

# Copy and install dependencies
COPY package*.json ./

# 🔧 Use safe install flags for Render
RUN npm install --unsafe-perm --legacy-peer-deps --no-audit --no-fund

# Copy rest of code and build
COPY . .

# Install Playwright browsers (Chromium only)
RUN npx playwright install chromium --with-deps

RUN npm run build

EXPOSE 4000
CMD ["node", "dist/main.js"]
