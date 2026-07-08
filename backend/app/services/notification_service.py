from app.services.smtp_service import SMTPService


class NotificationService:

    @staticmethod
    def send_ai_processing_summary(
        user_email: str,
        approved_documents: list,
        pending_documents: list
    ):

        subject = "DocIQ - AI Processing Completed"

        body = f"""
Hello,

Your AI document processing has been completed.

Total Documents : {len(approved_documents) + len(pending_documents)}

====================================

✅ Approved by AI ({len(approved_documents)})

"""

        for document in approved_documents:
            body += f"• {document}\n"

        body += f"""

====================================

⏳ Pending Human Review ({len(pending_documents)})

"""

        for document in pending_documents:
            body += f"• {document}\n"

        body += """

====================================

You will receive another email after the human review is completed.

Thank you,
DocIQ Team
"""

        SMTPService.send_email(
            to_email=user_email,
            subject=subject,
            body=body
        )

    @staticmethod
    def send_human_review_summary(
        user_email: str,
        approved_documents: list,
        rejected_documents: list,
        pending_documents: list
    ):

        approved_count = len(approved_documents)
        rejected_count = len(rejected_documents)
        pending_count = len(pending_documents)
        total_documents = approved_count + rejected_count + pending_count

        subject = "DocIQ - Human Review Update"

        body = f"""
Hello,

Your document review has been updated.

Total Documents : {total_documents}

====================================

✅ Approved ({approved_count})

"""

        for document in approved_documents:
            body += f"• {document}\n"

        body += f"""

====================================

❌ Rejected ({rejected_count})

"""

        for document in rejected_documents:
            body += f"• {document}\n"

        body += f"""

====================================

⏳ Pending Human Review ({pending_count})

"""

        for document in pending_documents:
            body += f"• {document}\n"

        body += """

====================================

Thank you,
DocIQ Team
"""

        SMTPService.send_email(
            to_email=user_email,
            subject=subject,
            body=body
        )