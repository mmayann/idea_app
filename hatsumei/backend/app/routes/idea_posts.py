from flask import Blueprint, request, jsonify, make_response
import json
from app.models.idea_post import IdeaPost
from app.schemas.idea_post_schema import IdeaPostSchema
from app import db
from datetime import datetime, timezone 

idea_posts_bp = Blueprint('idea_posts', __name__)
idea_post_schema = IdeaPostSchema()
idea_posts_schema = IdeaPostSchema(many=True)

@idea_posts_bp.route('/idea_posts', methods=['GET'])
def get_idea_posts():
    idea_posts = IdeaPost.query.all()
    response = make_response(json.dumps(idea_posts_schema.dump(idea_posts), ensure_ascii=False))
    response.headers["Content-Type"] = "application/json; charset=utf-8"
    return response

@idea_posts_bp.route('/idea_posts/<int:idea_post_id>', methods=['GET'])
def get_idea_post(idea_post_id):
    idea_post = IdeaPost.query.get_or_404(idea_post_id)
    response = make_response(json.dumps(idea_post_schema.dump(idea_post), ensure_ascii=False))
    response.headers["Content-Type"] = "application/json; charset=utf-8"
    return response

@idea_posts_bp.route('/idea_posts', methods=['POST'])
def create_idea_post():
    data = request.get_json()
    print(f"Received data: {data}") 

    try:
        if not data.get("user_id"):
            return jsonify({"error": "user_id is required"}), 400

        new_idea_post = IdeaPost(
            user_id=data.get("user_id"),
            title=data.get("title"),
            message=data.get("message"),
            main_category=data.get("main_category"),
            sub_category=data.get("sub_category"),
            kanatta=data.get("kanatta"),
            date=datetime.now(timezone.utc)
        )
        
        db.session.add(new_idea_post)
        db.session.commit()
        
        response = make_response(json.dumps(idea_post_schema.dump(new_idea_post), ensure_ascii=False), 201)
        response.headers["Content-Type"] = "application/json; charset=utf-8"
        return response

    except Exception as e:
        db.session.rollback() 
        print(f"Error: {e}") 
        return jsonify({"error": str(e)}), 400


@idea_posts_bp.route('/idea_posts/<int:idea_post_id>', methods=['PUT'])
def update_idea_post(idea_post_id):
    idea_post = IdeaPost.query.get_or_404(idea_post_id)
    data = request.get_json()
    
    for key, value in data.items():
        setattr(idea_post, key, value)
    
    db.session.commit()
    
    response = make_response(json.dumps(idea_post_schema.dump(idea_post), ensure_ascii=False))
    response.headers["Content-Type"] = "application/json; charset=utf-8"
    return response

@idea_posts_bp.route('/idea_posts/<int:idea_post_id>', methods=['DELETE'])
def delete_idea_post(idea_post_id):
    idea_post = IdeaPost.query.get_or_404(idea_post_id)
    db.session.delete(idea_post)
    db.session.commit()
    return '', 204