from flask import Blueprint, request, jsonify
from .services import login_user_service, register_user_service

auth_bp = Blueprint("auth", __name__)


@auth_bp.route("/auth/login", methods=["POST"])
def login_user():
    user_data = request.json
    email = user_data.get("email")
    password = user_data.get("password")

    if not email or not password:
        return jsonify({"message": "Email and password are required."}), 400

    result = login_user_service(email, password)
    if result["success"]:
        return jsonify(result), 200
    else:
        return jsonify(result), 401 if "credentials" in result["message"] else 500


@auth_bp.route("/auth/register", methods=["POST"])
def register_user():
    user_data = request.json
    email = user_data.get("email")
    password = user_data.get("password")

    if not email or not password:
        return jsonify({"message": "Email and password are required."}), 400

    result = register_user_service(email, password)
    if result["success"]:
        return jsonify(result), 201
    else:
        status_code = 500
        if "Registration is currently closed" in result["message"]:
            status_code = 403
        elif "Password is too weak" in result["message"]:
            status_code = 400
        elif "User with this email already exists" in result["message"]:
            status_code = 409
        return jsonify(result), status_code
