from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.database.jwt import get_current_user
from app.services.monthly_documents import MonthlyDocumentsService

router = APIRouter(
    prefix="/documents/monthly",
    tags=["Monthly Documents"]
)


@router.get("/")
def get_monthly_documents(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return MonthlyDocumentsService.get_monthly_documents(
        db,
        int(current_user["id"])
    )


@router.get("/approved")
def get_monthly_approved_documents(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return MonthlyDocumentsService.get_monthly_approved_documents(
        db,
        int(current_user["id"])
    )


@router.get("/pending")
def get_monthly_pending_documents(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return MonthlyDocumentsService.get_monthly_pending_documents(
        db,
        int(current_user["id"])
    )


@router.get("/rejected")
def get_monthly_rejected_documents(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return MonthlyDocumentsService.get_monthly_rejected_documents(
        db,
        int(current_user["id"])
    )