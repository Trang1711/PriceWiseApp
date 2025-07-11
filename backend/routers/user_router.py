# routers/user_router.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.schemas.schemas import UserUpdate
from database.db import get_db
from models.user import User
from pydantic import BaseModel  
from models.search_history import SearchHistory
from models.favorite_product import FavoriteProduct

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

@router.put("/api/user/{user_id}")
def update_user(user_id: int, user: UserUpdate, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.user_id == user_id).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    
    for key, value in user.dict(exclude_unset=True).items():
        setattr(db_user, key, value)
    
    db.commit()
    db.refresh(db_user)
    return db_user

@router.delete("/users/{user_id}")
def delete_user(user_id: int, db: Session = Depends(get_db)):
    # Xoá các bản ghi phụ thuộc trước
    db.query(SearchHistory).filter(SearchHistory.user_id == user_id).delete()
    db.query(FavoriteProduct).filter(FavoriteProduct.user_id == user_id).delete()

    # Sau đó xoá user
    user = db.query(User).filter(User.user_id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    db.delete(user)
    db.commit()
    return {"message": "User deleted successfully"}


