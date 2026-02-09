from pathlib import Path
import fitz

BASE_DIR = Path(__file__).resolve().parents[3]

def load_pdf(relative_path: str) -> str:
    file_path = BASE_DIR / relative_path
    text = []

    with fitz.open(file_path) as doc:
        for page in doc:
            page_text = page.get_text()
            if page_text.strip():
                text.append(page_text)

    return "\n".join(text)
