from pydantic import BaseModel
from typing import Optional
from enum import Enum
from datetime import datetime

class TaskStatus(str, Enum):
    pending = "pending"
    in_progress = "in_progress"
    done = "done"

class TaskCreate(BaseModel):
    project_id: str
    description: str
    assigned_to: Optional[str]
    status: Optional[TaskStatus] = TaskStatus.pending
    progress: Optional[int] = 0

class TaskUpdate(BaseModel):
    progress: Optional[int]
    status: Optional[TaskStatus]

class TaskOut(TaskCreate):
    task_id: str
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True
