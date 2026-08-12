<h1 align="center"> 🤖 WYRA AI - SMART DOCS v1.0 </h1>

<p align="center">
  <img src="https://capsule-render.vercel.app/render?type=soft&color=auto&height=200&section=header&text=WYRA%20SMART%20DOCS&fontSize=70&animation=fadeIn" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" />
  <img src="https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=FastAPI&logoColor=white" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" />
  <img src="https://img.shields.io/badge/Ollama-black?style=for-the-badge&logo=ollama&logoColor=white" />
</p>

---

## 🌟 Tentang Proyek

**WYRA Smart Docs** adalah sistem *Knowledge Base* cerdas berbasis arsitektur **RAG (Retrieval-Augmented Generation)**. Sistem ini memungkinkan kamu untuk mengobrol dan "berdiskusi" dengan dokumen-dokumen pribadi kamu (seperti PDF atau DOCX) seolah-olah kamu sedang bertanya kepada asisten pribadi yang sudah membaca seluruh dokumen tersebut.

### 🔒 Kenapa Dibuat? (Tujuan Utama)
Tujuan utama proyek ini adalah **PRIVASI MUTLAK**. 
Di era di mana data sering dikirim ke server cloud perusahaan besar, WYRA Smart Docs dirancang agar **100% aman dan tidak ada satu byte pun data yang keluar dari laptop/device milikmu**. Semua pemrosesan dokumen dan kecerdasan buatan berjalan murni secara lokal di dalam mesin kamu sendiri, sementara antarmuka (UI) bisa diakses dari mana saja secara seamless via cloud.

---

## 🏗️ Arsitektur Sistem

Proyek ini menggunakan pendekatan **Hybrid-Deployment**:
- **Frontend (Cloud):** Antarmuka pengguna dibangun menggunakan **React & Vite** dan di-deploy di **Vercel** agar responsif, cepat, dan mudah diakses dari browser mana pun tanpa membebani laptop.
- **Backend (Lokal):** Berjalan secara tertutup di laptop/device pengguna sebagai "Mesin" utama yang mengolah instruksi AI dan pencarian di database vektor.
- **Jembatan Akses:** Menggunakan **Cloudflare Tunnel** (`cloudflared`) untuk membuka terowongan aman dari internet menuju server lokal.

---

## 🛠️ Tech Stack

### Frontend & UI
| Teknologi | Keterangan |
| --- | --- |
| **React + Vite** | Framework UI super cepat untuk SPA (Single Page Application) |
| **Framer Motion** | Animasi modern yang mulus (seperti transisi Sidebar & Graph) |
| **React Flow** | Untuk visualisasi grafis arsitektur sistem di UI |
| **Vercel** | Hosting untuk Frontend yang ringan dan cepat |

### Backend & Infrastruktur
| Teknologi | Keterangan |
| --- | --- |
| **FastAPI** | Framework Python berkinerja tinggi untuk melayani API |
| **Uvicorn** | ASGI server untuk menjalankan FastAPI |
| **Cloudflare Tunnel**| Tunnel stabil untuk mengekspos port 8000 lokal ke publik (Vercel) |

### AI & Data Layer
| Teknologi | Keterangan |
| --- | --- |
| **LangChain** | Orkestrator yang merangkai pipeline AI dan pencarian dokumen |
| **ChromaDB** | Vector Database untuk menyimpan memori semantik (teks jadi angka) |
| **Ollama** | Engine lokal untuk mengeksekusi model AI (*Local LLM*) |
| **nomic-embed-text**| Model embedding untuk mencari konteks dokumen |
| **llama3.2:1b** | Model utama LLM yang merangkai jawaban berdasarkan konteks |

---

## ⚠️ Kekurangan & Keterbatasan

Karena proyek ini mengutamakan privasi dan berjalan 100% di komputer lokal, ada beberapa *trade-off* yang perlu diketahui:
1. **Model Berskala Kecil:** 
   Untuk menyesuaikan dengan keterbatasan hardware laptop, sistem ini sengaja menggunakan model **`llama3.2:1b`** (hanya 1 Billion parameters). Meski sangat hemat RAM, model sekecil ini terkadang rentan mengalami *halusinasi* atau kurang mahir menjawab instruksi logika kompleks dibandingkan model raksasa (seperti GPT-4).
2. **Ketergantungan Hardware (Device-Dependent):**
   Kecepatan AI berpikir dan mengetikkan jawaban sepenuhnya **bergantung pada kekuatan CPU/GPU laptop milikmu**. Semakin kuat spesifikasi laptopnya, semakin gegas respons AI-nya.

---

## 🚀 Panduan Menjalankan (Sebagai Server Vercel)

Agar laptop kamu bisa berfungsi sebagai "Otak/Mesin" yang melayani website Vercel, jalankan **3 perintah ini secara bersamaan** di 3 terminal berbeda:

### 1. Nyalakan AI Engine
```bash
ollama serve
# Pastikan kamu sudah memiliki model:
# ollama pull llama3.2:1b
# ollama pull nomic-embed-text
```

### 2. Nyalakan Backend Server (FastAPI)
```bash
# Aktifkan virtual environment (Sangat disarankan pakai Python 3.11)
source venv/bin/activate

# Nyalakan server
python3 -m uvicorn backend.app.main:app --reload
```

### 3. Buka Terowongan (Cloudflare Tunnel)
```bash
# Mengekspos port 8000 lokal ke internet secara aman
cloudflared tunnel --url http://localhost:8000
```

> **🔥 PENTING UNTUK VERCEL:** 
> Setelah `cloudflared` jalan, akan muncul URL seperti `https://xxxx.trycloudflare.com`. 
> Masukkan URL tersebut ke dalam menu **Settings > Environment Variables** di dashboard Vercel kamu dengan nama kunci (key): `VITE_API_URL`. Kemudian tekan tombol **Redeploy** di Vercel.

---

## 📂 Struktur Folder Utama

```text
WYRA-AI-SMARTDOCS/
├── backend/
│   └── app/
│       ├── api/            # Endpoint FastAPI (chat, upload)
│       ├── core/           # Konfigurasi sistem 
│       ├── rag/            # Logika Inti RAG (Generator, Ingestion, Retriever)
│       └── main.py         # Entry point server Uvicorn
├── frontend/
│   ├── public/             # Aset statis
│   ├── src/
│   │   ├── components/     # Komponen React (Sidebar, App, Modal, dll)
│   │   ├── App.jsx         # Entry point antarmuka utama
│   │   └── main.jsx        # Root render Vite
│   ├── .env.example        # Contoh environment variables (VITE_API_URL)
│   └── package.json        # Dependencies NodeJS
├── storage/
│   ├── raw_docs/           # 📌 TARUH PDF/DOCX KAMU DI SINI
│   └── vectordb/           # Database ChromaDB (Memori RAG)
└── requirements.txt        # Daftar dependency Python Backend
```

---

## 👨‍💻 Author

<div align="center">
  <strong>Wahyu Satrio Wibowo</strong> <br>
  Mahasiswa Teknik Informatika<br>
  
  [![GitHub](https://img.shields.io/badge/GitHub-WahyuSatrio505-181717?style=flat-square&logo=github)](https://github.com/WahyuSatrio505) <br>
</div>

<br>
<p align="center">
  <i>Dibuat dengan ❤️ untuk privasi maksimal dan eksplorasi kecerdasan buatan.</i> 🚀
</p>
