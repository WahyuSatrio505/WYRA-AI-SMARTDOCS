from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.chat import router as chat_router

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

# 3. ENDPOINT STATUS (Untuk verifikasi di browser)
@app.get("/")
async def root():
    return {
        "status": "SmartDocs API sudah berjalan 🚀",
        "version": "1.0.0",
        "endpoint_chat": "/api/v1/chat"
    }