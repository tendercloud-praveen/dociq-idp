from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.database.jwt import get_current_user
from app.services.dashboard import get_dashboard_summary

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)

@router.get("/summary")
def dashboard_summary(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_dashboard_summary(
        db,
        int(current_user["id"]),
  

     
    )
    