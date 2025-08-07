from fastapi import FastAPI
from app.routes import auth, projects, tasks, materials, audio, attendance
from app.database import Base, engine

Base.metadata.create_all(bind=engine)
app = FastAPI()

app.include_router(auth.router, prefix="/auth")
app.include_router(projects.router, prefix="/projects")
app.include_router(tasks.router, prefix="/tasks")
app.include_router(materials.router, prefix="/materials")
app.include_router(audio.router, prefix="/audio")
app.include_router(attendance.router, prefix="/attendance")
