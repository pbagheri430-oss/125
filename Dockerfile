# backend
FROM node:18-alpine AS backend
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm install --production
COPY backend ./

# frontend
FROM node:18-alpine AS frontend
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install && npm run build
COPY frontend ./
RUN npm run build

# final
FROM node:18-alpine
WORKDIR /app
COPY --from=backend /app/backend ./backend
COPY --from=frontend /app/frontend/dist ./frontend/dist
RUN npm install -g pm2
EXPOSE 4000
CMD ["pm2-runtime", "backend/src/index.js"]
