from pathlib import Path
from typing import List

from fastapi import APIRouter, UploadFile, File, Depends
from sqlalchemy.orm import Session

from app.graph.workflow import graph
from app.database.database import get_db
from app.database.jwt import get_current_user
from app.repository.document_repository import DocumentRepository
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

    for file in files:

        file_path = UPLOAD_DIR / file.filename

        with open(file_path, "wb") as f:
            f.write(await file.read())

        result = graph.invoke({
            "file_name": file.filename,
            "file_path": str(file_path)
        })

        saved_doc = repo.save(result)

        if result["status"] == "Approved":
            approved_documents.append(file.filename)
        else:
            pending_documents.append(file.filename)

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

    NotificationService.send_ai_processing_summary(
        user_email=current_user["email"],
        approved_documents=approved_documents,
        pending_documents=pending_documents
    )

    return {
        "message": f"{len(files)} document(s) processed successfully",
        "logged_in_user": current_user["email"],
        "summary": summary,
        "documents": documents
    }