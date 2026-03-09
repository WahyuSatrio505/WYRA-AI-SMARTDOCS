<h1 align="center"> 🤖 WYRA AI - SMART DOCS v1.0 </h1>

<p align="center">
  <img src="https://capsule-render.vercel.app/render?type=soft&color=auto&height=200&section=header&text=WYRA%20SMART%20DOCS&fontSize=70&animation=fadeIn" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" />
  <img src="https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=FastAPI&logoColor=white" />
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" />
  <img src="https://img.shields.io/badge/Linux-FCC624?style=for-the-badge&logo=linux&logoColor=black" />
</p>

---

### 🌟 Tentang Proyek
**Wyrax Smart Docs** adalah platform *Local Knowledge Base* berbasis **RAG (Retrieval-Augmented Generation)** yang dirancang untuk privasi maksimal. Sistem ini memungkinkan kamu untuk "berdiskusi" dengan dokumen PDF secara 100% offline di mesin lokal.

> "Membangun jembatan antara dokumen statis dan kecerdasan buatan melalui arsitektur RAG berbasis lokal."

### 🚀 Fitur Utama
- **🔒 100% Privacy Focused:** Data tidak pernah meninggalkan perangkat kamu karena berjalan sepenuhnya secara lokal.
- **🧠 Local LLM Power:** Terintegrasi dengan **Ollama (Llama 3.2)** sebagai otak kecerdasannya.
- **⚡ Fast Retrieval:** Menggunakan **ChromaDB** sebagai *Vector Store* untuk pencarian konteks yang kilat.
- **🐳 Dockerized:** Siap dijalankan di mana saja (laptop Advan i3 hingga PC Monster RTX Seri 50) tanpa drama environment.

### 🛠️ Tech Stack
| Komponen | Teknologi |
| --- | --- |
| **Orchestrator** | ![LangChain](https://img.shields.io/badge/LangChain-1C3C3C?style=flat-square&logo=chainlink&logoColor=white) |
| **Backend** | ![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=flat-square&logo=fastapi) |
| **Database** | ![ChromaDB](https://img.shields.io/badge/ChromaDB-FFCC00?style=flat-square&logo=databricks&logoColor=black) |
| **AI Engine** | ![Ollama](https://img.shields.io/badge/Ollama-black?style=flat-square&logo=ollama&logoColor=white) |

### 📦 Instalasi & Cara Pakai (Docker)
1. **Clone Repo**
   ```bash
   git clone [https://github.com/WahyuSatrio505/WYRA-AI-SMARTDOCS.git](https://github.com/WahyuSatrio505/WYRA-AI-SMARTDOCS.git)
   cd WYRA-AI-SMARTDOCS

   2. **Siapkan "Otak" AI (Ollama)**
   Karena SmartDocs berjalan 100% lokal, pastikan Ollama sudah aktif di sistem kamu.
   ```bash
   ollama run llama3.2
   
   3. Bungkus & Rakit Kontainer Docker (Build)
   docker build -t smartdocs-api .

   4. nyalakan mesinyaa..!!
   docker run -p 8000:8000 --network="host" smartdocs-api

   5. verivikasi API
   http://127.0.0.1:8000.
   dan muncul pesan    {"status": "SmartDocs API sudah berjalan 🚀"}
