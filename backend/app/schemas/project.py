from pydantic import BaseModel
from typing import Optional
from datetime import date

class ProjectCreate(BaseModel):
    contractor_id: str
    name: str
    location: Optional[str]
    start_date: Optional[date]
    end_date: Optional[date]

class ProjectOut(ProjectCreate):
    project_id: str

    class Config:
        orm_mode = True
