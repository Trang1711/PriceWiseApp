# from fastapi import APIRouter, Depends
# from sqlalchemy.orm import Session
# from database.db import get_db
# from models.product import Product
# from schemas import ProductSchema  
# from models.category import Category

# router = APIRouter()

# @router.get("/products/by-category/{category_id}")
# def get_products_by_category(category_id: int, db: Session = Depends(get_db)):
#     products = db.query(Product).filter(Product.category_id == category_id).all()
#     return products
