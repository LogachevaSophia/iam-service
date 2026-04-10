# Стадия сборки
FROM node:20.19.0 as builder

WORKDIR /app
COPY . .
RUN npm install && npm run build

# Стадия production
FROM node:20.19.0

WORKDIR /app

# Копируем package.json и устанавливаем только production зависимости
COPY package*.json ./
RUN npm install --only=production

# Копируем собранный код из стадии сборки
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/src/proto ./src/proto
COPY --from=builder /app/rest-proxy.js ./
COPY --from=builder /app/prisma ./prisma

# Генерируем Prisma клиент
RUN npx prisma generate

# Копируем .env (опционально, лучше через volume или secrets)
# COPY .env ./

EXPOSE 3000 50051

# Запускаем оба сервиса (gRPC и REST proxy)
CMD ["sh", "-c", "node dist/server.js & node rest-proxy.js"]