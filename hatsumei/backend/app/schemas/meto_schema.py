from app import ma
from app.models.meto import Meto

class MetoSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Meto