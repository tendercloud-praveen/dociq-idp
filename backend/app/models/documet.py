from sqlalchemy import Column, Integer, String, Float, Text, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql import JSON
from sqlalchemy.sql import func

from app.database.database import Base
from sqlalchemy.orm import relationship
from app.models.audit_logs import AuditLog
# from app.repository.audit_logs import AuditRepository


class Document(Base):
    __tablename__ = "documents"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    file_name = Column(String)
    file_path = Column(String)

    raw_text = Column(Text)

    document_type = Column(String)
    confidence = Column(Float)

    summary = Column(Text)
    extracted_data = Column(JSON)

    status = Column(String, default="Pending")

    approved_by = Column(String, nullable=True)
    approved_date = Column(DateTime, nullable=True)

    created_at = Column(DateTime, server_default=func.now())

    updated_at = Column(
        DateTime,
        server_default=func.now(),
        onupdate=func.now()
    )

    user = relationship("User", back_populates="documents")
    audit_logs = relationship(
    "AuditLog",
    back_populates="document"
)