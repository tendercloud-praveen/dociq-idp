from fastapi.responses import FileResponse

from app.repository.reports import ReportRepository
from app.database.pdf_generator import generate_pdf
from app.database.excel_generator import generate_excel


class ReportService:

    @staticmethod
    def export_report(
        db,
        period,
        report_type,
        user_id,
        file_format
    ):

        # Get Report Data
        if report_type == "document":

            report_data = ReportRepository.get_document_report(
                db=db,
                user_id=user_id,
                period=period
            )

        elif report_type == "audit":

            report_data = ReportRepository.get_audit_report(
                db=db,
                user_id=user_id,
                period=period
            )

        else:
            return {
                "message": "Invalid Report Type"
            }

        # Generate PDF
        if file_format == "pdf":

            pdf_path = "report.pdf"

            generate_pdf(
                report_data=report_data,
                file_path=pdf_path,
                report_type=report_type
            )

            return FileResponse(
                path=pdf_path,
                filename="report.pdf",
                media_type="application/pdf"
            )

        # Generate Excel
        elif file_format == "excel":

            excel_path = "report.xlsx"

            generate_excel(
                report_data=report_data,
                file_path=excel_path,
                report_type=report_type 
            )

            return FileResponse(
                path=excel_path,
                filename="report.xlsx",
                media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            )

        # Return JSON
        return report_data