from openpyxl import Workbook


def generate_excel(report_data, file_path, report_type="document"):

    workbook = Workbook()
    sheet = workbook.active

    # ==========================================
    # DOCUMENT REPORT
    # ==========================================

    if report_type == "document":

        sheet.title = "Document Report"

        report = report_data["report_information"]
        summary = report_data["summary"]

        sheet.append(["DOCUMENT REPORT"])
        sheet.append([])

        sheet.append(["Report Information"])
        sheet.append(["Report Period", report["report_period"]])
        sheet.append(["Generated Date", report["generated_date"]])
        sheet.append(["Generated Time", report["generated_time"]])

        sheet.append([])

        sheet.append(["Summary"])
        sheet.append(["Total Documents", summary["total_documents"]])
        sheet.append(["Processed", summary["processed"]])
        sheet.append(["Approved", summary["approved"]])
        sheet.append(["Rejected", summary["rejected"]])
        sheet.append(["Pending", summary["pending"]])
        sheet.append(["STP Rate", summary["stp_rate"]])
        sheet.append(["Exception Rate", summary["exception_rate"]])
        sheet.append(["Average Processing Time", summary["average_processing_time"]])
        sheet.append(["Cost Savings", summary["cost_savings"]])

        sheet.append([])

        sheet.append([
            "File Name",
            "Document Type",
            "Status",
            "Confidence",
            "Uploaded Time",
            "Completed Time",
            "Approved By"
        ])

        for doc in report_data["document_details"]:

            sheet.append([
                doc["file_name"],
                doc["document_type"],
                doc["status"],
                doc["confidence"],
                str(doc["uploaded_time"]),
                str(doc["completed_time"]),
                str(doc["approved_by"])
            ])

    # ==========================================
    # AUDIT REPORT
    # ==========================================

    elif report_type == "audit":

        sheet.title = "Audit Report"

        report = report_data["report_information"]

        sheet.append(["AUDIT REPORT"])
        sheet.append([])

        sheet.append(["Report Information"])
        sheet.append(["Report Period", report["report_period"]])
        sheet.append(["Generated Date", report["generated_date"]])
        sheet.append(["Generated Time", report["generated_time"]])

        sheet.append([])

        sheet.append([
            "File Name",
            "Document Type",
            "Status",
            "Action",
            "Performed By",
            "Action Time"
        ])

        for document in report_data["audit_details"]:

            for log in document["audit_logs"]:

                sheet.append([
                    document["file_name"],
                    document["document_type"],
                    document["status"],
                    log["action"],
                    log["performed_by"],
                    str(log["action_time"])
                ])

    workbook.save(file_path)