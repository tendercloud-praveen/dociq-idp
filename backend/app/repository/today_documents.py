from datetime import date

from sqlalchemy import func

from app.models.documet import Document


class TodayDocumentsRepository:

    def __init__(self, db):
        self.db = db

    def get_today_documents(self, user_id):

        today = date.today()

        return (
            self.db.query(Document)
            .filter(
                Document.user_id == user_id,
                func.date(Document.created_at) == today
            )
            .all()
        )

    def get_today_approved_documents(self, user_id):

        today = date.today()

        return (
            self.db.query(Document)
            .filter(
                Document.user_id == user_id,
                Document.status == "Approved",
                func.date(Document.created_at) == today
            )
            .all()
        )

    def get_today_pending_documents(self, user_id):

        today = date.today()

        return (
            self.db.query(Document)
            .filter(
                Document.user_id == user_id,
                Document.status == "Pending",
                func.date(Document.created_at) == today
            )
            .all()
        )

    def get_today_rejected_documents(self, user_id):

        today = date.today()

        return (
            self.db.query(Document)
            .filter(
                Document.user_id == user_id,
                Document.status == "Rejected",
                func.date(Document.created_at) == today
            )
            .all()
        )