from app.repository.dashboard import DashboardRepository

def get_dashboard_summary(db, user_id):

    repo = DashboardRepository(db)

    return repo.get_summary(user_id)