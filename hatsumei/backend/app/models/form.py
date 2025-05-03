from app import db
from datetime import date

class Form(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    date = db.Column(db.Date, nullable=False, default=date.today())
    text = db.Column(db.Text, nullable=False)
    title = db.Column(db.String(255), nullable=False)