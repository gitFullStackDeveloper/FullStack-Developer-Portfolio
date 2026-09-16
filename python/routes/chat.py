from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import google.generativeai as genai
import os
import traceback
from dotenv import load_dotenv
from pathlib import Path

from memory import memory
from rag import get_relevant_context

env_path = Path(__file__).parent.parent / '.env'
load_dotenv(dotenv_path=env_path)

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY not set in .env")

genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel("gemini-flash-latest")

router = APIRouter()

class ChatRequest(BaseModel):
    message: str
    session_id: str = "default"   # track conversations per user/session
    history: list = []            

class ChatResponse(BaseModel):
    reply: str

# ---------- CHAT ENDPOINT ----------
@router.post("/", response_model=ChatResponse)
async def chat(request: ChatRequest):
    try:
        session = request.session_id

        # Load or use incoming history
        history = memory.get_history(session)
        if request.history:
            history = request.history
            memory.clear(session)
            for turn in history:
                role = turn.get("role")
                text = turn.get("parts", [{}])[0].get("text", "")
                if role and text:
                    memory.add_turn(session, role, text)

        messages = memory.get_initial_messages()

        # Add past conversation from memory
        messages.extend(history)

        # RAG: inject live data if relevant
        context = await get_relevant_context(request.message)
        if context:
            messages.append({"role": "user", "parts": [{"text": f"[CONTEXT]\n{context}"}]})
            messages.append({"role": "model", "parts": [{"text": "Understood. I'll use this data to answer the next question accurately."}]})

        messages.append({"role": "user", "parts": [{"text": request.message}]})

        memory.add_turn(session, "user", request.message)

        response = model.generate_content(messages)
        reply = response.text.strip()
        memory.add_turn(session, "model", reply)

        return ChatResponse(reply=reply)

    except Exception as e:
        print("Gemini API Error:")
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"AI service error: {str(e)}")