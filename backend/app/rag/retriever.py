from langchain_chroma import Chroma
from langchain_ollama import OllamaEmbeddings
import os

CHROMA_PATH = "storage/vectordb"

def get_relevant_context(query: str):

    embeddings = OllamaEmbeddings(model="nomic-embed-text")
    
    db = Chroma(
        persist_directory=CHROMA_PATH,
        embedding_function=embeddings,
        collection_name="smartdocs_collection"
    )
    
    # Gunakan similarity_search biasa untuk menghindari skor negatif
    docs = db.similarity_search(query, k=3)
    
    if not docs:
        print("⚠️ Tidak ditemukan konteks yang relevan.")
        return None
        
    return docs

def format_context(docs):
    """Merapikan potongan dokumen menjadi satu teks utuh"""
    return "\n\n---\n\n".join([doc.page_content for doc in docs])