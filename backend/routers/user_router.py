# routers/user_router.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database.db import get_db
from models.user import User
from pydantic import BaseModel

router = APIRouter()

class UserOut(BaseModel):
    user_id: int
    username: str
    email: str
    password_hash: str
    full_name: str | None
    phone_number: str | None
    address: str | None

    class Config:
        orm_mode = True

@router.get("/api/user/{user_id}", response_model=UserOut)
def get_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.user_id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user
