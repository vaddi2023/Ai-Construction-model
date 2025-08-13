from sqlalchemy import Column, String, Enum as SqlEnum
from sqlalchemy.dialects.postgresql import UUID
from app.database import Base
import uuid
from enum import Enum

class RoleEnum(str, Enum):
    contractor = "contractor"
    worker = "worker"
    vendor = "vendor"

class User(Base):
    __tablename__ = "users"

    user_id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String, nullable=False)
    phone_number = Column(String, unique=True, nullable=False)
    role = Column(SqlEnum(RoleEnum), nullable=False)  # FIXED
    language_pref = Column(String, default="en")
