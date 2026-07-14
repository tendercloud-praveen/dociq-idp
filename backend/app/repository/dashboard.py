from datetime import date

from sqlalchemy import func

from app.models.documet import Document


class DashboardRepository:

    def __init__(self, db):
        self.db = db

    def calculate_metrics(self, total, approved, pending, rejected, documents):

        processed = approved + rejected

        stp_rate = round((approved / total) * 100, 2) if total else 0
        exception_rate = round((rejected / total) * 100, 2) if total else 0

        # Average Processing Time
        processing_times = []

        for doc in documents:
            if doc.created_at and doc.updated_at:
                processing_time = (
                    doc.updated_at - doc.created_at
                ).total_seconds()
                processing_times.append(processing_time)

        if processing_times:
            avg_seconds = sum(processing_times) / len(processing_times)
            avg_processing_time = f"{avg_seconds / 60:.2f} min"
        else:
            avg_processing_time = "0 min"

        # Cost Savings
        cost_per_document = 100
        cost_savings = f"₹{processed * cost_per_document}"

        return {
            "stp_rate": f"{stp_rate}%",
            "exception_rate": f"{exception_rate}%",
            "average_processing_time": avg_processing_time,
            "cost_savings": cost_savings
        }

    def get_summary(self, user_id):

        # ================= Overall =================

        total = self.db.query(Document).filter(
            Document.user_id == user_id
        ).count()

        approved = self.db.query(Document).filter(
            Document.user_id == user_id,
            Document.status == "Approved"
        ).count()

        pending = self.db.query(Document).filter(
            Document.user_id == user_id,
            Document.status == "Pending"
        ).count()

        rejected = self.db.query(Document).filter(
            Document.user_id == user_id,
            Document.status == "Rejected"
        ).count()

        overall_documents = self.db.query(Document).filter(
            Document.user_id == user_id
        ).all()

        # ================= Today =================

        today = date.today()

        today_total = self.db.query(Document).filter(
            Document.user_id == user_id,
            func.date(Document.created_at) == today
        ).count()

        today_approved = self.db.query(Document).filter(
            Document.user_id == user_id,
            Document.status == "Approved",
            func.date(Document.created_at) == today
        ).count()

        today_pending = self.db.query(Document).filter(
            Document.user_id == user_id,
            Document.status == "Pending",
            func.date(Document.created_at) == today
        ).count()

        today_rejected = self.db.query(Document).filter(
            Document.user_id == user_id,
            Document.status == "Rejected",
            func.date(Document.created_at) == today
        ).count()

        today_documents = self.db.query(Document).filter(
            Document.user_id == user_id,
            func.date(Document.created_at) == today
        ).all()

        # ================= Monthly =================

        month = today.month
        year = today.year

        monthly_total = self.db.query(Document).filter(
            Document.user_id == user_id,
            func.extract("month", Document.created_at) == month,
            func.extract("year", Document.created_at) == year
        ).count()

        monthly_approved = self.db.query(Document).filter(
            Document.user_id == user_id,
            Document.status == "Approved",
            func.extract("month", Document.created_at) == month,
            func.extract("year", Document.created_at) == year
        ).count()

        monthly_pending = self.db.query(Document).filter(
            Document.user_id == user_id,
            Document.status == "Pending",
            func.extract("month", Document.created_at) == month,
            func.extract("year", Document.created_at) == year
        ).count()

        monthly_rejected = self.db.query(Document).filter(
            Document.user_id == user_id,
            Document.status == "Rejected",
            func.extract("month", Document.created_at) == month,
            func.extract("year", Document.created_at) == year
        ).count()

        monthly_documents = self.db.query(Document).filter(
            Document.user_id == user_id,
            func.extract("month", Document.created_at) == month,
            func.extract("year", Document.created_at) == year
        ).all()

        # ================= Metrics =================

        overall_metrics = self.calculate_metrics(
            total,
            approved,
            pending,
            rejected,
            overall_documents
        )

        today_metrics = self.calculate_metrics(
            today_total,
            today_approved,
            today_pending,
            today_rejected,
            today_documents
        )

        monthly_metrics = self.calculate_metrics(
            monthly_total,
            monthly_approved,
            monthly_pending,
            monthly_rejected,
            monthly_documents
        )

        # ================= Response =================

        return {
            "overall": {
                "total": total,
                "approved": approved,
                "pending": pending,
                "rejected": rejected,
                **overall_metrics
            },
            "today": {
                "total": today_total,
                "approved": today_approved,
                "pending": today_pending,
                "rejected": today_rejected,
                **today_metrics
            },
            "monthly": {
                "total": monthly_total,
                "approved": monthly_approved,
                "pending": monthly_pending,
                "rejected": monthly_rejected,
                **monthly_metrics
            }
        }