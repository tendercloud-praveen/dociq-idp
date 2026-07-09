from app.repository.today_documents import TodayDocumentsRepository


class TodayDocumentsService:

    @staticmethod
    def get_today_documents(db, user_id):

        repo = TodayDocumentsRepository(db)

        return repo.get_today_documents(user_id)

    @staticmethod
    def get_today_approved_documents(db, user_id):

        repo = TodayDocumentsRepository(db)

        return repo.get_today_approved_documents(user_id)

    @staticmethod
    def get_today_pending_documents(db, user_id):

        repo = TodayDocumentsRepository(db)

        return repo.get_today_pending_documents(user_id)

    @staticmethod
    def get_today_rejected_documents(db, user_id):

        repo = TodayDocumentsRepository(db)

        return repo.get_today_rejected_documents(user_id)