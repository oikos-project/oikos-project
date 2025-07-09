import os

DATABASE_URL = os.getenv('DATABASE_URL', 'sqlite:///./backend/data/oikos.db')

# Authentication Configuration
ALLOW_OPEN_REGISTRATION = os.getenv('ALLOW_OPEN_REGISTRATION', 'True').lower() == 'true'
