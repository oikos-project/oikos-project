from flask import Blueprint, request, jsonify
from backend.database import SessionLocal, get_db
from backend.models import User

users_bp = Blueprint('users', __name__)

@users_bp.route('/users', methods=['GET'])
def get_users():
    db = SessionLocal()
    try:
        users = db.query(User).all()
        users_list = [{"id": user.id, "email": user.email} for user in users]
        return jsonify(users_list), 200
    finally:
        db.close()
