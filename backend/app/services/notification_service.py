from app.services.smtp_service import SMTPService


class NotificationService:

    @staticmethod
    def send_ai_processing_summary(
        user_name: str,
        user_email: str,
        approved_documents: list,
        pending_documents: list
    ):

        approved_count = len(approved_documents)
        pending_count = len(pending_documents)
        total_documents = approved_count + pending_count

        subject = "DocIQ - Document Processing Status"

        body = f"""
Dear {user_name},

The AI processing of your uploaded documents has been completed successfully.

Processing Summary
────────────────────────────────────

Total Documents: {total_documents}

AI Approved ({approved_count})

"""

        for document in approved_documents:
            body += f"✔ {document}\n"

        body += f"""

────────────────────────────────────

Pending Human Review ({pending_count})

"""

        for document in pending_documents:
            body += f"⏳ {document}\n"

        body += """

────────────────────────────────────

The documents pending human review are awaiting manual verification. Once the review is completed, you will receive another email with the final processing status.

Thank you for choosing DocIQ.

Regards,
DocIQ Team
"""

        SMTPService.send_email(
            to_email=user_email,
            subject=subject,
            body=body
        )

    @staticmethod
    def send_human_review_summary(
        user_name: str,
        user_email: str,
        approved_documents: list,
        rejected_documents: list,
        pending_documents: list
    ):

        approved_count = len(approved_documents)
        rejected_count = len(rejected_documents)
        pending_count = len(pending_documents)
        total_documents = approved_count + rejected_count + pending_count

        subject = "DocIQ - Human Review Status"

        body = f"""
Dear {user_name},

The human review of your uploaded documents has been completed.

Processing Summary
────────────────────────────────────

Total Documents: {total_documents}

Approved ({approved_count})

"""

        for document in approved_documents:
            body += f"✔ {document}\n"

        body += f"""

────────────────────────────────────

Rejected ({rejected_count})

"""

        for document in rejected_documents:
            body += f"❌ {document}\n"

        body += f"""

────────────────────────────────────

Pending Human Review ({pending_count})

"""

        for document in pending_documents:
            body += f"⏳ {document}\n"

        body += """

────────────────────────────────────

Thank you for choosing DocIQ.

Regards,
DocIQ Team
"""

        SMTPService.send_email(
            to_email=user_email,
            subject=subject,
            body=body
        )