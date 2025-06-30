from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse
from database.session import engine
from models import models
from routers import auth, password

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], allow_credentials=True,
    allow_methods=["*"], allow_headers=["*"],
)

# Tạo bảng nếu chưa có
models.Base.metadata.create_all(bind=engine)

# Đăng ký routers
app.include_router(auth.router)
app.include_router(password.router)

@app.get("/open-app/reset-password/{user_id}")
def open_app_reset(user_id: int):
    # Redirect đến deep link
    return RedirectResponse(url=f"mobile://reset-password/{user_id}")
