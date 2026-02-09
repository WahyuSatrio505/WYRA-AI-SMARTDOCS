import os
import shutil
from loaders.pdf_loader import load_pdf
from rag.ingestion import process_text_to_db

# Konfigurasi Path sesuai struktur folder kamu
RAW_DOCS_DIR = "storage/raw_docs"
PROCESSED_DIR = "storage/processed_docs"

def run_auto_ingestion():
    """Fungsi otomatis untuk memproses semua PDF di folder raw_docs"""
    if not os.path.exists(RAW_DOCS_DIR):
        print(f"❌ Folder {RAW_DOCS_DIR} tidak ditemukan!")
        return

    files = [f for f in os.listdir(RAW_DOCS_DIR) if f.endswith(".pdf")]
    
    if not files:
        print("📭 Folder kosong. Tidak ada dokumen baru.")
        return

    print(f"📂 Ditemukan {len(files)} file baru. Memulai proses...")

    for file_name in files:
        file_path = os.path.join(RAW_DOCS_DIR, file_name)
        print(f"⌛ Memproses: {file_name}...")
        
        text = load_pdf(file_path)
        if text:
            success = process_text_to_db(text, file_name)
            if success:
                # Pindahkan file agar tidak diproses ulang (Opsional)
                # os.makedirs(PROCESSED_DIR, exist_ok=True)
                # shutil.move(file_path, os.path.join(PROCESSED_DIR, file_name))
                print(f"✅ {file_name} Berhasil masuk database.")
        else:
            print(f"❌ Gagal mengekstrak teks dari {file_name}")

if __name__ == "__main__":
    run_auto_ingestion()