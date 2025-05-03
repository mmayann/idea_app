from flask import Blueprint, request, jsonify
from app.models.form import Form
from app.schemas.form_schema import FormSchema
from app import db

forms_bp = Blueprint('forms', __name__)
form_schema = FormSchema()
forms_schema = FormSchema(many=True)

@forms_bp.route('/forms', methods=['GET'])
def get_forms():
    forms = Form.query.all()
    return jsonify(forms_schema.dump(forms))

@forms_bp.route('/forms/<int:form_id>', methods=['GET'])
def get_form(form_id):
    form = Form.query.get_or_404(form_id)
    return form_schema.jsonify(form)

@forms_bp.route('/forms', methods=['POST'])
def create_form():
    data = request.get_json()
    new_form = form_schema.load(data)
    db.session.add(new_form)
    db.session.commit()
    return form_schema.jsonify(new_form), 201

@forms_bp.route('/forms/<int:form_id>', methods=['PUT'])
def update_form(form_id):
    form = Form.query.get_or_404(form_id)
    data = request.get_json()
    updated_form = form_schema.load(data, instance=form)
    db.session.commit()
    return form_schema.jsonify(updated_form)

@forms_bp.route('/forms/<int:form_id>', methods=['DELETE'])
def delete_form(form_id):
    form = Form.query.get_or_404(form_id)
    db.session.delete(form)
    db.session.commit()
    return '', 204