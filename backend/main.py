import sys
import os

# Thêm thư mục gốc của project vào sys.path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse
from database.session import engine
from backend.models import user
from routers import auth, password
from routers import product_platform
from routers import user_router

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], allow_credentials=True,
    allow_methods=["*"], allow_headers=["*"],
)

# Tạo bảng nếu chưa có
user.Base.metadata.create_all(bind=engine)

# Đăng ký routers
app.include_router(auth.router)
app.include_router(password.router)
app.include_router(product_platform.router)
app.include_router(user_router.router)

@app.get("/open-app/reset-password/{user_id}")
def open_app_reset(user_id: int):
    # Redirect đến deep link
    return RedirectResponse(url=f"mobile://reset-password/{user_id}")
