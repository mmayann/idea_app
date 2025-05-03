from flask import Blueprint, request, jsonify
from app.models.meto import Meto
from app.schemas.meto_schema import MetoSchema
from app import db

metos_bp = Blueprint('metos', __name__)
meto_schema = MetoSchema()
metos_schema = MetoSchema(many=True)

@metos_bp.route('/metos', methods=['GET'])
def get_metos():
    metos = Meto.query.all()
    return jsonify(metos_schema.dump(metos))

@metos_bp.route('/metos/<int:meto_id>', methods=['GET'])
def get_meto(meto_id):
    meto = Meto.query.get_or_404(meto_id)
    return meto_schema.jsonify(meto)

@metos_bp.route('/metos', methods=['POST'])
def create_meto():
    data = request.get_json()
    new_meto = meto_schema.load(data)
    db.session.add(new_meto)
    db.session.commit()
    return meto_schema.jsonify(new_meto), 201

@metos_bp.route('/metos/<int:meto_id>', methods=['DELETE'])
def delete_meto(meto_id):
    meto = Meto.query.get_or_404(meto_id)
    db.session.delete(meto)
    db.session.commit()
    return '', 204