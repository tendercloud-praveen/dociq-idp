from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.schema.users import SendOTPRequest
from app.services.forgot_password_service import ForgotPasswordService

router = APIRouter(
    prefix="/forgot-password",
    tags=["Forgot Password"]
)


@router.post("/send-otp")
def send_otp(
    request: SendOTPRequest,
    db: Session = Depends(get_db)
):
    return ForgotPasswordService.send_otp(
        db=db,
        email=request.email
    )