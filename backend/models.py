from sqlalchemy import Column, Integer, String, Uuid
from database import Base
import uuid


class User(Base):
    __tablename__ = "users"

    id = Column(Uuid, primary_key=True, index=True, default=uuid.uuid4)
    email = Column(String, unique=True, index=True)
    password_hash = Column(String)

    def __repr__(self):
        return f"<User(id={self.id}, email='{self.email}')>"
