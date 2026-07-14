from datetime import datetime, date

from collections import defaultdict

from sqlalchemy import extract, func

from app.models.documet import Document
from app.models.audit_logs import AuditLog


class ReportRepository:

    @staticmethod
    def get_document_report(db, user_id, period):

        period = period.lower().strip()

        query = db.query(Document).filter(
            Document.user_id == user_id
        )

        # TODAY
        if period == "today":
            query = query.filter(
                func.date(Document.created_at) == date.today()
            )

        # MONTHLY
        elif period == "monthly":
            today = datetime.now()

            query = query.filter(
                extract("year", Document.created_at) == today.year,
                extract("month", Document.created_at) == today.month
            )

        # ALL
        elif period == "all":
            pass

        documents = query.order_by(Document.created_at.desc()).all()

        total_documents = len(documents)

        approved = sum(1 for doc in documents if doc.status == "Approved")
        rejected = sum(1 for doc in documents if doc.status == "Rejected")
        pending = sum(1 for doc in documents if doc.status == "Pending")

        processed = approved + rejected

        stp_rate = (
            f"{approved / total_documents * 100:.2f}%"
            if total_documents else "0%"
        )

        exception_rate = (
            f"{rejected / total_documents * 100:.2f}%"
            if total_documents else "0%"
        )

        report_information = {
            "report_period": period.capitalize(),
            "generated_date": datetime.now().strftime("%d-%m-%Y"),
            "generated_time": datetime.now().strftime("%I:%M %p")
        }
        processing_times = []
        avg_processing_time = "0 min"
        for doc in documents:
            if doc.updated_at and doc.created_at:
                processing_time = (
                    doc.updated_at - doc.created_at
                ).total_seconds()
                processing_times.append(processing_time)
            if processing_times:
                avg_processing_time = sum(processing_times) / len(processing_times)
                avg_processing_time = f"{avg_processing_time / 60:.2f} min"
            else:
                avg_processing_time = "0 min"
        cost_per_document = 100
        cost_savings = f"₹{processed * cost_per_document}"

 
            
        
   



   

            
    



        


       
    
  

        summary = {
            "total_documents": total_documents,
            "processed": processed,
            "approved": approved,
            "rejected": rejected,
            "pending": pending,
            "stp_rate": stp_rate,
            "exception_rate": exception_rate,
            "average_processing_time":avg_processing_time ,
            "cost_savings": f"₹{cost_savings}"
        }

        document_details = []

        for doc in documents:
            document_details.append({
                "file_name": doc.file_name,
                "document_type": doc.document_type,
                "status": doc.status,
                "confidence": f"{doc.confidence:.0f}%",
                "uploaded_time": doc.created_at,
                "completed_time": doc.updated_at,
                "approved_by": doc.approved_by
            })

        return {
            "report_information": report_information,
            "summary": summary,
            "document_details": document_details
        }

    @staticmethod
    def get_audit_report(db, user_id, period):

        period = period.lower().strip()

        query = (
            db.query(AuditLog, Document)
            .join(Document, AuditLog.document_id == Document.id)
            .filter(Document.user_id == user_id)
        )

        # TODAY
        if period == "today":
            query = query.filter(
                func.date(AuditLog.created_at) == date.today()
            )

        # MONTHLY
        elif period == "monthly":
            today = datetime.now()

            query = query.filter(
                extract("year", AuditLog.created_at) == today.year,
                extract("month", AuditLog.created_at) == today.month
            )

        # ALL
        elif period == "all":
            pass

        audit_results = query.order_by(
            AuditLog.created_at.desc()
        ).all()

        grouped_logs = defaultdict(lambda: {
            "file_name": "",
            "document_type": "",
            "status": "",
            "audit_logs": []
        })

        for log, document in audit_results:

            grouped_logs[document.id]["file_name"] = document.file_name
            grouped_logs[document.id]["document_type"] = document.document_type
            grouped_logs[document.id]["status"] = document.status

            grouped_logs[document.id]["audit_logs"].append({
                "action": log.action,
                "performed_by": log.performed_by,
                "action_time": log.created_at
            })

        return {
            "report_information": {
                "report_period": period.capitalize(),
                "generated_date": datetime.now().strftime("%d-%m-%Y"),
                "generated_time": datetime.now().strftime("%I:%M %p")
            },
            "audit_details": list(grouped_logs.values())
        }