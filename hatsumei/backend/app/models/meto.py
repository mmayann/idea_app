from app import db

class Meto(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    idea_post_id = db.Column(db.Integer, db.ForeignKey('idea_post.id'), nullable=False)
    __table_args__ = (db.UniqueConstraint('user_id', 'idea_post_id'),)