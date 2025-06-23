from fastapi import FastAPI
from routers import auth  # import router

app = FastAPI()


# Thêm route auth
app.include_router(auth.router)
