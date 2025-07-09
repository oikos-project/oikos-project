from werkzeug.security import generate_password_hash, check_password_hash
from zxcvbn import zxcvbn
from backend.database import SessionLocal
from backend.models import User
from backend.config import ALLOW_OPEN_REGISTRATION

def login_user_service(email, password):
    db = SessionLocal()
    try:
        user = db.query(User).filter_by(email=email).first()
        if not user or not check_password_hash(user.password_hash, password):
            return {"success": False, "message": "Invalid credentials."}
        return {"success": True, "message": "Login successful", "user": {"id": user.id, "email": user.email}}
    finally:
        db.close()

def register_user_service(email, password):
    db = SessionLocal()
    try:
        if not ALLOW_OPEN_REGISTRATION:
            return {"success": False, "message": "Registration is currently closed."}

        # Check password strength
        strength = zxcvbn(password, user_inputs=[email])
        if strength['score'] < 2:
            return {"success": False, "message": "Password is too weak.", "suggestions": strength['feedback']['suggestions']}

        existing_user = db.query(User).filter_by(email=email).first()
        if existing_user:
            return {"success": False, "message": "User with this email already exists."}

        hashed_password = generate_password_hash(password)
        new_user = User(email=email, password_hash=hashed_password)
        db.add(new_user)
        db.commit()
        db.refresh(new_user)

        return {"success": True, "message": "User registered successfully", "user": {"id": new_user.id, "email": new_user.email}}
    except Exception as e:
        db.rollback()
        return {"success": False, "message": str(e)}
    finally:
        db.close()