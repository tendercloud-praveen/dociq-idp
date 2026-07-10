from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.database.jwt import get_current_user
from app.repository.audit_logs import AuditRepository

router = APIRouter(
    prefix="/audit",
    tags=["Audit Trail"]
)


@router.get("/{document_id}")
def get_document_audit(
    document_id: int,
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    records = AuditRepository.get_document_audit(
        db,
        document_id,
        current_user["id"]
    )

    if not records:
        raise HTTPException(
            status_code=404,
            detail="Document not found"
        )

    document = records[0][0]

    audit_trail = []

    for index, (_, audit) in enumerate(records, start=1):

        audit_trail.append({
            "step": index,
            "action": audit.action,
            "performed_by": audit.performed_by,
            "time": audit.created_at
        })

    return {
        "document_id": document.id,
    "file_name": document.file_name,
    "document_type": document.document_type,
    "audit_trail": audit_trail
    }