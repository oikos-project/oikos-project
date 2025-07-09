from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from zxcvbn import zxcvbn
from backend.database import SessionLocal
from backend.models import User
from backend.config import ALLOW_OPEN_REGISTRATION

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/auth/login', methods=['POST'])
def login_user():
    db = SessionLocal()
    try:
        user_data = request.json
        email = user_data.get('email')
        password = user_data.get('password')

        if not email or not password:
            return jsonify({"message": "Email and password are required."}), 400

        user = db.query(User).filter_by(email=email).first()
        if not user or not check_password_hash(user.password_hash, password):
            return jsonify({"message": "Invalid credentials."}), 401

        return jsonify({"message": "Login successful", "user": {"id": user.id, "email": user.email}}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        db.close()

@auth_bp.route('/auth/register', methods=['POST'])
def register_user():
    db = SessionLocal()
    try:
        if not ALLOW_OPEN_REGISTRATION:
            return jsonify({"message": "Registration is currently closed."}), 403

        user_data = request.json
        email = user_data.get('email')
        password = user_data.get('password')

        if not email or not password:
            return jsonify({"message": "Email and password are required."}), 400

        # Check password strength
        strength = zxcvbn(password, user_inputs=[email])
        if strength['score'] < 2:
            return jsonify({
                "message": "Password is too weak.",
                "suggestions": strength['feedback']['suggestions']
            }), 400

        existing_user = db.query(User).filter_by(email=email).first()
        if existing_user:
            return jsonify({"message": "User with this email already exists."}), 409

        hashed_password = generate_password_hash(password)
        new_user = User(email=email, password_hash=hashed_password) # Assuming User model has password_hash
        db.add(new_user)
        db.commit()
        db.refresh(new_user)

        return jsonify({"message": "User registered successfully", "user": {"id": new_user.id, "email": new_user.email}}), 201
    except Exception as e:
        db.rollback()
        return jsonify({"error": str(e)}), 500
    finally:
        db.close()
