import re
from datetime import datetime

def business_rules_node(state):

    fields = state.get("extracted_data", {})
    document_type = state.get("document_type", "")
    confidence = float(state.get("confidence", 0))

    status = "Approved"
    required_fields = []

    # -------------------------
    # Required Fields
    # -------------------------

    if document_type == "Invoice":
        required_fields = [
            "invoice_number",
            "invoice_date",
            "vendor_name",
            "customer_name",
            "total_amount",
            "tax",
            "currency"
        ]

    elif document_type == "Resume":
        required_fields = [
            "name",
            "email",
            "phone",
            "skills",
            "education",
            "experience"
        ]

    elif document_type == "PAN Card":
        required_fields = [
            "pan_number",
            "name",
            "date_of_birth"
        ]

    elif document_type == "Aadhaar Card":
        required_fields = [
            "aadhaar_number",
            "name",
            "date_of_birth",
            "gender",
            "address"
        ]

    elif document_type == "Passport":
        required_fields = [
            "passport_number",
            "name",
            "nationality",
            "date_of_birth",
            "expiry_date"
        ]

    elif document_type == "Driving License":
        required_fields = [
            "license_number",
            "name",
            "date_of_birth",
            "issue_date",
            "expiry_date"
        ]

    elif document_type == "Receipt":
        required_fields = [
            "receipt_number",
            "merchant_name",
            "date",
            "total_amount"
        ]

    elif document_type == "Purchase Order":
        required_fields = [
            "po_number",
            "vendor_name",
            "order_date",
            "total_amount"
        ]

    elif document_type == "Bank Statement":
        required_fields = [
            "account_holder",
            "account_number",
            "bank_name",
            "opening_balance",
            "closing_balance"
        ]

    elif document_type == "Payslip":
        required_fields = [
            "employee_name",
            "company_name",
            "pay_period",
            "net_salary"
        ]

    elif document_type == "Offer Letter":
        required_fields = [
            "employee_name",
            "company_name",
            "designation",
            "joining_date",
            "salary"
        ]

    elif document_type == "Contract":
        required_fields = [
            "party_1",
            "party_2",
            "effective_date",
            "termination_date"
        ]

    elif document_type == "Medical Record":
        required_fields = [
            "patient_name",
            "doctor_name",
            "hospital",
            "diagnosis"
        ]

    elif document_type == "Insurance Claim":
        required_fields = [
            "claim_number",
            "policy_number",
            "claimant_name",
            "claim_amount"
        ]

    else:
        status = "Pending"

    # -------------------------
    # Common Business Rules
    # -------------------------

    for field in required_fields:
        if not fields.get(field):
            status = "Pending"
            confidence -= 10

    if confidence < 0:
        confidence = 0

    state["confidence"] = confidence

    # -------------------------
    # Document Specific Rules
    # -------------------------

    if document_type == "PAN Card":

        pan = fields.get("pan_number", "")

        if not re.match(r"^[A-Z]{5}[0-9]{4}[A-Z]$", pan):
            status = "Pending"

    elif document_type == "Aadhaar Card":

        aadhaar = fields.get("aadhaar_number", "")

        if not aadhaar.isdigit() or len(aadhaar) != 12:
            status = "Pending"

    elif document_type == "Resume":

        email = fields.get("email", "")

        if email and "@" not in email:
            status = "Pending"

    elif document_type == "Invoice":

        if fields.get("total_amount"):
            try:
                amount = float(
                    str(fields["total_amount"])
                    .replace("$", "")
                    .replace(",", "")
                )

                if amount <= 0:
                    status = "Pending"

            except:
                status = "Pending"

    # -------------------------
    # Final Confidence Rule
    # -------------------------

    if confidence < 90:
        status = "Pending"

    state["status"] = status

    if status == "Approved":
        state["approved_by"] = "System"
        state["approved_date"] = datetime.now()
    else:
        state["approved_by"] = None
        state["approved_date"] = None

    return state