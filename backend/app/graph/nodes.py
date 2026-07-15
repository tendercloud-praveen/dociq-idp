import json
import fitz
from pathlib import Path

from pdf2image import convert_from_path
from docx import Document

from dotenv import load_dotenv
# from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_groq import ChatGroq
import os
from langchain_core.messages import HumanMessage

from app.graph.state import DocumentState

from PIL import Image
from datetime import datetime
import pytesseract
from pathlib import Path
from pdf2image import convert_from_path
from PIL import Image, ImageFilter, ImageOps




load_dotenv()


# =========================
# 🔥 TESSERACT PATH (IMPORTANT)
# =========================
# pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"


# =========================
# LLM
# =========================
# llm = ChatGoogleGenerativeAI(
#     model="gemini-2.5-flash-lite",
#     temperature=0,
# )
llm = ChatGroq(
    model="llama-3.3-70b-versatile",   # or another Groq-supported model
    temperature=0,
    api_key=os.getenv("GROQ_API_KEY"),
)


# =========================
# UPLOAD NODE
# =========================
def upload_node(state: DocumentState):
    print("Uploaded File:", state["file_path"])
    return state
    
   


# =========================
# OCR NODE (FIXED + SAFE)
# =========================
# =========================
# OCR NODE
# =========================

def ocr_node(state):
    print("OCR Node")

    file_path = Path(state.get("processed_file_path", state["file_path"]))
    raw_text = ""

    try:

        # ======================
        # PDF
        # ======================
        if file_path.suffix.lower() == ".pdf":

            print("Processing PDF...")

            # First try embedded text
            doc = fitz.open(file_path)

            for page in doc:
                raw_text += page.get_text()

            doc.close()

            # If no embedded text, use OCR
            if not raw_text.strip():

                print("No embedded text found. Running OCR...")

                for image_path in state.get("processed_images", []):
                    image = Image.open(image_path)

                    raw_text += pytesseract.image_to_string(
                        image,
                        lang="eng",
                        config="--oem 3 --psm 11"
                    )

        # ======================
        # IMAGE
        # ======================
        else:

            print("Processing Image...")

            image = Image.open(file_path)

            # raw_text = pytesseract.image_to_string(
            #     image,
            #     lang="eng",
            #     config="--oem 3 --psm 11"
            # )

        raw_text = raw_text.strip()

        if raw_text:
            print("✅ OCR Completed")
            print(raw_text)
         
        else:
            print("❌ No text extracted.")
            state["error"] = "No text extracted."

        state["raw_text"] = raw_text

    except Exception as e:

        print(f"❌ OCR ERROR: {e}")

        state["raw_text"] = ""
        state["error"] = str(e)

    return state



           


