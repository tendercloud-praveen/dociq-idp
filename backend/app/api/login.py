from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.database import SessionLocal
from app.schema.login_history import LoginRequest
from app.services.login_history import login_user

router = APIRouter(
    prefix="/login",
    tags=["Login"]
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/")
def login(request: LoginRequest, db: Session = Depends(get_db)):

    result = login_user(
        db,
        request.username,
        request.password
    )

    if result["success"] is False:
        raise HTTPException(
            status_code=400,
            detail=result["message"]
        )

    return {
        "success": True,
        "message": result["message"],
        "user": {
            "id": result["user"].id,
            "full_name": result["user"].full_name,
            "email": result["user"].email,
            "mobile_number": result["user"].mobile_number,
            "role": result["user"].role
        }
    }