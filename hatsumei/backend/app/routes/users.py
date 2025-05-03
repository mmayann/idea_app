from flask import Blueprint, request, jsonify, make_response
import json
from app.models.user import User
from app.schemas.user_schema import UserSchema
from app import db

users_bp = Blueprint('users', __name__)
user_schema = UserSchema()
users_schema = UserSchema(many=True)

@users_bp.route('/users', methods=['GET'])
def get_users():
    print("Fetching users from the database...")
    
    users = User.query.all()
    print(f"Users fetched: {users}") 
    
    result = users_schema.dump(users)
    print(f"Users schema dump result: {result}") 
    

    response = make_response(json.dumps(result, ensure_ascii=False))
    response.headers["Content-Type"] = "application/json; charset=utf-8"

    return response

@users_bp.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = User.query.get_or_404(user_id)
    response = make_response(json.dumps(user_schema.dump(user), ensure_ascii=False))
    response.headers["Content-Type"] = "application/json; charset=utf-8"
    return response

@users_bp.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()
    new_user = user_schema.load(data)
    db.session.add(new_user)
    db.session.commit()
    
    response = make_response(json.dumps(user_schema.dump(new_user), ensure_ascii=False), 201)
    response.headers["Content-Type"] = "application/json; charset=utf-8"
    return response

@users_bp.route('/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    user = User.query.get_or_404(user_id)
    data = request.get_json()
    updated_user = user_schema.load(data, instance=user)
    db.session.commit()
    
    response = make_response(json.dumps(user_schema.dump(updated_user), ensure_ascii=False))
    response.headers["Content-Type"] = "application/json; charset=utf-8"
    return response

@users_bp.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    user = User.query.get_or_404(user_id)
    db.session.delete(user)
    db.session.commit()
    return '', 204