from fastapi import APIRouter, Depends, HTTPException, Response
from sqlalchemy.orm import Session

from app.database.database import SessionLocal
from app.schema.login_history import LoginRequest
from app.services.login_history import login_user
from app.database.jwt import create_access_token

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
def login(
    request: LoginRequest,
    response: Response,
    db: Session = Depends(get_db)
):

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

    user = result["user"]

    access_token = create_access_token(
        {
            "sub": str(user.id),
            "email": user.email,
            "role": user.role
        }
    )

    # ==========================
    # Store JWT in Cookie
    # ==========================
    response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,
        secure=False,      # Change to True in Production (HTTPS)
        samesite="lax",
        max_age=60 * 60,
        expires=60 * 60
    )

    return {
        "success": True,
        "message": result["message"],
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "full_name": user.full_name,
            "email": user.email,
            "mobile_number": user.mobile_number,
            "role": user.role
        }
    }