from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.database.database import Base
class AuditLog(Base):

    __tablename__ = "audit_logs"

    id = Column(Integer, primary_key=True)

    document_id = Column(
        Integer,
        ForeignKey("documents.id")
    )

    action = Column(String)

    performed_by = Column(String)

    created_at = Column(
        DateTime,
        server_default=func.now()
    )
    document = relationship(
        "Document",
        back_populates="audit_logs"
    )