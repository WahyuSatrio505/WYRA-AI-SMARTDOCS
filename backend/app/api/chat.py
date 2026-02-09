from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from rag.generator import generate_answer

router = APIRouter()


class ChatRequest(BaseModel):
    message: str

@router.post("/chat")
async def chat_endpoint(request: ChatRequest):
    try:
    
        response = generate_answer(request.message)
        return {"answer": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))