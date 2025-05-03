# 使用するベースイメージ（Pythonの公式イメージ）
FROM python:3.9-slim

# 作業ディレクトリを設定
WORKDIR /backend

# 必要なパッケージをインストール
COPY requirements.txt /backend/
RUN pip install --no-cache-dir -r requirements.txt

# ソースコードをコンテナ内にコピー
COPY . /backend/

# entrypoint.sh をコンテナ内にコピー
COPY entrypoint.sh /backend/entrypoint.sh
RUN chmod +x /backend/entrypoint.sh  

# ポート5000を公開
EXPOSE 5000

# entrypoint.sh をエントリーポイントとして設定
ENTRYPOINT ["/backend/entrypoint.sh"]
