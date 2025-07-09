from flask import Blueprint, request, jsonify
from backend.database import SessionLocal, get_db
from backend.models import User

users_bp = Blueprint('users', __name__)

@users_bp.route('/users', methods=['POST'])
def create_user():
    db = SessionLocal()
    try:
        user_data = request.json
        new_user = User(name=user_data['name'], email=user_data['email'])
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        return jsonify({"message": "User created successfully", "user": {"id": new_user.id, "name": new_user.name, "email": new_user.email}}), 201
    except Exception as e:
        db.rollback()
        return jsonify({"error": str(e)}), 400
    finally:
        db.close()

@users_bp.route('/users', methods=['GET'])
def get_users():
    db = SessionLocal()
    try:
        users = db.query(User).all()
        users_list = [{"id": user.id, "name": user.name, "email": user.email} for user in users]
        return jsonify(users_list), 200
    finally:
        db.close()
