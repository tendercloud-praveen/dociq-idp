from pathlib import Path
from typing import List

from fastapi import APIRouter, UploadFile, File, Depends
from sqlalchemy.orm import Session

from app.graph.workflow import graph
from app.database.database import get_db
from app.database.jwt import get_current_user
from app.repository.document_repository import DocumentRepository
from app.repository.audit_logs import AuditRepository
from app.repository.users import get_user_by_email
from app.services.notification_service import NotificationService

router = APIRouter(
    prefix="/documents",
    tags=["Documents"]
)

UPLOAD_DIR = Path("app/uploads")
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)


@router.post("/upload")
async def upload_document(
    files: List[UploadFile] = File(...),
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):

    repo = DocumentRepository(db)

    approved_documents = []
    pending_documents = []

    summary = {}
    documents = {}

    user_id = int(current_user["id"])

    for file in files:

        # Save uploaded file
        file_path = UPLOAD_DIR / file.filename

        with open(file_path, "wb") as f:
            f.write(await file.read())

        # Run LangGraph
        result = graph.invoke({
            "file_name": file.filename,
            "file_path": str(file_path)
        })

        # Save document
        saved_doc = repo.save(result, user_id)
        user = get_user_by_email(
        db=db,
        email=current_user["email"]
    )

        # ==========================
        # Audit Logs
        # ==========================

        AuditRepository.create_log(
            db=db,
            document_id=saved_doc.id,
            action="Document Uploaded",
           performed_by=user.full_name
        )

        AuditRepository.create_log(
            db=db,
            document_id=saved_doc.id,
            action="Preprocessing Completed",
            performed_by="AI"
        )

        AuditRepository.create_log(
            db=db,
            document_id=saved_doc.id,
            action="OCR Completed",
            performed_by="AI"
        )

        AuditRepository.create_log(
            db=db,
            document_id=saved_doc.id,
            action="Document Classified",
            performed_by="LLM"
        )

        AuditRepository.create_log(
            db=db,
            document_id=saved_doc.id,
            action="Data Extracted",
            performed_by="LLM"
        )

        AuditRepository.create_log(
            db=db,
            document_id=saved_doc.id,
            action="Validation Completed",
            performed_by="AI"
        )

        if result["status"] == "Approved":

            AuditRepository.create_log(
                db=db,
                document_id=saved_doc.id,
                action="Approved",
                performed_by="System"
            )

            approved_documents.append(file.filename)

        else:

            AuditRepository.create_log(
                db=db,
                document_id=saved_doc.id,
                action="Pending Review",
                performed_by="System"
            )

            pending_documents.append(file.filename)

        # Summary
        document_type = result.get("document_type", "Unknown")

        summary[document_type] = summary.get(document_type, 0) + 1

        if document_type not in documents:
            documents[document_type] = []

        documents[document_type].append({
            "id": saved_doc.id,
            "file_name": file.filename,
            "confidence": result.get("confidence"),
            "summary": result.get("summary"),
            "fields": result.get("extracted_data")
        })

    # Get logged-in user details
    user = get_user_by_email(
        db=db,
        email=current_user["email"]
    )

    # Send AI processing summary email
    NotificationService.send_ai_processing_summary(
        user_name=user.full_name,
        user_email=user.email,
        approved_documents=approved_documents,
        pending_documents=pending_documents
    )

    return {
        "message": f"{len(files)} document(s) processed successfully",
        "logged_in_user": current_user["email"],
        "summary": summary,
        "documents": documents
    }