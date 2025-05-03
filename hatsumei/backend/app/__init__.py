from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from flask_marshmallow import Marshmallow
import os
from dotenv import load_dotenv

# .envファイルの読み込み
load_dotenv()

# 拡張機能のインスタンス作成
db = SQLAlchemy()
migrate = Migrate()
ma = Marshmallow()

def create_app():
    app = Flask(__name__)
    CORS(app)
    
    # 環境変数からデータベースURLを取得
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # 拡張機能の初期化
    db.init_app(app)
    migrate.init_app(app, db)
    ma.init_app(app)
    
    # Blueprintの登録
    from app.routes import users, idea_posts, metos, forms
    from app.models import User, IdeaPost, Meto, Form
    app.register_blueprint(users.users_bp)
    app.register_blueprint(idea_posts.idea_posts_bp)
    app.register_blueprint(metos.metos_bp)
    app.register_blueprint(forms.forms_bp)

    return app
