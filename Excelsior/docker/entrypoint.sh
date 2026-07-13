#!/usr/bin/env sh
set -eu

cd /var/www/html

if [ ! -f .env ] && [ -f .env.example ]; then
    cp .env.example .env
fi

if [ ! -f vendor/autoload.php ]; then
    composer install --no-interaction --prefer-dist
fi

if [ ! -f database/database.sqlite ]; then
    touch database/database.sqlite
fi

if [ -f .env ] && grep -q '^APP_KEY=$' .env; then
    php artisan key:generate --force --ansi
fi

php artisan migrate --force --no-interaction

exec "$@"
