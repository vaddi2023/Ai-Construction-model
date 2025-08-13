from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.project import Project
from app.schemas.project import ProjectCreate, ProjectOut
import uuid

router = APIRouter()

@router.post("/", response_model=ProjectOut)
def create_project(project: ProjectCreate, db: Session = Depends(get_db)):
    new_project = Project(
        project_id=str(uuid.uuid4()),
        **project.dict()
    )
    db.add(new_project)
    db.commit()
    db.refresh(new_project)
    return new_project

@router.get("/", response_model=list[ProjectOut])
def list_projects(contractor_id: str, db: Session = Depends(get_db)):
    return db.query(Project).filter(Project.contractor_id == contractor_id).all()
