from backend.database import SessionLocal
from backend.models import User


def get_all_users_service():
    db = SessionLocal()
    try:
        users = db.query(User).all()
        users_list = [{"id": user.id, "email": user.email} for user in users]
        return users_list
    finally:
        db.close()
