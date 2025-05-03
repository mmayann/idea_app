#!/bin/bash

cd /backend

export PYTHONPATH=/backend 
export DATABASE_URL: postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@postgres:5432/${POSTGRES_DB}

echo "現在の環境変数:"
env 

if [ ! -d "./migrations" ]; then
  echo "マイグレーションディレクトリを初期化しています..."
  flask db init
  flask db migrate
  flask db upgrade
fi

echo "シードデータの投入を開始します..."
python /backend/app/seed.py 

exec python /backend/run.py 
