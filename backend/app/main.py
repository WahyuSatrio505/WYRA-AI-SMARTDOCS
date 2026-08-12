#!/usr/bin/env python3

import os
import shutil
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from langchain_community.document_loaders import PyPDFLoader
from backend.app.api.chat import router as chat_router
from backend.app.rag.ingestion import process_text_to_db

# Inisialisasi FastAPI
app = FastAPI(title="SmartDocs API", version="1.0.0")

# 1. KONFIGURASI CORS (Penting agar Frontend bisa akses Backend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Di produksi nanti, ganti dengan domain frontend kamu
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 2. PENDAFTARAN ROUTER
# Semua endpoint chat sekarang ada di bawah prefix /api/v1
app.include_router(chat_router, prefix="/api/v1", tags=["Chat"])

# 3. ENDPOINT UPLOAD (File Management & Auto-Ingestion)

@app.post("/api/v1/upload")
async def upload_document(file: UploadFile = File(...)):
    try:
        # Validasi ekstensi file harus PDF
        if not file.filename.lower().endswith('.pdf'):
            raise HTTPException(status_code=400, detail="Hanya file PDF yang diperbolehkan.")

        # Gunakan path absolut agar tidak bergantung dari folder mana uvicorn dijalankan
        BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__))) # Mengarah ke folder backend/
        raw_docs_dir = os.path.join(BASE_DIR, "storage", "raw_docs")
        vectordb_dir = os.path.join(BASE_DIR, "storage", "vectordb")

        # Pastikan direktori tujuan tersedia
        os.makedirs(raw_docs_dir, exist_ok=True)

        # 2. File Management (Flusher): Hapus semua file PDF lama di direktori raw_docs
        for filename in os.listdir(raw_docs_dir):
            if filename.lower().endswith(".pdf"):
                file_path = os.path.join(raw_docs_dir, filename)
                os.remove(file_path)

        # Simpan file PDF yang baru diunggah
        new_file_path = os.path.join(raw_docs_dir, file.filename)
        with open(new_file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        # 3. Database Flusher: Hapus folder ChromaDB lama beserta isinya
        if os.path.exists(vectordb_dir):
            shutil.rmtree(vectordb_dir)

        # 4. Auto-Ingestion: Load PDF dan jalankan pipeline RAG
        loader = PyPDFLoader(new_file_path)
        pages = loader.load()
        full_text = "\n".join([p.page_content for p in pages])
        
        # Panggil fungsi ingestion untuk memasukkan data teks baru ke ChromaDB
        process_text_to_db(full_text, new_file_path)

        # Jika seluruh proses sukses
        return {
            "status": "success",
            "message": f"File '{file.filename}' berhasil diproses, dan database berhasil diperbarui."
        }

    except Exception as e:
        # 5. Error Handling: Menangkap error dan mengembalikan HTTP status 500
        return JSONResponse(
            status_code=500,
            content={
                "status": "error",
                "message": "Terjadi kesalahan pada saat proses unggah atau ingestion database.",
                "detail": str(e)
            }
        )


# 4. ENDPOINT GET CURRENT DOCUMENT

@app.get("/api/v1/document")
async def get_current_document():
    try:
        BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        raw_docs_dir = os.path.join(BASE_DIR, "storage", "raw_docs")
        if os.path.exists(raw_docs_dir):
            files = [f for f in os.listdir(raw_docs_dir) if f.lower().endswith('.pdf')]
            if files:
                return {"document": files[0]}
        return {"document": None}
    except Exception as e:
        return {"document": None, "error": str(e)}

# 5. ENDPOINT STATUS (Untuk verifikasi di browser)

@app.get("/")
async def root():
    return {
        "status": "SmartDocs API sudah berjalan 🚀",
        "version": "1.0.0",
        "endpoint_chat": "/api/v1/chat"
    }