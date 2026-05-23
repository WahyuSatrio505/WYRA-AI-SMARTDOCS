# 1. Gunakan import terbaru agar tidak ada warning kuning lagi
from langchain_ollama import OllamaLLM
from langchain_core.prompts import ChatPromptTemplate
from backend.app.rag.retriever import get_relevant_context, format_context

def generate_answer(query: str):
    # Ambil konteks dari retriever (ini yang tadi sudah berhasil jalan di terminalmu)
    docs = get_relevant_context(query)
    context = format_context(docs)

    # 2. Inisialisasi LLM (Gunakan OllamaLLM untuk standar terbaru)
    # Pastikan variabel ini bernama 'llm'
    llm = OllamaLLM(
        model="llama3.2:1b", 
        temperature=0.1
    )

    # 3. Buat Prompt
    template = """Kamu adalah asisten pintar SmartDocs yang membantu menjawab pertanyaan berdasarkan dokumen yang sudah dipelajari. jika tidak tahu jawabannya, katakan "Maaf, saya tidak tahu." Jangan buat jawaban sendiri jika tidak ada di konteks. Jawab dengan singkat dan jelas.
    Konteks: {context}
    Pertanyaan: {question}
    """
    prompt = ChatPromptTemplate.from_template(template)

    # 4. SAMBUNGKAN CHAIN (Pastikan namanya sama: prompt | llm)
    # Tadi error karena kamu tulis 'prompt | model' padahal variabelnya 'llm'
    chain = prompt | llm

    # Jalankan
    response = chain.invoke({"context": context, "question": query})
    return response