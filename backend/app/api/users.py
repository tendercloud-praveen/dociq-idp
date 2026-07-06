from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database.database import SessionLocal, Base, engine


from app.schema.users import UserRegister, UserResponse
from app.repository.users import (
    get_user_by_email,
    get_user_by_mobile,
    create_user,
)
from app.models.users import User

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

    existing_mobile = get_user_by_mobile(db, user.mobile_number)

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
        password=user.password   # We'll hash this later
    )

    new_user = create_user(db, db_user)

    return new_user