#!/bin/sh
set -e
if [ "${RUN_MIGRATIONS:-}" = "true" ]; then
  echo "Running prisma migrate deploy..."
  npx prisma migrate deploy
fi

cleanup() {
  kill "${GRPC_PID:-}" "${PROXY_PID:-}" 2>/dev/null || true
}
trap cleanup TERM INT

node dist/server.js &
GRPC_PID=$!

node rest-proxy.js &
PROXY_PID=$!

wait "${GRPC_PID}" "${PROXY_PID}"
