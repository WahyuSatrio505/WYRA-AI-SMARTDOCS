from langchain_community.document_loaders import PyPDFLoader
from backend.app.rag.ingestion import process_text_to_db

# 1. Tentukan nama file PDF baru kamu (pastikan file ada di folder yang sama)
file_path = "smd-sample.pdf" 

print(f"⏳ Sedang membaca file: {file_path}")

# 2. Load PDF menggunakan LangChain
loader = PyPDFLoader(file_path)
pages = loader.load()

# 3. Gabungkan semua teks dari halaman PDF
full_text = "\n".join([p.page_content for p in pages])

# 4. Kirim ke fungsi ingestion yang sudah kita optimasi tadi
process_text_to_db(full_text, file_path)

print("🚀 Ingestion selesai! Database siap digunakan.")