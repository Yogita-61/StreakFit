import pdfplumber
import pandas as pd
import pytesseract
from PIL import Image
import fitz  # PyMuPDF

class DocumentParser:
    def __init__(self):
        # Tesseract path might need configuration: pytesseract.pytesseract.tesseract_cmd = r'/usr/bin/tesseract'
        pass

    def extract_text_from_pdf(self, file_path):
        text = ""
        with pdfplumber.open(file_path) as pdf:
            for page in pdf.pages:
                text += page.extract_text() or ""

        # If text is empty, it might be a scanned PDF; use OCR
        if len(text.strip()) < 100:
            text = self._perform_ocr(file_path)
        return text

    def _perform_ocr(self, file_path):
        doc = fitz.open(file_path)
        text = ""
        for page in doc:
            pix = page.get_pixmap()
            img = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)
            text += pytesseract.image_to_string(img)
        return text

    def extract_financials(self, text):
        # Simplified extraction logic using keywords
        data = {
            "revenue": 0.0,
            "net_profit": 0.0,
            "total_assets": 0.0,
            "debt": 0.0
        }
        # In production, use Regex or NER models for precision
        lines = text.lower().split('\n')
        for line in lines:
            if "revenue" in line or "turnover" in line:
                val = self._extract_first_number(line)
                if val: data["revenue"] = val
            elif "net profit" in line:
                val = self._extract_first_number(line)
                if val: data["net_profit"] = val
        return data

    def _extract_first_number(self, text):
        import re
        nums = re.findall(r"[-+]?\d*\.\d+|\d+", text.replace(',', ''))
        return float(nums[0]) if nums else None

def cross_check_gst_bank(gst_revenue, bank_deposits):
    """
    Detects revenue inflation: GST sales vs Bank credits.
    Flag if GST sales are significantly higher than bank deposits.
    """
    variance = (gst_revenue - bank_deposits) / (bank_deposits + 1e-6)
    flag = variance > 0.20  # Flag if > 20% mismatch
    return variance, flag