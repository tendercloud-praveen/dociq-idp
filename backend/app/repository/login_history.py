from sqlalchemy.orm import Session

from app.models.users import User
from app.models.login_history import LoginHistory


def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()


def get_user_by_mobile(db: Session, mobile_number: str):
    return db.query(User).filter(User.mobile_number == mobile_number).first()


def create_login_history(db: Session, login_history: LoginHistory):
    db.add(login_history)
    db.commit()
    db.refresh(login_history)
    return login_history