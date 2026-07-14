from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.models.documet import Document
from app.schema.updates import UpdateDocumentRequest
from app.database.jwt import get_current_user



router = APIRouter(
    prefix="/pending",
    tags=["Human Verification"]
)


@router.patch("/update/{document_id}")
def reject_document(
    document_id: int,
    request:UpdateDocumentRequest,
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    document = (
        db.query(Document)
        .filter(Document.id == document_id)
        .first()
    )

    if document is None:
        raise HTTPException(
            status_code=404,
            detail="Document not found"
        )

    # document.document_type = request.document_type
    # document.summary = request.summary
    # document.confidence = request.confidence

    if document.extracted_data is None:
        document.extracted_data = request.extracted_data
    updated_data = document.extracted_data.copy()
    updated_data.update(request.extracted_data)
    document.extracted_data = updated_data

 





    document.status = "Pending"

    db.commit()
    db.refresh(document)
    

    return {
        "message": "Document updated successfully",
        "document": document
    }