# =========================
# LLM NODE (FIXED JSON SAFE)
# =========================
def llm_node(state: DocumentState):

    print("LLM Node")

    raw_text = state.get("raw_text", "")

    prompt = f"""
You are an Intelligent Document Processing (IDP) AI.

OCR TEXT:
----------------
{raw_text}
----------------

Identify the document type.

Supported document types:
- Invoice
- Resume
- Aadhaar Card
- PAN Card
- Passport
- Driving License
- Receipt
- Purchase Order
- Bank Statement
- Payslip
- Offer Letter
- Contract
- Medical Record
- Insurance Claim
- Unknown

Extract only the relevant fields.

Invoice:
invoice_number
invoice_date
vendor_name
customer_name
total_amount
tax
currency

Resume:
name
email
phone
skills
education
experience

PAN Card:
pan_number
name
date_of_birth

Aadhaar Card:
aadhaar_number
name
date_of_birth
gender
address

Passport:
passport_number
name
nationality
date_of_birth
expiry_date

Driving License:
license_number
name
date_of_birth
issue_date
expiry_date

Receipt:
receipt_number
merchant_name
date
total_amount

Purchase Order:
po_number
vendor_name
order_date
total_amount

Bank Statement:
account_holder
account_number
bank_name
opening_balance
closing_balance

Payslip:
employee_name
company_name
pay_period
net_salary

Offer Letter:
employee_name
company_name
designation
joining_date
salary

Contract:
party_1
party_2
effective_date
termination_date

Medical Record:
patient_name
doctor_name
hospital
diagnosis

Insurance Claim:
claim_number
policy_number
claimant_name
claim_amount

If the document type is unknown, return an empty fields object.

Return ONLY valid JSON in this format:

{{
    "document_type":"",
    "confidence":0,
    "summary":"",
    "fields":{{}}
}}

Rules:
- Never invent values.
- Missing values should be "".
- Return only JSON.
- No markdown.
- No explanation.
"""

    message = HumanMessage(content=prompt)

    try:
        # print(prompt)
        response = llm.invoke([message])

        # print("RAW RESPONSE FROM LLM:")

        # print(response.content)

        content = response.content.strip()

        if content.startswith("```"):
            content = (
                content.replace("```json", "")
                .replace("```", "")
                .strip()
            )

        data = json.loads(content)
        confidence = float(data.get("confidence", 0))
        if 0 <= confidence <= 1:
             confidence = confidence * 100
        if confidence > 100:
             confidence = 100
        data["confidence"] = confidence
   
   

        print("✅ LLM processing completed.")
        print(f"Detected document type: {data.get('document_type', 'Unknown')}")

    except Exception as e: 
        print(f"❌ LLM processing failed: {e}")

        data = {
            "document_type": "Unknown",
            "confidence": 0,
            "summary": "",
            "fields": {}
        }
    
  

    # state["document_type"] = data.get("document_type", "Unknown")
    # state["confidence"] = data.get("confidence", 0)
    # state["summary"] = data.get("summary", "")
    # state["extracted_data"] = data.get("fields", {})

    # print("FINAL RESULT")
    # print(json.dumps(data, indent=4))

    # return state
    state["document_type"] = data.get("document_type", "Unknown")
    state["confidence"] = data.get("confidence", 0)
    state["summary"] = data.get("summary", "")
    state["extracted_data"] = data.get("fields", {})
    confidence = float(state["confidence"])
    if confidence >= 90 or confidence >= 0.9:
        state["status"] = "Approved"
        state["approved_by"] = "System"
        state["approved_date"] = datetime.now()
    else:
        state["status"] = "Pending" 
        state["approved_by"] = None
        state["approved_date"] = None
    
    # print(json.dumps(data, indent=4))
    return state

 




def preprocess_image(image):
    """
    Common preprocessing for all images.
    """

    image = image.convert("L")

    image = image.resize(
        (image.width * 2, image.height * 2),
        Image.Resampling.LANCZOS
    )

    image = ImageOps.autocontrast(image)

    image = image.filter(ImageFilter.MedianFilter(size=3))

    return image





def preprocess_image(image):
    """
    Common preprocessing for all images.
    """

    # Convert to grayscale
    image = image.convert("L")

    # Resize
    image = image.resize(
        (image.width * 2, image.height * 2),
        Image.Resampling.LANCZOS
    )

    # Improve contrast
    image = ImageOps.autocontrast(image)

    # Remove noise
    image = image.filter(
        ImageFilter.MedianFilter(size=3)
    )

    return image


def preprocessing_node(state):

    print("========== PREPROCESSING NODE ==========")

    file_path = Path(state["file_path"])
    suffix = file_path.suffix.lower()

    try:

        processed_images = []

        # ====================================
        # PDF
        # ====================================
        if suffix == ".pdf":

            print("PDF detected.")

            pages = convert_from_path(
    str(file_path),
    dpi=300,
    poppler_path=r"C:\Users\AKHILA\Downloads\poppler-26.02.0\Library\bin"
)
            for index, page in enumerate(pages):

                image = preprocess_image(page)

                save_path = (
                    file_path.parent /
                    f"processed_page_{index + 1}.png"
                )

                image.save(save_path)

                processed_images.append(str(save_path))

        # ====================================
        # IMAGE
        # ====================================
        elif suffix in [
            ".jpg",
            ".jpeg",
            ".png",
            ".bmp",
            ".tiff",
            ".webp"
        ]:

            print("Image detected.")

            image = Image.open(file_path)

            image = preprocess_image(image)

            save_path = (
                file_path.parent /
                f"processed_{file_path.stem}.png"
            )

            image.save(save_path)

            processed_images.append(str(save_path))

        # ====================================
        # OTHER DOCUMENTS
        # ====================================
        else:

            print(f"{suffix} is not an image-based document.")
            print("Skipping image preprocessing.")

        state["processed_images"] = processed_images
        state["processed_file_path"] = str(file_path)

        print("Preprocessing Completed.")

    except Exception as e:

        print(f"Preprocessing Error: {e}")

        state["processed_images"] = []
        state["processed_file_path"] = str(file_path)

    return state