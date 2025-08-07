from fastapi import FastAPI
from routes import auth, projects, tasks, materials, audio, attendance
from database import Base, engine
from fastapi.middleware.cors import CORSMiddleware

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/auth")
app.include_router(projects.router, prefix="/projects")
app.include_router(tasks.router, prefix="/tasks")
app.include_router(materials.router, prefix="/materials")
app.include_router(audio.router, prefix="/audio")
app.include_router(attendance.router, prefix="/attendance")
