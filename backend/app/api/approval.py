from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.models.documet import Document

router = APIRouter(
    prefix="/documents",
    tags=["Human Verification"]
)


@router.get("/all")
def get_all_documents(db: Session = Depends(get_db)):

    documents = db.query(Document).all()

    return {
        "count": len(documents),
        "documents": documents
    }
# ===========================
# Get All Pending Documents
# ===========================
@router.get("/pending")
def get_pending_documents(db: Session = Depends(get_db)):

    documents = (
        db.query(Document)
        .filter(Document.status == "Pending")
        .all()
    )

    return {
        "count": len(documents),
        "documents": documents
    }

@router.get("/approved")
def get_approved_documents(db: Session = Depends(get_db)):

    documents = (
        db.query(Document)
        .filter(Document.status == "Approved")
        .all()
    )

    return {
        "count": len(documents),
        "documents": documents
    }
@router.get("/rejected")
def get_rejected_documents(db: Session = Depends(get_db)):

    documents = (
        db.query(Document)
        .filter(Document.status == "Rejected")
        .all()
    )

    return {
        "count": len(documents),
        "documents": documents
    }

# ===========================
# Get Single Document
# ===========================
@router.get("/{document_id}")
def get_document(document_id: int, db: Session = Depends(get_db)):

    document = (
        db.query(Document)
        .filter(Document.id == document_id)
        .first()
    )

    if not document:
        raise HTTPException(
            status_code=404,
            detail="Document not found"
        )

    return document


# ===========================
# Approve Document
# ===========================
@router.put("/approve/{document_id}")
def approve_document(document_id: int, db: Session = Depends(get_db)):

    document = (
        db.query(Document)
        .filter(Document.id == document_id)
        .first()
    )

    if not document:
        raise HTTPException(
            status_code=404,
            detail="Document not found"
        )

    document.status = "Approved"
    document.approved_by = "Admin"
    document.approved_date = datetime.now()

    db.commit()
    db.refresh(document)

    return {
        "message": "Document Approved Successfully",
        "document": document
    }


# ===========================
# Reject Document
# ===========================
@router.put("/reject/{document_id}")
def reject_document(document_id: int, db: Session = Depends(get_db)):

    document = (
        db.query(Document)
        .filter(Document.id == document_id)
        .first()
    )

    if not document:
        raise HTTPException(
            status_code=404,
            detail="Document not found"
        )

    document.status = "Rejected"

    db.commit()
    db.refresh(document)

    return {
        "message": "Document Rejected Successfully",
        "document": document
    }

 