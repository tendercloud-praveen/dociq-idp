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