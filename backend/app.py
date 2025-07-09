import os

from flask import Flask
from flask_cors import CORS
from database import Base, engine
from users.routes import users_bp
from auth.routes import auth_bp


def _init_data_dir():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    data_dir = f"{script_dir}/data"
    if not os.path.exists(data_dir):
        os.makedirs(data_dir)
        print(f"Directory '{data_dir}' created.")
    else:
        print(f"Directory '{data_dir}' already exists.")


def create_app():
    _init_data_dir()

    app = Flask(__name__)
    CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

    # Register Blueprints
    app.register_blueprint(users_bp)
    app.register_blueprint(auth_bp)

    # Create database tables only if not in testing mode
    if not app.config.get("TESTING"):
        Base.metadata.create_all(bind=engine)

    return app
