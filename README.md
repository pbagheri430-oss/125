# EPL Dashboard

This project provides a production-ready English Premier League dashboard with a Node.js backend and React frontend. Data is fetched from the Football-Data.org API, cached in Redis and served via REST and WebSockets.

## Prerequisites
- Node.js 18+
- PostgreSQL

## Backend Setup

```bash
cd backend
cp .env.example .env # edit DB credentials, FOOTBALL_DATA_API_KEY and REDIS_URL
npm install
node src/seed/seed.js # fetches data and seeds the DB
npm run dev
```

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

## Deployment

Build a full-stack Docker image:

```bash
docker build -t epl-app .
```

Alternatively use Docker Compose for development:

```bash
docker compose up --build
```

Deploy the backend to Heroku and the frontend to Vercel/Netlify. Ensure `FOOTBALL_DATA_API_KEY` is set on the backend.

Open <http://localhost:3000> to view the site.
