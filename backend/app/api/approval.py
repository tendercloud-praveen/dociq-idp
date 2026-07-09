from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy.orm import relationship

from app.database.database import get_db
from app.models.documet import Document
from app.services.notification_service import NotificationService
from app.database.jwt import get_current_user
from app.models.users import User

router = APIRouter(
    prefix="/documents",
    tags=["Human Verification"]
)

def get_logged_in_user(
    current_user: User = Depends(get_current_user)
):
    return current_user

@router.get("/total")
def get_all_documents(
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    user_id = int(current_user["id"])


    

    documents = db.query(Document).filter(
        Document.user_id == user_id
    ).all()

    return {
        "count": len(documents),
        "documents": documents
    }
# ===========================
# Get All Pending Documents
# ===========================

@router.get("/total/pending")
def get_pending_documents(
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    user_id = int(current_user["id"])

    documents = (
        db.query(Document)
        .filter(
            Document.status == "Pending",
            Document.user_id == user_id
        )
        .all()
    )

    return {
        "count": len(documents),
        "documents": documents
    }
@router.get("/total/rejected")
def get_rejected_documents(
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    user_id = int(current_user["id"])

    documents = (
        db.query(Document)
        .filter(
            Document.status == "Rejected",
            Document.user_id == user_id
        )
        .all()
    )

    return {
        "count": len(documents),
        "documents": documents
    }
@router.get("/total/approved")
def get_approved_documents(
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    user_id = int(current_user["id"])

    documents = (
        db.query(Document)
        .filter(
            Document.status == "Approved",
            Document.user_id == user_id
        )
        .all()
    )

    return {
        "count": len(documents),
        "documents": documents
    }


@router.put("/approve/{document_id}")
def approve_document(
    document_id: int,
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    document = (
        db.query(Document)
        .filter(
            Document.id == document_id,
            Document.user_id == int(current_user["id"])
        )
        .first()
    )

    if document is None:
        raise HTTPException(
            status_code=404,
            detail="Document not found for this user"
        )

    document.status = "Approved"
    document.approved_by = current_user["email"]
    document.approved_date = datetime.now()

    db.commit()
    db.refresh(document)

    return {
        "message": "Document Approved Successfully",
        "document": document
    }
@router.put("/reject/{document_id}")
def reject_document(
    document_id: int,
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    document = (
        db.query(Document)
        .filter(
            Document.id == document_id,
            Document.user_id == int(current_user["id"])
        )
        .first()
    )

    if document is None:
        raise HTTPException(
            status_code=404,
            detail="Document not found for this user"
        )

    document.status = "Rejected"
    document.approved_by = current_user["email"]
    document.approved_date = datetime.now()

    db.commit()
    db.refresh(document)

    return {
        "message": "Document Rejected Successfully",
        "document": document
    }
# ===========================
# Get Single Document
# ===========================
@router.get("/{document_id}")
def reject_document(
    document_id: int,
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db)
):

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
# @router.put("/approve/{document_id}")
# def approve_document(document_id: int, db: Session = Depends(get_db)):

#     document = (
#     db.query(Document)
#     .filter(
#         Document.id == document_id,
#         Document.user_id == current_user.id
#     )
#     .first()
# )

#     if not document:
#         raise HTTPException(
#             status_code=404,
#             detail="Document not found"
#         )

#     document.status = "Approved"
#     document.approved_by = "Admin"
#     document.approved_date = datetime.now()

#     db.commit()
#     db.refresh(document)

#     approved_documents = (
#         db.query(Document)
#         .filter(Document.status == "Approved")
#         .all()
#     )

#     rejected_documents = (
#         db.query(Document)
#         .filter(Document.status == "Rejected")
#         .all()
#     )

#     documents = (
#     db.query(Document)
#     .filter(
#         Document.user_id == current_user.id,
#         Document.status == "Pending"
#     )
#     .all()
# )

#     NotificationService.send_human_review_summary(
#         user_email="pravalyabukkala@gmail.com",
#         approved_documents=[doc.file_name for doc in approved_documents],
#         rejected_documents=[doc.file_name for doc in rejected_documents],
#         pending_documents=[doc.file_name for doc in pending_documents]
#     )

#     return {
#         "message": "Document Approved Successfully",
#         "document": document
#     }


# ===========================
# Reject Document
# ===========================
# @router.put("/reject/{document_id}")
# def reject_document(document_id: int, db: Session = Depends(get_db)):

#     document = (
#         db.query(Document)
#         .filter(
#             Document.id == document_id,
#             Document.user_id == current_user.id
#         )
#         .first()
#     )

#     if not document:
#         raise HTTPException(
#             status_code=404,
#             detail="Document not found"
#         )

#     document.status = "Rejected"
#     document.approved_by = "Admin"
#     document.approved_date = datetime.now()

#     db.commit()
#     db.refresh(document)

#     documents = (
#     db.query(Document)
#     .filter(
#         Document.user_id == current_user.id,
#         Document.status == "Approved"
#     )
#     .all()
# )

#     documents = (
#     db.query(Document)
#     .filter(
#         Document.user_id == current_user.id,
#         Document.status == "Rejected"
#     )
#     .all()
# )

#     documents = (
#     db.query(Document)
#     .filter(
#         Document.user_id == current_user.id,
#         Document.status == "Pending"
#     )
#     .all()
# )

#     NotificationService.send_human_review_summary(
#         user_email="pravalyabukkala@gmail.com",
#         approved_documents=[doc.file_name for doc in approved_documents],
#         rejected_documents=[doc.file_name for doc in rejected_documents],
#         pending_documents=[doc.file_name for doc in pending_documents]
#     )

#     return {
#         "message": "Document Rejected Successfully",
#         "document": document
#     }

 