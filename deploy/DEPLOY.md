# Деплой на VM (без ghcr)

Схема как в **klin_recomendation**: GitHub Actions собирает образ, сохраняет в архив, копирует по SSH на сервер, там `docker load` и `docker run`. Образы из реестра не тянутся.

## Один раз на сервере

1. Установить Docker.
2. Создать каталог и файл окружения, например:

   ```bash
   sudo mkdir -p /opt/iam-service
   sudo nano /opt/iam-service/.env
   ```

   Минимум переменных — как в корневом `.env.example`: `DATABASE_URL` (или отдельно Postgres на хосте/в другом compose), `JWT_SECRET`, `CLINREC_BASE_URL`, при необходимости `CLINREC_API_TOKEN`, `RUN_MIGRATIONS=true` для первого запуска.

3. Убедиться, что из контейнера доступна БД (часто `DATABASE_URL=...@host.docker.internal:5432/...` при Postgres на той же машине).

## GitHub Actions

**Settings → Secrets and variables → Actions → Secrets** (те же имена, что у фронта, плюс опционально порт):

| Secret | Назначение |
|--------|----------------|
| `VM_SSH_PRIVATE_KEY` | Приватный ключ SSH |
| `VM_HOST` | Хост сервера |
| `VM_USER` | Пользователь SSH |
| `IAM_HTTP_PORT` | Опционально: порт REST-proxy на хосте (по умолчанию `3000`) |

Workflow **Deploy IAM to VM** запускается при смердженном PR в `main`/`master` или вручную (**Actions → Run workflow**).

## Локальная разработка

См. корневой `docker-compose.yml`: Postgres, Redis, IAM, при необходимости gateway и сборка SPA из соседнего репозитория.
