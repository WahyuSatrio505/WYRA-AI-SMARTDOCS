# 1. Gunakan ChatOllama agar model Llama 3.2 mematuhi format instruksi chat
from langchain_ollama import ChatOllama
from langchain_core.prompts import ChatPromptTemplate
from backend.app.rag.retriever import get_relevant_context, format_context

def generate_answer(query: str):
    # Ambil konteks dari retriever (ini yang tadi sudah berhasil jalan di terminalmu)
    docs = get_relevant_context(query)
    # Jika tidak ada dokumen, cegah ke LLM sama sekali
    if not docs:
        return "Maaf, saya tidak menemukan informasi tersebut di dalam dokumen."
        
    context = format_context(docs)

    # 2. Inisialisasi LLM dengan ChatOllama
    llm = ChatOllama(
        model="llama3.2:1b", 
        temperature=0.0,
        top_p=0.1
    )

    # 3. Buat Prompt dengan Format Chat Terpisah (System vs Human)
    prompt = ChatPromptTemplate.from_messages([
        ("system", "Anda adalah asisten pembaca dokumen WYRA yang ketat. Aturan mutlak: Jawab pertanyaan HANYA berdasarkan teks konteks yang diberikan di bawah ini. Jika jawaban sama sekali tidak ditemukan di dalam konteks, Anda WAJIB menjawab dengan persis: 'Maaf, saya tidak menemukan informasi tersebut di dalam dokumen.' Dilarang keras menggunakan pengetahuan umum Anda. Dilarang mengarang fakta, angka, atau nama.\n\nKonteks Dokumen:\n{context}"),
        ("human", "{question}")
    ])

    # 4. SAMBUNGKAN CHAIN
    chain = prompt | llm

    # Jalankan
    response = chain.invoke({"context": context, "question": query})
    
    # Karena ChatOllama mengembalikan objek pesan, ambil isi teksnya saja
    return response.content