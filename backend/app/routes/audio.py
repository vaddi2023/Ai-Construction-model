from fastapi import APIRouter, UploadFile, File, Form, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.task import Task, TaskStatus
from app.models.project import Project
from app.models.attendance import Attendance
import os
import uuid
from datetime import datetime

router = APIRouter()

@router.post("/upload-audio")
async def upload_audio(
    project_id: str = Form(...),
    assigned_to: str = Form(...),
    audio: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    # 1. Save audio file temporarily
    temp_path = f"temp_{uuid.uuid4()}.mp3"
    with open(temp_path, "wb") as f:
        f.write(await audio.read())

    # 2. Simulate transcription (Mock)
    spoken_text = "Started work at 9 AM for floor plastering. Progress is 70 percent complete."

    # 3. Simulate GPT extraction (Mock)
    structured = {
        "description": "Floor 1 plastering",
        "progress": 70,
        "status": "in_progress"
    }

    # 4. Try to match existing tasks
    tasks = db.query(Task).filter(Task.project_id == project_id).all()

    best_match = None
    for task in tasks:
        if structured["description"].lower() in task.description.lower():
            best_match = task
            break

    if best_match:
        # Update task
        best_match.progress = structured["progress"]
        best_match.status = TaskStatus(structured["status"])
        db.commit()
        db.refresh(best_match)
        os.remove(temp_path)
        return {"message": "Task updated", "task_id": best_match.id}
    else:
        # Create new task
        new_task = Task(
            project_id=project_id,
            assigned_to=assigned_to,
            description=structured["description"],
            progress=structured["progress"],
            status=TaskStatus(structured["status"]),
            created_at=datetime.utcnow()
        )
        db.add(new_task)
        db.commit()
        db.refresh(new_task)
        os.remove(temp_path)
        return {"message": "New task created", "task_id": new_task.id}
