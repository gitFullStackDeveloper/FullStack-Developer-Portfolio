from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class UserCreate(BaseModel):
    username: str
    email: str
    password: str
    full_name: Optional[str] = ""
    role: str = "admin"   # "admin" or "superadmin"

class UserLogin(BaseModel):
    email: str
    password: str

class UserUpdate(BaseModel):
    full_name: Optional[str] = None
    email: Optional[str] = None
    password: Optional[str] = None

class UserInDB(BaseModel):
    id: str = Field(alias="_id")
    username: str
    email: str
    full_name: str
    role: str
    hashed_password: str
    created_at: datetime