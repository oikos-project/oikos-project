from flask import Blueprint, jsonify
from .services import get_all_users_service

users_bp = Blueprint("users", __name__)


@users_bp.route("/users", methods=["GET"])
def get_users():
    users_list = get_all_users_service()
    return jsonify(users_list), 200
