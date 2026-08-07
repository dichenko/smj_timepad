#!/usr/bin/env sh
set -eu
: "${DATABASE_URL:?DATABASE_URL is required}"
mkdir -p "${BACKUP_DIR:-./backups}"
pg_dump "$DATABASE_URL" | gzip > "${BACKUP_DIR:-./backups}/conference-$(date +%Y-%m-%d-%H%M%S).sql.gz"
