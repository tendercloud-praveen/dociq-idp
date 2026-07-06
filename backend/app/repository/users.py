from sqlalchemy.orm import Session
from app.models.users import User


def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()


def get_user_by_mobile(db: Session, mobile: str):
    return db.query(User).filter(User.mobile_number == mobile).first()


def create_user(db: Session, user: User):
    db.add(user)
    db.commit()
    db.refresh(user)
    return user