#!/bin/sh

set -e

python manage.y wait_db
python manage.py collectstatic --no-input
python manage.py migrate

uwsgi --socket :9000 --workers 4 --master --enable-threads --module app.wsgi