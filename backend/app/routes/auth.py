# app/routes/auth.py

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.models.user import User
from app.schemas.user import UserCreate, UserOut, LoginRequest
from app.database import get_db
import uuid

router = APIRouter()

@router.post("/register", response_model=UserOut)
def register_user(user: UserCreate, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.phone_number == user.phone_number).first()
    if existing:
        raise HTTPException(status_code=400, detail="User already exists")
    new_user = User(user_id=str(uuid.uuid4()), **user.dict())
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@router.post("/login", response_model=UserOut)
def login_user(request: LoginRequest, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.phone_number == request.phone_number).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user
