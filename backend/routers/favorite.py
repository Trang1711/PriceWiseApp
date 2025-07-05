from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database.db import get_db
from models.favorite_product import FavoriteProduct
from schemas.schemas import FavoriteProductSchema
from typing import List

router = APIRouter(
    prefix="/favorites",
    tags=["Favorites"]
)

@router.get("/user/{user_id}", response_model=List[FavoriteProductSchema])
def get_favorites_by_user(user_id: int, db: Session = Depends(get_db)):
    favorites = db.query(FavoriteProduct).filter(FavoriteProduct.user_id == user_id).all()
    return favorites
