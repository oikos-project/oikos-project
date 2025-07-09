from flask import Flask
from flask_cors import CORS
from backend.database import Base, engine
from backend.users.routes import users_bp
from backend.auth.routes import auth_bp


def create_app():
    app = Flask(__name__)
    CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

    # Register Blueprints
    app.register_blueprint(users_bp)
    app.register_blueprint(auth_bp)

    # Create database tables only if not in testing mode
    if not app.config.get("TESTING"):
        Base.metadata.create_all(bind=engine)

    @app.route("/")
    def hello_world():
        return "Hello from Modular Flask Backend!"

    return app
