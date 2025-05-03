from app import ma
from app.models.idea_post import IdeaPost

class IdeaPostSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = IdeaPost