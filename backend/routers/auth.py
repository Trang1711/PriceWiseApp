from fastapi import APIRouter, Depends, HTTPException, Body
from sqlalchemy.orm import Session
from schemas.schemas import UserOut, UserCreate
from backend.models.user import User
from database.session import get_db

router = APIRouter()

@router.post("/users/", response_model=UserOut)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    if db.query(User).filter(User.email == user.email).first():
        raise HTTPException(status_code=400, detail="Email đã tồn tại")
    db_user = User(**user.dict())
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@router.post("/login")
def login(data: dict = Body(...), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == data.get("email")).first()
    if not user or user.password_hash != data.get("password"):
        raise HTTPException(status_code=401, detail="Sai tài khoản hoặc mật khẩu")
    return {
        "success": True,
        "user": {
            "id": user.user_id,
            "email": user.email,
            "username": user.username
        }
    }
