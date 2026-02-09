from docx import Document

def load_docx(path: str) -> str:
    """
    Membaca file DOCX dan mengembalikan teksnya.
    """
    doc = Document(path)
    paragraphs = []

    for para in doc.paragraphs:
        if para.text.strip():
            paragraphs.append(para.text)

    return "\n".join(paragraphs)
