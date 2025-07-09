import pytest
from models import User
from werkzeug.security import generate_password_hash


def test_register_route_success(client, db_session):
    response = client.post(
        "/auth/register",
        json={"email": "route@example.com", "password": "StrongPassword123!@#"},
    )
    assert response.status_code == 201  # Expect 201 Created
    assert response.json["success"] is True
    assert "User registered successfully" in response.json["message"]
    user = db_session.query(User).filter_by(email="route@example.com").first()
    assert user is not None


def test_login_route_success(client, db_session):
    # First, register a user via direct DB insertion for route test setup
    hashed_password = generate_password_hash("StrongPassword123!@#")
    user = User(email="route_login@example.com", password_hash=hashed_password)
    db_session.add(user)
    db_session.commit()

    response = client.post(
        "/auth/login",
        json={"email": "route_login@example.com", "password": "StrongPassword123!@#"},
    )
    assert response.status_code == 200
    assert response.json["success"] is True
    assert "Login successful" in response.json["message"]
    assert "access_token" in response.json


def test_login_route_invalid_credentials(client):
    response = client.post(
        "/auth/login", json={"email": "no@example.com", "password": "bad"}
    )
    assert response.status_code == 401
    assert response.json["success"] is False
    assert "Invalid credentials" in response.json["message"]
