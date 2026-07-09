from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database.database import Base, engine

from app.api.documents import router as document_router
from app.api.approval import router as approval_router
from app.api.update import router as update_router
from app.api.users import router as user_router
from app.api.login import router as login_router
from app.api.email_test import router as email_router
from app.api.dashboard import router as dashboard_router
from app.api.monthly_documents import router as monthly_documents_router
from app.api.today_documents import router as today_documents_router




Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Document AI Backend"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(document_router)
app.include_router(approval_router)
app.include_router(update_router)
app.include_router(user_router)
app.include_router(login_router)
app.include_router(email_router)
app.include_router(dashboard_router)
app.include_router(monthly_documents_router)
app.include_router(today_documents_router)

@app.get("/")
async def root():
    return {
        "message": "Document AI Backend is running!"
    }