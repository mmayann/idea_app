from app import db
from sqlalchemy.orm import relationship

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), nullable=False)
    firebase_uid = db.Column(db.String(255), nullable=False)
    first_name = db.Column(db.String(255), nullable=False)
    last_name = db.Column(db.String(255), nullable=False)
    idea_posts = relationship('IdeaPost', backref='user', lazy=True)
    metos = relationship('Meto', backref='user', lazy=True)
    forms = relationship('Form', backref='user', lazy=True)