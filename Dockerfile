# Стадия сборки
FROM node:20-alpine AS builder

WORKDIR /app

# Копируем package.json и устанавливаем зависимости
COPY package*.json ./
RUN npm ci

# Копируем исходники и собираем TypeScript
COPY . .
RUN npm run build

# Стадия production
FROM node:20-alpine

WORKDIR /app

# Устанавливаем только production зависимости
COPY package*.json ./
RUN npm ci --only=production

# Копируем собранный код и необходимые файлы
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/src/proto ./src/proto
COPY rest-proxy.js ./
COPY prisma ./prisma

# Устанавливаем Prisma клиент
RUN npx prisma generate

# Переменные окружения
ENV PORT=50051
ENV REST_PROXY_PORT=3000
ENV NODE_ENV=production

# Открываем порты
EXPOSE 50051 3000

# Запускаем оба сервиса
CMD ["sh", "-c", "node dist/server.js & node rest-proxy.js"]