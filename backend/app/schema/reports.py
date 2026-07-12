from enum import Enum
from datetime import datetime
from typing import List, Optional

from pydantic import BaseModel


class Period(str, Enum):
    today = "today"
    monthly = "monthly"
    all = "all"


class ReportType(str, Enum):
    document = "document"
    audit = "audit"


class ReportFormat(str, Enum):
    pdf = "pdf"
    excel = "excel"

   


class ReportInformation(BaseModel):
    report_period: str
    generated_date: str
    generated_time: str


class ReportSummary(BaseModel):
    total_documents: int
    processed: int
    approved: int
    rejected: int
    pending: int
    stp_rate: str
    exception_rate: str
    average_processing_time: str
    cost_savings: str


class DocumentDetail(BaseModel):
    file_name: str
    document_type: str
    status: str
    confidence: str
    uploaded_time: Optional[datetime]
    completed_time: Optional[datetime]


class DocumentReportResponse(BaseModel):
    report_information: ReportInformation
    summary: ReportSummary
    document_details: List[DocumentDetail]