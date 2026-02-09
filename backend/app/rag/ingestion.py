from langchain_community.vectorstores import Chroma
from langchain_community.embeddings import OllamaEmbeddings
from langchain_text_splitters import RecursiveCharacterTextSplitter
import os

# Konfigurasi Path
CHROMA_PATH = "storage/vectordb"

def process_text_to_db(text: str, document_name: str):
    """Proses teks mentah masuk ke database vektor"""
    
    # 1. Chunking: Memecah teks panjang jadi potongan kecil
    # chunk_size 1000 karakter dengan overlap 200 agar konteks tidak terputus
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=500,
        chunk_overlap=60,
        length_function=len
    )
    chunks = text_splitter.split_text(text)
    
    # 2. Embedding: Menggunakan model lokal lewat Ollama
    # Pastikan kamu sudah 'ollama pull llama3.2' atau model embedding lainnya
    embeddings = OllamaEmbeddings(model="nomic-embed-text")
    
    # 3. Storage: Simpan ke ChromaDB
    db = Chroma.from_texts(
        chunks, 
        embeddings, 
        persist_directory=CHROMA_PATH,
        collection_name="smartdocs_collection"
    )
    
    print(f"✅ Berhasil memasukkan {len(chunks)} potongan dari {document_name}")
    return True