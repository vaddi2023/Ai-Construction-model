from app.database import Base
from sqlalchemy import Column, String, DateTime, Integer
import datetime

class Attendance(Base):
    __tablename__ = "attendance"

    id = Column(Integer, primary_key=True, index=True)
    project_id = Column(String, index=True)
    user_id = Column(String, index=True)
    in_time = Column(DateTime, default=datetime.datetime.utcnow)
    out_time = Column(DateTime, nullable=True)
    worked_hours = Column(Integer, default=0)
