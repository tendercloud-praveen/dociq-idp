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






def save_reset_token(db: Session, user: User, token: str, expiry):
    user.reset_token = token
    user.reset_token_expiry = expiry
    db.commit()
    db.refresh(user)


def get_user_by_token(db: Session, token: str):
    return db.query(User).filter(User.reset_token == token).first()


def update_password(db: Session, user: User, new_password: str):
    user.password = new_password
    user.reset_token = None
    user.reset_token_expiry = None
    db.commit()
    db.refresh(user)



def save_otp(db: Session, user: User, otp: str, expiry):
     user.otp = otp
     user.otp_expiry = expiry
     db.commit()
     db.refresh(user)


def get_user_by_email_and_otp(db: Session, email: str, otp: str):
    return db.query(User).filter(
        User.email == email,
        User.otp == otp
    ).first()


def clear_otp(db: Session, user: User):
    user.otp = None
    user.otp_expiry = None
    db.commit()
    db.refresh(user)