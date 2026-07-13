from datetime import datetime, timedelta
import random

from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.repository import users as user_repository
from app.services.smtp_service import SMTPService


class ForgotPasswordService:

    @staticmethod
    def send_otp(db: Session, email: str):

        # Check if user exists
        user = user_repository.get_user_by_email(db, email)

        if not user:
            raise HTTPException(
                status_code=404,
                detail="User not found."
            )

        # Generate 6-digit OTP
        otp = str(random.randint(100000, 999999))

        # OTP expires in 5 minutes
        expiry = datetime.utcnow() + timedelta(minutes=5)

        # Save OTP in database
        user_repository.save_otp(
            db=db,
            user=user,
            otp=otp,
            expiry=expiry
        )

        # Send OTP email
        SMTPService.send_otp_email(
            to_email=user.email,
            otp=otp
        )

        return {
            "message": "OTP sent successfully."
        }