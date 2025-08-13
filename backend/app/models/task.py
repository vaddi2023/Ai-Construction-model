from sqlalchemy import Column, String, Integer, ForeignKey, Enum as SqlEnum, DateTime
from app.database import Base
import uuid
from datetime import datetime
from enum import Enum

class TaskStatus(str, Enum):
    pending = "pending"
    in_progress = "in_progress"
    done = "done"

class Task(Base):
    __tablename__ = "tasks"

    task_id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    project_id = Column(String, ForeignKey("projects.project_id"), nullable=False)
    assigned_to = Column(String, ForeignKey("users.user_id"), nullable=True)
    description = Column(String, nullable=False)
    status = Column(SqlEnum(TaskStatus), default=TaskStatus.pending)
    progress = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
