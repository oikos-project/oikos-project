import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from database import (
    Base,
    get_db,
    engine,
    SessionLocal,
)  # Import get_db, engine, SessionLocal from database
from app import create_app  # Assuming create_app is in app


@pytest.fixture(scope="function")
def app():
    app = create_app()
    app.config.update(
        {
            "TESTING": True,
            "DATABASE_URL": "sqlite:///:memory:",  # Use in-memory SQLite for tests
            "ALLOW_OPEN_REGISTRATION": True,  # Ensure registration is open for tests
            "SECRET_KEY": "test_secret_key",  # Provide a secret key for JWT
        }
    )
    yield app


@pytest.fixture(scope="function")
def client(app):
    return app.test_client()


@pytest.fixture(scope="function")
def db_session(app, monkeypatch):
    # Store original engine and SessionLocal
    original_engine = engine
    original_SessionLocal = SessionLocal

    # Create a test engine and SessionLocal
    test_engine = create_engine(app.config["DATABASE_URL"])
    TestSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=test_engine)

    # Patch database.engine and database.SessionLocal
    monkeypatch.setattr("database.engine", test_engine)
    monkeypatch.setattr("database.SessionLocal", TestSessionLocal)

    Base.metadata.create_all(test_engine)
    connection = test_engine.connect()
    transaction = connection.begin()
    db = TestSessionLocal(bind=connection)

    # Patch the get_db dependency to use our test session
    def override_get_db():
        yield db

    monkeypatch.setattr("database.get_db", override_get_db)

    yield db

    db.close()
    transaction.rollback()
    connection.close()
    Base.metadata.drop_all(test_engine)  # Ensure tables are dropped after each test

    # Restore original engine and SessionLocal
    monkeypatch.setattr("database.engine", original_engine)
    monkeypatch.setattr("database.SessionLocal", original_SessionLocal)
