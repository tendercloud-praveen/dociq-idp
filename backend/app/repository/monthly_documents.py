from datetime import date

from sqlalchemy import func

from app.models.documet import Document


class MonthlyDocumentsRepository:

    def __init__(self, db):
        self.db = db

    def get_monthly_documents(self, user_id):

        today = date.today()

        month = today.month
        year = today.year

        return (
            self.db.query(Document)
            .filter(
                Document.user_id == user_id,
                func.extract("month", Document.created_at) == month,
                func.extract("year", Document.created_at) == year
            )
            .all()
        )

    def get_monthly_approved_documents(self, user_id):

        today = date.today()

        month = today.month
        year = today.year

        return (
            self.db.query(Document)
            .filter(
                Document.user_id == user_id,
                Document.status == "Approved",
                func.extract("month", Document.created_at) == month,
                func.extract("year", Document.created_at) == year
            )
            .all()
        )

    def get_monthly_pending_documents(self, user_id):

        today = date.today()

        month = today.month
        year = today.year

        return (
            self.db.query(Document)
            .filter(
                Document.user_id == user_id,
                Document.status == "Pending",
                func.extract("month", Document.created_at) == month,
                func.extract("year", Document.created_at) == year
            )
            .all()
        )

    def get_monthly_rejected_documents(self, user_id):

        today = date.today()

        month = today.month
        year = today.year

        return (
            self.db.query(Document)
            .filter(
                Document.user_id == user_id,
                Document.status == "Rejected",
                func.extract("month", Document.created_at) == month,
                func.extract("year", Document.created_at) == year
            )
            .all()
        )