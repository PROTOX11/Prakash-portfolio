"""
main.py
-------
PrakashBot Character Script API
FastAPI backend — serves structured animation + dialogue scripts
for the interactive portfolio character, powered by Gemini + RAG.

Endpoints:
  GET  /health          — liveness check
  GET  /welcome         — on-load greeting script (showMic: false)
  POST /introduction    — hand-tap intro script   (showMic: true)
  POST /chat            — text message → RAG → Gemini → script
  POST /voice-chat      — same as /chat (voice transcript input)
"""

import os
import json
from contextlib import asynccontextmanager
from typing import List, Optional

import google.generativeai as genai
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field

import rag_engine

# ─── Bootstrap ────────────────────────────────────────────────────────────────

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")
GEMINI_MODEL   = os.getenv("GEMINI_MODEL", "gemini-1.5-flash")
USE_EMBEDDINGS = False   # flipped to True after successful RAG load

if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)
    print("[startup] Gemini API configured.")
else:
    print("[startup] WARNING: GEMINI_API_KEY not set — falling back to preset scripts.")


# ─── FastAPI lifespan (load RAG on startup) ───────────────────────────────────

@asynccontextmanager
async def lifespan(app: FastAPI):
    global USE_EMBEDDINGS
    if GEMINI_API_KEY:
        try:
            rag_engine.load_knowledge_base()
            USE_EMBEDDINGS = True
            print("[startup] RAG knowledge base loaded successfully.")
        except Exception as e:
            print(f"[startup] RAG load failed ({e}). Falling back to keyword retrieval.")
    yield  # server runs here
    print("[shutdown] PrakashBot API shutting down.")


# ─── App ──────────────────────────────────────────────────────────────────────

