from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func
from database.db import Base

# class User(Base):
#     __tablename__ = "User"

#     user_id = Column(Integer, primary_key=True, index=True)
#     username = Column(String, nullable=False)
#     email = Column(String, unique=True, nullable=False)
#     password_hash = Column(String, nullable=False)

#     # Các trường có thể cập nhật sau
#     full_name = Column(String, nullable=True)
#     phone_number = Column(String, nullable=True)
#     address = Column(String, nullable=True)
#     created_at = Column(DateTime, server_default=func.now())

class User(Base):
    __tablename__ = "User"
    __table_args__ = {'extend_existing': True}

    user_id = Column(Integer, primary_key=True, index=True)
    username = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    password_hash = Column(String, nullable=False)

    full_name = Column(String, nullable=True)
    phone_number = Column(String, nullable=True)
    address = Column(String, nullable=True)
    created_at = Column(DateTime, server_default=func.now())


