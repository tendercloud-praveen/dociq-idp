from sqlalchemy import Column, Integer, String, DateTime
from app.database.database import Base
from sqlalchemy.orm import relationship

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    full_name = Column(String(100), nullable=False)

    company_name = Column(String(100), nullable=False)

    email = Column(String(100), unique=True, nullable=False)
  

    mobile_number = Column(String(20), unique=True, nullable=False)

    role = Column(String(50), nullable=False)

    password = Column(String(255), nullable=False)

    reset_token = Column(String(255), nullable=True)
    
    reset_token_expiry = Column(DateTime, nullable=True)

    otp = Column(String(6), nullable=True)

    otp_expiry = Column(DateTime, nullable=True)

    documents = relationship("Document", back_populates="user")