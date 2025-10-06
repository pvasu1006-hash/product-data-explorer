FROM mcr.microsoft.com/playwright:focal

WORKDIR /app
COPY package*.json ./
RUN npm ci --legacy-peer-deps --unsafe-perm || npm install --legacy-peer-deps --unsafe-perm
COPY . .
RUN npm run build
EXPOSE 4000
CMD ["node","dist/main.js"]
