import pytest
from backend.auth.services import login_user_service, register_user_service
from backend.models import User
from werkzeug.security import generate_password_hash

def test_register_user_service_success(db_session):
    result = register_user_service("test@example.com", "StrongPassword123!@#")
    assert result["success"] is True
    assert "User registered successfully" in result["message"]
    user = db_session.query(User).filter_by(email="test@example.com").first()
    assert user is not None

def test_login_user_service_success(db_session):
    # First, register a user
    hashed_password = generate_password_hash("StrongPassword123!@#")
    user = User(email="login@example.com", password_hash=hashed_password)
    db_session.add(user)
    db_session.commit()

    result = login_user_service("login@example.com", "StrongPassword123!@#")
    assert result["success"] is True
    assert "Login successful" in result["message"]
    assert "access_token" in result

def test_login_user_service_invalid_credentials(db_session):
    result = login_user_service("nonexistent@example.com", "wrongpassword")
    assert result["success"] is False
    assert "Invalid credentials" in result["message"]