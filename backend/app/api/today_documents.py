from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.database.jwt import get_current_user
from app.services.today_documents import TodayDocumentsService

router = APIRouter(
    prefix="/documents/today",
    tags=["Today Documents"]
)


@router.get("/")
def get_today_documents(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return TodayDocumentsService.get_today_documents(
        db,
        int(current_user["id"])
    )


@router.get("/approved")
def get_today_approved_documents(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return TodayDocumentsService.get_today_approved_documents(
        db,
        int(current_user["id"])
    )


@router.get("/pending")
def get_today_pending_documents(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return TodayDocumentsService.get_today_pending_documents(
        db,
        int(current_user["id"])
    )


@router.get("/rejected")
def get_today_rejected_documents(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return TodayDocumentsService.get_today_rejected_documents(
        db,
        int(current_user["id"])
    )