# Product Data Explorer (Render + Postgres)

This repo contains a frontend (Next.js) and backend (NestJS) scaffold updated to use PostgreSQL and deploy fully on Render.

## Quickstart

1. Backend
```
cd backend
cp .env.example .env
npm install
npm run start:dev
```

2. Frontend
```
cd frontend
npm install
npm run dev
```

## Deploy on Render
- Create a PostgreSQL database on Render (product-data-explorer-db)
- Add services for backend (Docker) and frontend (Node) as described in the full deployment guide.
