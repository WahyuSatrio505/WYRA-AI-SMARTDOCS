from langchain_chroma import Chroma
from langchain_ollama import OllamaEmbeddings
import os

# Konfigurasi Path Absolut
BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))) # Mengarah ke folder backend/
CHROMA_PATH = os.path.join(BASE_DIR, "storage", "vectordb")

def get_relevant_context(query: str):

    embeddings = OllamaEmbeddings(model="nomic-embed-text")
    
    db = Chroma(
        persist_directory=CHROMA_PATH,
        embedding_function=embeddings,
        collection_name="smartdocs_collection"
    )
    
    docs = db.similarity_search(query, k=4)  # Ambil 5 dokumen paling relevan

    print("=== DEBUG RETRIEVED DOCS ===")
    print(docs)
    print("============================")

    if not docs:
        print("⚠️ Tidak ditemukan konteks yang relevan.")
        return None
        
    return docs

def format_context(docs):
    """Merapikan potongan dokumen menjadi satu teks utuh"""
    return "\n\n---\n\n".join([doc.page_content for doc in docs])