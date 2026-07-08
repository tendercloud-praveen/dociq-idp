from fastapi import APIRouter
from app.services.smtp_service import SMTPService

router = APIRouter(
    prefix="/email",
    tags=["Email Test"]
)


@router.get("/test")
def send_test_email():

    SMTPService.send_email(
        to_email="pravalyabukkala@gmail.com",
        subject="SMTP Test",
        body="Congratulations! Your SMTP configuration is working successfully."
    )

    return {
        "message": "Email sent successfully."
    }