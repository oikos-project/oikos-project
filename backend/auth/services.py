import jwt
from datetime import datetime, timedelta, UTC
from werkzeug.security import generate_password_hash, check_password_hash
from zxcvbn import zxcvbn
from backend.database import get_db
from backend.models import User
from backend.config import ALLOW_OPEN_REGISTRATION, SECRET_KEY


def login_user_service(email, password):
    db = next(get_db())
    try:
        user = db.query(User).filter_by(email=email).first()
        if not user or not check_password_hash(user.password_hash, password):
            return {"success": False, "message": "Invalid credentials."}

        # Generate JWT Token
        token_payload = {
            "user_id": user.id,
            "exp": datetime.now(UTC) + timedelta(hours=24),  # Token expires in 24 hours
        }
        access_token = jwt.encode(token_payload, SECRET_KEY, algorithm="HS256")

        return {
            "success": True,
            "message": "Login successful",
            "user": {"id": user.id, "email": user.email},
            "access_token": access_token,
        }
    finally:
        db.close()


def register_user_service(email, password):
    db = next(get_db())
    try:
        if not ALLOW_OPEN_REGISTRATION:
            print(
                "DEBUG: register_user_service: Returning False - Registration closed."
            )
            return {"success": False, "message": "Registration is currently closed."}

        # Check password strength
        strength = zxcvbn(password, user_inputs=[email])
        if strength["score"] < 2:
            print(
                f"DEBUG: register_user_service: Returning False - Password too weak (score: {strength['score']})."
            )
            return {
                "success": False,
                "message": "Password is too weak.",
                "suggestions": strength["feedback"]["suggestions"],
            }

        existing_user = db.query(User).filter_by(email=email).first()
        if existing_user:
            print(
                f"DEBUG: register_user_service: Returning False - User already exists: {existing_user.email}."
            )
            return {"success": False, "message": "User with this email already exists."}

        hashed_password = generate_password_hash(password)
        new_user = User(email=email, password_hash=hashed_password)
        db.add(new_user)
        db.commit()
        db.refresh(new_user)

        print(
            "DEBUG: register_user_service: Returning True - User registered successfully."
        )
        return {
            "success": True,
            "message": "User registered successfully",
            "user": {"id": new_user.id, "email": new_user.email},
        }
    except Exception as e:
        print(f"DEBUG: Exception in register_user_service: {e}")
        db.rollback()
        return {"success": False, "message": str(e)}
    finally:
        db.close()
