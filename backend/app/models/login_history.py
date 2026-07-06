from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.sql import func
from app.database.database import Base


class LoginHistory(Base):
    __tablename__ = "login_history"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    login_method = Column(String(20), nullable=False)
    # email or mobile

    ip_address = Column(String(100), nullable=True)

    device = Column(String(200), nullable=True)

    login_time = Column(DateTime(timezone=True), server_default=func.now())