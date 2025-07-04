from sqlalchemy import Column, Integer, DateTime, ForeignKey
from sqlalchemy.sql import func
from database.db import Base
from sqlalchemy.orm import relationship

class FavoriteProduct(Base):
    __tablename__ = "Favorite_Product"

    favorite_id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("User.user_id"), nullable=False)
    product_id = Column(Integer, ForeignKey("Product.product_id"), nullable=False)
    added_at = Column(DateTime, server_default=func.now())

    product = relationship("Product", backref="favorites")

