from uuid import uuid4
from datetime import datetime, timedelta

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.database import SessionLocal

from app.schema.users import (
    UserRegister,
    UserResponse,
    ForgotPasswordRequest,
    ResetPasswordRequest,
)

from app.repository.users import (
    get_user_by_email,
    get_user_by_mobile,
    create_user,
    save_reset_token,
    get_user_by_token,
    update_password,
)

from app.models.users import User
from app.services.smtp_service import SMTPService


router = APIRouter(
    prefix="/users",
    tags=["Users"]
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ==========================================
# Register
# ==========================================

@router.post("/register", response_model=UserResponse)
def register(user: UserRegister, db: Session = Depends(get_db)):

    if user.password != user.confirm_password:
        raise HTTPException(
            status_code=400,
            detail="Passwords do not match"
        )

    existing_email = get_user_by_email(db, user.email)

    if existing_email:
        raise HTTPException(
            status_code=400,
            detail="Email already exists"
        )

    existing_mobile = get_user_by_mobile(
        db,
        user.mobile_number
    )

    if existing_mobile:
        raise HTTPException(
            status_code=400,
            detail="Mobile number already exists"
        )

    db_user = User(
        full_name=user.full_name,
        company_name=user.company_name,
        email=user.email,
        mobile_number=user.mobile_number,
        role=user.role,
        password=user.password     # Hash later
    )

    new_user = create_user(db, db_user)

    return new_user


# ==========================================
# Forgot Password
# ==========================================

@router.post("/forgot-password")
def forgot_password(
    request: ForgotPasswordRequest,
    db: Session = Depends(get_db)
):

    user = get_user_by_email(db, request.email)

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    token = str(uuid4())

    expiry = datetime.utcnow() + timedelta(minutes=15)

    save_reset_token(
        db,
        user,
        token,
        expiry
    )

    reset_link = (
        f"http://localhost:8000/users/reset-password?token={token}"
    )

    SMTPService.send_reset_password_email(
        user.email,
        reset_link
    )

    return {
        "message": "Password reset link sent successfully."
    }


# ==========================================
# Reset Password
# ==========================================

@router.post("/reset-password")
def reset_password(
    request: ResetPasswordRequest,
    db: Session = Depends(get_db)
):

    if request.new_password != request.confirm_password:

        raise HTTPException(
            status_code=400,
            detail="Passwords do not match."
        )

    user = get_user_by_token(
        db,
        request.token
    )

    if not user:

        raise HTTPException(
            status_code=400,
            detail="Invalid reset token."
        )

    if datetime.utcnow() > user.reset_token_expiry:

        raise HTTPException(
            status_code=400,
            detail="Reset token has expired."
        )

    update_password(
        db,
        user,
        request.new_password
    )

    return {
        "message": "Password updated successfully."
    }