import os
import smtplib

from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from dotenv import load_dotenv

load_dotenv()


class SMTPService:

    @staticmethod
    def send_email(to_email: str, subject: str, body: str):

        smtp_host = os.getenv("SMTP_HOST")
        smtp_port = int(os.getenv("SMTP_PORT"))
        smtp_email = os.getenv("SMTP_EMAIL")
        smtp_password = os.getenv("SMTP_PASSWORD")
        from_name = os.getenv("SMTP_FROM_NAME")

        message = MIMEMultipart()

        message["From"] = f"{from_name} <{smtp_email}>"
        message["To"] = to_email
        message["Subject"] = subject

        message.attach(MIMEText(body, "plain"))

        try:
            server = smtplib.SMTP(smtp_host, smtp_port)
            server.starttls()
            server.login(smtp_email, smtp_password)

            server.sendmail(
                smtp_email,
                to_email,
                message.as_string()
            )

            server.quit()

            print("Email sent successfully.")

        except Exception as e:
            print(f"Failed to send email: {e}")








    @staticmethod
    def send_reset_password_email(to_email: str, reset_link: str):
        subject = "DocIQ - Password Reset"

        body = f"""
Hello,

We received a request to reset your DocIQ account password.

Click the link below to reset your password:

{reset_link}

This link will expire in 15 minutes.

If you did not request a password reset, please ignore this email.

Regards,
DocIQ Team
"""

        SMTPService.send_email(
            to_email=to_email,
            subject=subject,
            body=body
        )

    @staticmethod
    def send_otp_email(to_email: str, otp: str):

        subject = "DocIQ - Password Reset OTP"

        body = f"""
Hello,

Your OTP for resetting your password is:

{otp}

This OTP is valid for 5 minutes.

If you didn't request this, please ignore this email.

Regards,
DocIQ Team
"""

        SMTPService.send_email(
            to_email=to_email,
            subject=subject,
            body=body
        )