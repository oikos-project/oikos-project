from flask import Flask
from backend.database import Base, engine
from backend.routes.users import users_bp

def create_app():
    app = Flask(__name__)

    # Register Blueprints
    app.register_blueprint(users_bp)

    # Create database tables
    # This should ideally be handled by a migration tool in production
    Base.metadata.create_all(bind=engine)

    @app.route('/')
    def hello_world():
        return 'Hello from Modular Flask Backend!'

    return app
