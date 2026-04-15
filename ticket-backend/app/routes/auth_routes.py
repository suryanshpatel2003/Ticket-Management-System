from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel

from app.database import SessionLocal
from app.models.user_model import User
from app.utils.hash import hash_password, verify_password
from app.utils.jwt import create_token

router = APIRouter()

# 🔥 DB Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# 🔥 REQUEST SCHEMAS
class RegisterRequest(BaseModel):
    email: str
    password: str


class LoginRequest(BaseModel):
    email: str
    password: str


# 🔥 REGISTER API (ADMIN LOGIC ADDED)
@router.post("/register")
def register(data: RegisterRequest, db: Session = Depends(get_db)):

    # check existing user
    if db.query(User).filter(User.email == data.email).first():
        raise HTTPException(status_code=400, detail="User already exists")

    # 🔥 ADMIN LOGIC
    role = "admin" if data.email == "admin@gmail.com" else "user"

    user = User(
        email=data.email,
        password=hash_password(data.password),
        role=role
    )

    db.add(user)
    db.commit()

    return {
        "msg": "Registered successfully",
        "role": role   # optional (debug ke liye useful)
    }


# 🔥 LOGIN API
@router.post("/login")
def login(data: LoginRequest, db: Session = Depends(get_db)):

    user = db.query(User).filter(User.email == data.email).first()

    if not user:
        raise HTTPException(status_code=400, detail="Invalid email")

    if not verify_password(data.password, user.password):
        raise HTTPException(status_code=400, detail="Invalid password")

    token = create_token({
        "id": user.id,
        "role": user.role
    })

    return {
        "token": token,
        "role": user.role,
        "id": user.id
    }