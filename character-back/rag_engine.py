"""
rag_engine.py
-------------
Retrieval-Augmented Generation (RAG) engine for PrakashBot.

Flow:
  1. Load and split info_data.txt into sections.
  2. On first request, generate Gemini text-embeddings for each chunk
     and cache them in memory (no external vector DB needed).
  3. On every query, embed the question and find the top-k most
     relevant chunks using cosine similarity.
  4. Return the combined context string to be injected into the
     Gemini generation prompt.
"""

import os
import re
import math
from pathlib import Path
from typing import List, Tuple

import google.generativeai as genai

# ─── Constants ────────────────────────────────────────────────────────────────

INFO_FILE = Path(__file__).parent / "info_data.txt"
EMBED_MODEL = "models/text-embedding-004"   # Gemini embedding model
TOP_K = 3                                    # how many chunks to retrieve

# ─── In-memory cache ──────────────────────────────────────────────────────────

_chunks: List[str] = []
_embeddings: List[List[float]] = []


# ─── Helpers ──────────────────────────────────────────────────────────────────

def _cosine_similarity(a: List[float], b: List[float]) -> float:
    """Compute cosine similarity between two vectors."""
    dot = sum(x * y for x, y in zip(a, b))
    norm_a = math.sqrt(sum(x ** 2 for x in a))
    norm_b = math.sqrt(sum(x ** 2 for x in b))
    if norm_a == 0 or norm_b == 0:
        return 0.0
    return dot / (norm_a * norm_b)


def _split_into_chunks(text: str) -> List[str]:
    """
    Split the info document by the '---' separator (section dividers).
    Each chunk is a meaningful section of Prakash's knowledge base.
    """
    raw_chunks = re.split(r"\n---+\n", text)
    # Strip whitespace and filter empty chunks
    return [chunk.strip() for chunk in raw_chunks if chunk.strip()]


def _embed_text(text: str) -> List[float]:
    """Embed a single text string using Gemini text-embedding model."""
    result = genai.embed_content(
        model=EMBED_MODEL,
        content=text,
        task_type="retrieval_document",
    )
    return result["embedding"]


# ─── Public API ───────────────────────────────────────────────────────────────

def load_knowledge_base() -> None:
    """
    Load info_data.txt, split into chunks, embed every chunk, and
    cache results in module-level variables.

    This is called once at server startup (via FastAPI lifespan).
    """
    global _chunks, _embeddings

    if not INFO_FILE.exists():
        raise FileNotFoundError(
            f"Knowledge base file not found: {INFO_FILE}. "
            "Please create info_data.txt in the character-back directory."
        )

    text = INFO_FILE.read_text(encoding="utf-8")
    _chunks = _split_into_chunks(text)

    print(f"[RAG] Loaded {len(_chunks)} chunks from {INFO_FILE.name}. Generating embeddings...")

    _embeddings = []
    for i, chunk in enumerate(_chunks):
        embedding = _embed_text(chunk)
        _embeddings.append(embedding)
        print(f"[RAG]   Embedded chunk {i + 1}/{len(_chunks)}: {chunk[:60].strip()!r}...")

    print(f"[RAG] Knowledge base ready. {len(_embeddings)} embeddings cached.")


def retrieve_context(query: str, top_k: int = TOP_K) -> str:
    """
    Embed the query and return the top_k most relevant knowledge
    chunks concatenated as a single context string.

    Args:
        query:  The user's question or topic.
        top_k:  Number of top relevant chunks to return.

    Returns:
        A multi-paragraph string of the most relevant information.
    """
    if not _chunks or not _embeddings:
        # If embeddings aren't loaded (e.g. no API key at startup), return full doc
        if INFO_FILE.exists():
            return INFO_FILE.read_text(encoding="utf-8")
        return ""

    # Embed the query
    query_result = genai.embed_content(
        model=EMBED_MODEL,
        content=query,
        task_type="retrieval_query",
    )
    query_embedding = query_result["embedding"]

    # Score all chunks
    scores: List[Tuple[float, str]] = [
        (_cosine_similarity(query_embedding, emb), chunk)
        for emb, chunk in zip(_embeddings, _chunks)
    ]

    # Sort descending and take top_k
    scores.sort(key=lambda x: x[0], reverse=True)
    top_chunks = [chunk for _, chunk in scores[:top_k]]

    return "\n\n---\n\n".join(top_chunks)


def retrieve_context_simple(query: str) -> str:
    """
    Simple keyword-based fallback retrieval when Gemini embeddings
    are unavailable (e.g. no API key configured).

    Scores chunks by counting how many query words appear in each chunk.
    """
    if not _chunks:
        if INFO_FILE.exists():
            return INFO_FILE.read_text(encoding="utf-8")
        return ""

    query_words = set(query.lower().split())

    scores: List[Tuple[int, str]] = []
    for chunk in _chunks:
        chunk_lower = chunk.lower()
        score = sum(1 for word in query_words if word in chunk_lower)
        scores.append((score, chunk))

    scores.sort(key=lambda x: x[0], reverse=True)
    top_chunks = [chunk for _, chunk in scores[:TOP_K]]
    return "\n\n---\n\n".join(top_chunks)