app = FastAPI(
    title="PrakashBot Character Script API",
    description=(
        "Generates structured animation + dialogue scripts for the "
        "interactive PrakashBot avatar on Prakash's developer portfolio."
    ),
    version="2.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ─── Pydantic models ──────────────────────────────────────────────────────────

class ScriptLine(BaseModel):
    text:       str   = Field(..., description="Dialogue the character speaks.")
    action:     str   = Field(..., description="Body animation key.")
    expression: str   = Field(..., description="Facial expression key.")
    duration:   float = Field(3.0, description="Seconds to hold this line.")
    audio_url:  Optional[str] = Field(None, description="TTS audio URL (future use).")

class CharacterScript(BaseModel):
    character:  str             = Field(default="PrakashBot")
    script:     List[ScriptLine]
    showMic:    bool            = Field(default=False)
    chips:      List[str]       = Field(
        default_factory=list,
        description="Quick-reply suggestion chips shown below the avatar."
    )

class ChatRequest(BaseModel):
    message: str = Field(..., description="User's text or voice-transcribed question.")


# ─── Preset scripts ───────────────────────────────────────────────────────────

WELCOME_SCRIPT = CharacterScript(
    character="PrakashBot",
    showMic=False,
    chips=[],
    script=[
        ScriptLine(
            text="Hello there! 👋",
            action="wave",
            expression="happy",
            duration=2.0,
        ),
        ScriptLine(
            text="Tap my hand and I'll tell you about Prakash.",
            action="invite",
            expression="happy",
            duration=4.0,
        ),
    ],
)

INTRODUCTION_SCRIPT = CharacterScript(
    character="PrakashBot",
    showMic=True,
    chips=[
        "Tell me about Prakash",
        "Projects",
        "Skills",
        "Experience",
        "Why hire him?",
    ],
    script=[
        ScriptLine(
            text="Hi, I'm Prakash's AI assistant.",
            action="talk",
            expression="happy",
            duration=2.5,
        ),
        ScriptLine(
            text="Prakash is an AI and Full Stack developer passionate about building intelligent applications.",
            action="explain",
            expression="confident",
            duration=5.0,
        ),
        ScriptLine(
            text="He has built projects like Tickzen, MedTrackFit, AI Agents, and RAG systems.",
            action="point",
            expression="excited",
            duration=5.0,
        ),
        ScriptLine(
            text="Feel free to ask me anything about him.",
            action="invite",
            expression="happy",
            duration=3.5,
        ),
    ],
)

DEFAULT_CHIPS = [
    "Tell me about Prakash",
    "Projects",
    "Skills",
    "Experience",
    "Why hire him?",
]


# ─── Gemini RAG generation ────────────────────────────────────────────────────

def _generate_script_from_context(query: str, context: str) -> CharacterScript:
    """
    Use Gemini to turn a RAG context + user query into a CharacterScript.
    """
    model = genai.GenerativeModel(GEMINI_MODEL)

    system_prompt = """
You are PrakashBot, a friendly AI avatar on Prakash's developer portfolio.
Your job: given a CONTEXT block of factual information about Prakash and a USER QUESTION,
generate a short, natural dialogue script the avatar will speak aloud.

Rules:
- Max 4 script lines. Each line is short and conversational.
- Map actions from: idle | wave | explain | point | talk | thinking | celebrating | invite | bow
- Map expressions from: neutral | happy | excited | confident | focused | surprised
- Return ONLY valid JSON matching this schema exactly (no markdown, no extra keys):

{
  "character": "PrakashBot",
  "showMic": true,
  "chips": ["<chip1>", "<chip2>"],
  "script": [
    {
      "text": "<dialogue>",
      "action": "<action>",
      "expression": "<expression>",
      "duration": <seconds as float>
    }
  ]
}

chips = 2-3 follow-up questions a recruiter might ask next.
"""

    user_prompt = f"""
CONTEXT:
{context}

USER QUESTION: {query}
"""

    response = model.generate_content(
        [system_prompt, user_prompt],
        generation_config=genai.GenerationConfig(
            response_mime_type="application/json",
            temperature=0.7,
        ),
    )

    raw = response.text.strip()
    data = json.loads(raw)
    return CharacterScript(**data)


def _handle_chat(message: str) -> CharacterScript:
    """Core logic shared by /chat and /voice-chat."""
    if not GEMINI_API_KEY:
        # No API key: return a preset informational fallback
        return CharacterScript(
            character="PrakashBot",
            showMic=True,
            chips=DEFAULT_CHIPS,
            script=[
                ScriptLine(
                    text=f"You asked: {message}",
                    action="talk",
                    expression="neutral",
                    duration=2.5,
                ),
                ScriptLine(
                    text="I'd love to help! Please ask the portfolio owner to configure my AI key.",
                    action="explain",
                    expression="focused",
                    duration=4.5,
                ),
            ],
        )

    # RAG retrieval
    if USE_EMBEDDINGS:
        context = rag_engine.retrieve_context(message)
    else:
        context = rag_engine.retrieve_context_simple(message)

    # Gemini generation
    try:
        return _generate_script_from_context(message, context)
    except Exception as e:
        print(f"[chat] Gemini error: {e}")
        raise HTTPException(
            status_code=500,
            detail=f"AI generation failed: {str(e)}",
        )


# ─── Routes ───────────────────────────────────────────────────────────────────

@app.get("/health", tags=["System"])
def health():
    """Liveness check."""
    return {
        "status": "ok",
        "character": "PrakashBot",
        "gemini_configured": bool(GEMINI_API_KEY),
        "rag_loaded": USE_EMBEDDINGS,
    }


@app.get(
    "/welcome",
    response_model=CharacterScript,
    tags=["Character"],
    summary="Stage 1 — On-load greeting script",
)
def welcome():
    """
    Returns the initial welcome script played automatically when the
    portfolio page loads. showMic is false at this stage.
    """
    return WELCOME_SCRIPT


@app.post(
    "/introduction",
    response_model=CharacterScript,
    tags=["Character"],
    summary="Stage 2 — Full intro triggered by hand-tap",
)
def introduction():
    """
    Triggered when the user taps the avatar's glowing hand.
    Returns the comprehensive introduction script and reveals the mic
    button + suggestion chips (showMic: true).
    """
    return INTRODUCTION_SCRIPT


@app.post(
    "/chat",
    response_model=CharacterScript,
    tags=["Character"],
    summary="Stage 4/5 — Text query via RAG + Gemini",
)
def chat(req: ChatRequest):
    """
    Accepts a text message, runs the RAG pipeline against info_data.txt,
    feeds the retrieved context to Gemini, and returns an animated
    CharacterScript response.
    """
    return _handle_chat(req.message)


@app.post(
    "/voice-chat",
    response_model=CharacterScript,
    tags=["Character"],
    summary="Stage 4/5 — Voice transcript via RAG + Gemini",
)
def voice_chat(req: ChatRequest):
    """
    Same as /chat but semantically dedicated to voice transcript input
    (Web Speech API → transcript text → this endpoint).
    """
    return _handle_chat(req.message)


# ─── Entry point ──────────────────────────────────────────────────────────────

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "main:app",
        host=os.getenv("HOST", "0.0.0.0"),
        port=int(os.getenv("PORT", 8000)),
        reload=bool(os.getenv("DEV", False)),
    )
