from pydantic import BaseModel
from enum import Enum
from typing import Literal

class RoleEnum(str, Enum):
    contractor = "contractor"
    worker = "worker"
    vendor = "vendor"

class UserCreate(BaseModel):
    name: str
    phone_number: str
    role: RoleEnum
    language_pref: str = "en"

class UserOut(UserCreate):
    user_id: str

    class Config:
        orm_mode = True
# app/schemas/user.py


class LoginRequest(BaseModel):
    phone_number: str
class UserCreate(BaseModel):
    name: str
    phone_number: str
    role: Literal['contractor', 'supervisor', 'worker']
    language_pref: str = "en"

class UserOut(BaseModel):
    user_id: str
    name: str
    phone_number: str
    role: str
    language_pref: str

class Config:
    orm_mode = True

class LoginRequest(BaseModel):
    phone_number: str

