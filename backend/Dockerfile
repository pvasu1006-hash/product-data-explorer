FROM mcr.microsoft.com/playwright:focal
WORKDIR /app
COPY package*.json ./
RUN npm ci --legacy-peer-deps
COPY . .
RUN npm run build
EXPOSE 4000
CMD ["node","dist/main.js"]
