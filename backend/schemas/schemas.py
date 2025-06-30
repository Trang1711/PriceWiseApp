from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password_hash: str

class UserUpdate(BaseModel):
    full_name: Optional[str]
    phone_number: Optional[str]
    address: Optional[str]

class UserOut(BaseModel):
    user_id: int
    username: str
    email: str
    full_name: Optional[str]
    phone_number: Optional[str]
    address: Optional[str]
    created_at: datetime

    class Config:
        orm_mode = True
