# app/schemas/form_schema.py

from app.models.form import Form 
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema 

class FormSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Form 
        load_instance = True 
