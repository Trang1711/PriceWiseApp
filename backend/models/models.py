# from sqlalchemy import Column, Integer, String, DateTime, func
# from database import Base

# class User(Base):
#     __tablename__ = "User"

#     user_id = Column(Integer, primary_key=True, index=True)
#     username = Column(String(50), unique=True, nullable=False)
#     email = Column(String(100), unique=True)
#     password_hash = Column(String(256), nullable=False)
#     full_name = Column(String(100))
#     phone_number = Column(String(20))
#     address = Column(String(255))
#     created_at = Column(DateTime, server_default=func.getdate())

from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func
from database.db import Base

class User(Base):
    __tablename__ = "User"

    user_id = Column(Integer, primary_key=True, index=True)
    username = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    password_hash = Column(String, nullable=False)

    # Các trường có thể cập nhật sau
    full_name = Column(String, nullable=True)
    phone_number = Column(String, nullable=True)
    address = Column(String, nullable=True)
    created_at = Column(DateTime, server_default=func.now())

