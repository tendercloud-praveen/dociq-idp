from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle
)
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib import colors


def generate_pdf(report_data, file_path, report_type="document"):

    pdf = SimpleDocTemplate(file_path)
    styles = getSampleStyleSheet()
    elements = []

    # ============================================
    # DOCUMENT REPORT
    # ============================================

    if report_type == "document":

        elements.append(Paragraph("<b>Document Report</b>", styles["Heading1"]))
        elements.append(Spacer(1, 20))

        # Report Information
        report = report_data["report_information"]

        elements.append(Paragraph("<b>Report Information</b>", styles["Heading2"]))
        elements.append(Paragraph(f"Report Period : {report['report_period']}", styles["Normal"]))
        elements.append(Paragraph(f"Generated Date : {report['generated_date']}", styles["Normal"]))
        elements.append(Paragraph(f"Generated Time : {report['generated_time']}", styles["Normal"]))

        elements.append(Spacer(1, 20))

        # Summary
        summary = report_data["summary"]

        elements.append(Paragraph("<b>Summary</b>", styles["Heading2"]))
        elements.append(Paragraph(f"Total Documents : {summary['total_documents']}", styles["Normal"]))
        elements.append(Paragraph(f"Processed : {summary['processed']}", styles["Normal"]))
        elements.append(Paragraph(f"Approved : {summary['approved']}", styles["Normal"]))
        elements.append(Paragraph(f"Rejected : {summary['rejected']}", styles["Normal"]))
        elements.append(Paragraph(f"Pending : {summary['pending']}", styles["Normal"]))
        elements.append(Paragraph(f"STP Rate : {summary['stp_rate']}", styles["Normal"]))
        elements.append(Paragraph(f"Exception Rate : {summary['exception_rate']}", styles["Normal"]))
        elements.append(Paragraph(f"Average Processing Time : {summary['average_processing_time']}", styles["Normal"]))
        elements.append(Paragraph(f"Cost Savings : {summary['cost_savings']}", styles["Normal"]))

        elements.append(Spacer(1, 20))

        # Document Details
        elements.append(Paragraph("<b>Document Details</b>", styles["Heading2"]))

        table_data = [[
            "File Name",
            "Document Type",
            "Status",
            "Confidence",
            "Uploaded Time",
            "Completed Time",
            "Approved By"
        ]]

        for doc in report_data["document_details"]:
            table_data.append([
                str(doc["file_name"]),
                str(doc["document_type"]),
                str(doc["status"]),
                str(doc["confidence"]),
                str(doc["uploaded_time"]),
                str(doc["completed_time"]),
                str(doc["approved_by"])
            ])

        table = Table(table_data)

        table.setStyle(TableStyle([
            ("BACKGROUND", (0, 0), (-1, 0), colors.grey),
            ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
            ("GRID", (0, 0), (-1, -1), 1, colors.black),
            ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
            ("BOTTOMPADDING", (0, 0), (-1, 0), 8),
            ("BACKGROUND", (0, 1), (-1, -1), colors.beige),
        ]))

        elements.append(table)

    # ============================================
    # AUDIT REPORT
    # ============================================

    elif report_type == "audit":

        elements.append(Paragraph("<b>Audit Report</b>", styles["Heading1"]))
        elements.append(Spacer(1, 20))

        report = report_data["report_information"]

        elements.append(Paragraph("<b>Report Information</b>", styles["Heading2"]))
        elements.append(Paragraph(f"Report Period : {report['report_period']}", styles["Normal"]))
        elements.append(Paragraph(f"Generated Date : {report['generated_date']}", styles["Normal"]))
        elements.append(Paragraph(f"Generated Time : {report['generated_time']}", styles["Normal"]))

        elements.append(Spacer(1, 20))

        elements.append(Paragraph("<b>Audit Log Details</b>", styles["Heading2"]))

        table_data = [[
            "File Name",
            "Document Type",
            "Status",
            "Action",
            "Performed By",
            "Action Time"
        ]]

        for document in report_data["audit_details"]:

            for log in document["audit_logs"]:

                table_data.append([
                    str(document["file_name"]),
                    str(document["document_type"]),
                    str(document["status"]),
                    str(log["action"]),
                    str(log["performed_by"]),
                    str(log["action_time"])
                ])

        table = Table(table_data)

        table.setStyle(TableStyle([
            ("BACKGROUND", (0, 0), (-1, 0), colors.grey),
            ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
            ("GRID", (0, 0), (-1, -1), 1, colors.black),
            ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
            ("BOTTOMPADDING", (0, 0), (-1, 0), 8),
            ("BACKGROUND", (0, 1), (-1, -1), colors.beige),
        ]))

        elements.append(table)

    # ============================================
    # BUILD PDF (VERY IMPORTANT)
    # ============================================

    pdf.build(elements)