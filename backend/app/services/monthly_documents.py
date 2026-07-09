from app.repository.monthly_documents import MonthlyDocumentsRepository


class MonthlyDocumentsService:

    @staticmethod
    def get_monthly_documents(db, user_id):

        repo = MonthlyDocumentsRepository(db)

        return repo.get_monthly_documents(user_id)

    @staticmethod
    def get_monthly_approved_documents(db, user_id):

        repo = MonthlyDocumentsRepository(db)

        return repo.get_monthly_approved_documents(user_id)

    @staticmethod
    def get_monthly_pending_documents(db, user_id):

        repo = MonthlyDocumentsRepository(db)

        return repo.get_monthly_pending_documents(user_id)

    @staticmethod
    def get_monthly_rejected_documents(db, user_id):

        repo = MonthlyDocumentsRepository(db)

        return repo.get_monthly_rejected_documents(user_id)