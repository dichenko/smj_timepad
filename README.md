# Conference registration

Однопроектное приложение Next.js для регистрации на параллельные мероприятия. Внешний интерфейс — на русском, код и конфигурация — на английском.

## Что реализовано

- PostgreSQL-схема и SQL-миграция: конференции, слоты, мероприятия, участники, записи, администраторы, сессии, ключи идемпотентности и аудит;
- публичная мобильная форма с выбором одного мероприятия на слот;
- серверная Zod-валидация, нормализация email и уникальность email на конференцию;
- атомарное бронирование в транзакции через `UPDATE … booked_count < capacity RETURNING`; при нехватке места транзакция откатывается;
- хешированные magic-link токены, HttpOnly participant-cookie и read-only билет;
- idempotency key для повторной отправки;
- seed трёх слотов и шести мероприятий, создание администратора с Argon2id;
- защищённый вход администратора и простая сводная панель;
- Docker Compose, Caddy-конфигурация и скрипт проверки счётчиков/резервного копирования.

## Локальный запуск

```sh
cp .env.example .env
docker compose up -d postgres
npm install
npm run db:migrate
npm run db:seed
npm run dev
```

Откройте `http://localhost:3500`, админка — `http://localhost:3500/admin/login`.

## Docker

```sh
docker compose build
docker compose up -d
docker compose exec app npm run db:migrate
docker compose exec app npm run db:seed
```

База данных не имеет опубликованного host-порта. Для production задайте сильные значения `SESSION_SECRET`, `POSTGRES_PASSWORD`, `INITIAL_ADMIN_PASSWORD` и используйте Caddy перед приложением.

## Данные и обслуживание

Заменить демонстрационные данные можно через SQL/Drizzle после seed. Проверка целостности счётчиков: `npm run db:check`.

Ручная резервная копия (из окружения с `pg_dump`): `DATABASE_URL=... sh scripts/backup.sh`. Для ежедневной копии добавьте эту же команду в cron; восстановление: `gunzip -c backup.sql.gz | psql "$DATABASE_URL"`.

## Проверки

`npm test` запускает unit-тесты. После установки пакетов: `npm run build` проверяет строгую типизацию и production-сборку.

## Ограничения текущей поставки

Интерфейсы полного управления участниками/мероприятиями, Excel-экспорт, загрузка фото и PDF через Chromium требуют следующей итерации. Основа для них (данные, auth, audit и транзакционная модель) уже заложена. Playwright намеренно не включён в Docker-образ до реализации печатного маршрута, чтобы образ не скачивал Chromium без использования.
