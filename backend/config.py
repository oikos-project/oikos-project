import os

DATABASE_URL = os.getenv('DATABASE_URL', 'sqlite:///./backend/data/oikos.db')

# Authentication Configuration
ALLOW_OPEN_REGISTRATION = os.getenv('ALLOW_OPEN_REGISTRATION', 'True').lower() == 'true'
SECRET_KEY = os.getenv('SECRET_KEY', 'your_secret_key_here') # Replace with a strong secret key in production