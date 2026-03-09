from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from backend.app.rag.generator import generate_answer

router = APIRouter()


class ChatRequest(BaseModel):
    message: str

@router.post("/chat")
async def chat(request: ChatRequest):
    try:
        answer = generate_answer(request.message)
        return {"answer": answer}
    except Exception as e:
        print("ERROR TERJADI:", e)
        raise e