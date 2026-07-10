from app.models.documet import Document
from app.models.audit_logs import AuditLog


class AuditRepository:

    @staticmethod
    def create_log(
        db,
        document_id,
        action,
        performed_by
    ):

        log = AuditLog(
            document_id=document_id,
            action=action,
            performed_by=performed_by
        )

        db.add(log)
        db.commit()

        return log

    @staticmethod
    def get_document_audit(
        db,
        document_id,
        user_id
    ):

        return (
            db.query(Document, AuditLog)
            .join(
                AuditLog,
                Document.id == AuditLog.document_id
            )
            .filter(
                Document.id == document_id,
                Document.user_id == user_id
            )
            .order_by(AuditLog.created_at)
            .all()
        )