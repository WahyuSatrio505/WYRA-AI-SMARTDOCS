# Menggunakan image Python versi ringan
FROM python:3.10-slim

# Menentukan direktori kerja di dalam container
WORKDIR /app

# Menyalin file requirements.txt dan menginstal dependensi
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Menyalin seluruh kode ke dalam container
COPY . .

# Mengekspos port yang digunakan FastAPI (asumsi port 8000)
EXPOSE 8000

# Perintah untuk menjalankan server FastAPI
CMD ["uvicorn", "backend.app.main:app", "--host", "0.0.0.0", "--port", "8000"]