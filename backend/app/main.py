from dotenv import load_dotenv
load_dotenv()

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os

from app.routes import auth, projects, tasks, materials, audio, attendance
from app.database import Base, engine

print("🔑 OpenAI Key:", os.getenv("OPENAI_API_KEY"))

Base.metadata.create_all(bind=engine)

app = FastAPI()

# CORS Middleware (optional if using frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(projects.router, prefix="/projects", tags=["projects"])
app.include_router(tasks.router, prefix="/tasks", tags=["tasks"])
app.include_router(materials.router, prefix="/materials", tags=["materials"])
app.include_router(audio.router, prefix="/audio", tags=["audio"])
app.include_router(attendance.router, prefix="/attendance", tags=["attendance"])
