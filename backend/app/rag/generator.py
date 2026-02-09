from langchain_ollama import ChatOllama
from langchain_core.prompts import ChatPromptTemplate
from rag.retriever import get_relevant_context, format_context

def generate_answer(query: str):

    
    # 1. Ambil konteks
    results = get_relevant_context(query)
    if not results:
        return "Maaf, saya tidak menemukan informasi yang relevan di dokumen Anda."
    
    context = format_context(results)

    template = """
    Kamu adalah asisten ahli SmartDocs. Tugasmu adalah menjawab pertanyaan pengguna 
    HANYA berdasarkan konteks yang diberikan di bawah ini. 
    Jika jawaban tidak ada di dalam konteks, katakan bahwa kamu tidak tahu.

    KONTEKS:
    {context}

    PERTANYAAN:
    {query}

    JAWABAN:
    """
    
    prompt = ChatPromptTemplate.from_template(template)
    

    model = ChatOllama(model="llama3.2") 
    
    chain = prompt | model
    
    # Eksekusi
    response = chain.invoke({"context": context, "query": query})
    
    return response.content