from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.services.reports import ReportService
from app.schema.reports import (
    Period,
    ReportType,
    ReportFormat
)
from app.database.jwt import get_current_user

router = APIRouter(
    prefix="/reports",
    tags=["Reports"]
)


@router.get("/export")
def export_report(
    period: Period,
    report_type: ReportType,
    file_format: ReportFormat,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return ReportService.export_report(
    db=db,
    user_id=current_user["id"],
    period=period.value,
    report_type=report_type.value,
    file_format=file_format.value,
)