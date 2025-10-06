# backend/Dockerfile (robust)
FROM node:18-bullseye

# 1) Install OS packages needed by Playwright + node-gyp native builds
RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates curl gnupg2 build-essential python3 python3-pip \
    libnss3 libatk-bridge2.0-0 libxkbcommon0 libxcomposite1 libxrandr2 \
    libpangocairo-1.0-0 libxdamage1 libgbm1 libasound2 libgtk-3-0 \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# 2) Copy package files (layer caching)
COPY package*.json ./

# 3) Avoid downloading browsers during npm install (faster + avoids network timeouts)
ENV PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1
ENV NPM_CONFIG_LOGLEVEL=verbose
ENV NODE_OPTIONS=--max_old_space_size=4096

# 4) Install dependencies, capture verbose logs to file for diagnostics
#    If ci fails, try install (fallback). Also store logs so you can inspect in failed container.
RUN ( npm ci --unsafe-perm --legacy-peer-deps --loglevel=verbose 2>&1 || npm install --unsafe-perm --legacy-peer-deps --loglevel=verbose 2>&1 ) | tee /tmp/npm-install.log

# Optional: show last lines of npm log at build time for quick feedback
RUN tail -n 40 /tmp/npm-install.log || true

# 5) Copy source
COPY . .

# 6) Install playwright browsers (with deps)
RUN npx playwright install --with-deps chromium

# 7) Build
RUN npm run build

EXPOSE 4000
CMD ["node","dist/main.js"]
