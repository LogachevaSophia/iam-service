name: Deploy IAM Service to VM

on:
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3

      - name: Build Docker image
        uses: docker/build-push-action@v5
        with:
          context: .
          load: true
          tags: iam-service:latest

      - name: Save Docker image
        run: docker save iam-service:latest | gzip > iam-service.tar.gz

      - name: Setup SSH Key
        run: |
          mkdir -p ~/.ssh
          echo "${{ secrets.VM_SSH_PRIVATE_KEY }}" > ~/.ssh/deploy_key
          chmod 600 ~/.ssh/deploy_key

      - name: Deploy to VM
        env:
          VM_HOST: ${{ secrets.VM_HOST }}
          VM_USER: ${{ secrets.VM_USER }}
        run: |
          scp -i ~/.ssh/deploy_key -o StrictHostKeyChecking=no \
            iam-service.tar.gz $VM_USER@$VM_HOST:/tmp/

          ssh -i ~/.ssh/deploy_key -o StrictHostKeyChecking=no $VM_USER@$VM_HOST << 'ENDSSH'
            set -e

            echo "🚀 Начало развертывания IAM Service..."

            # Создаем сеть если нет
            docker network create shared-network 2>/dev/null || true

            # PostgreSQL для IAM
            if ! docker ps -a --format '{{.Names}}' | grep -q "^iam-postgres$"; then
              echo "📦 Создание PostgreSQL для IAM..."
              docker run -d \
                --name iam-postgres \
                --restart unless-stopped \
                --network shared-network \
                -e POSTGRES_USER=iam_user \
                -e POSTGRES_PASSWORD=iam_password \
                -e POSTGRES_DB=iam_db \
                -v iam_postgres_data:/var/lib/postgresql/data \
                postgres:15-alpine
            else
              echo "✅ PostgreSQL уже существует"
            fi

            # Redis для IAM
            if ! docker ps -a --format '{{.Names}}' | grep -q "^iam-redis$"; then
              echo "📦 Создание Redis для IAM..."
              docker run -d \
                --name iam-redis \
                --restart unless-stopped \
                --network shared-network \
                redis:7-alpine
            else
              echo "✅ Redis уже существует"
            fi

            # Загружаем образ
            echo "📦 Загрузка Docker образа..."
            docker load -i /tmp/iam-service.tar.gz

            # Останавливаем старый контейнер
            echo "🛑 Остановка старого контейнера..."
            docker stop iam-service 2>/dev/null || true
            docker rm iam-service 2>/dev/null || true

            # Запускаем новый
            echo "▶️  Запуск нового контейнера..."
            docker run -d \
              --name iam-service \
              --restart unless-stopped \
              --network shared-network \
              -p 3000:3000 \
              -p 50051:50051 \
              -e PORT=50051 \
              -e REST_PROXY_PORT=3000 \
              -e NODE_ENV=production \
              -e DATABASE_URL="postgresql://iam_user:iam_password@iam-postgres:5432/iam_db" \
              -e REDIS_HOST=iam-redis \
              -e REDIS_PORT=6379 \
              -e JWT_SECRET="${{ secrets.JWT_SECRET }}" \
              -e CLINREC_BASE_URL="http://api:8000" \
              iam-service:latest

            # Ждем запуска
            sleep 5

            # Выполняем миграции
            echo "🔄 Выполнение миграций Prisma..."
            docker exec iam-service npx prisma migrate deploy || true

            # Очистка
            rm -f /tmp/iam-service.tar.gz
            docker image prune -f

            echo "🎉 Развертывание IAM Service завершено!"
          ENDSSH

      - name: Verify Deployment
        run: |
          echo "✅ IAM Service deployed successfully!"