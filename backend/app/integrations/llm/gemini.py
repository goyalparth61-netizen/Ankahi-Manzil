from typing import List, Dict, Any, Optional
import httpx
from app.integrations.llm.base import LLMProvider
from app.core.config import settings
from app.core.logging import logger
from app.core.errors import AIProviderUnavailableException


class GeminiProvider(LLMProvider):
    ENDPOINT = "https://generativelanguage.googleapis.com/v1beta/models"

    def __init__(self, api_key: Optional[str] = None, model: Optional[str] = None):
        self.api_key = api_key or settings.GEMINI_API_KEY
        self.model = model or "gemini-1.5-flash"

    async def chat(
        self,
        messages: List[Dict[str, str]],
        temperature: float = 0.4,
        max_tokens: int = 1000,
        tools: Optional[List[Dict[str, Any]]] = None
    ) -> str:
        if not self.api_key or not self.api_key.strip():
            raise AIProviderUnavailableException("Gemini API key not configured.")

        # Convert chat messages to Gemini contents format
        contents = []
        system_instruction = None
        for m in messages:
            role = m.get("role")
            content = m.get("content", "")
            if role == "system":
                system_instruction = {"parts": [{"text": content}]}
            else:
                gemini_role = "user" if role == "user" else "model"
                contents.append({"role": gemini_role, "parts": [{"text": content}]})

        url = f"{self.ENDPOINT}/{self.model}:generateContent?key={self.api_key.strip()}"
        body: Dict[str, Any] = {
            "contents": contents,
            "generationConfig": {"temperature": temperature, "maxOutputTokens": max_tokens}
        }
        if system_instruction:
            body["systemInstruction"] = system_instruction

        try:
            async with httpx.AsyncClient(timeout=18.0) as client:
                resp = await client.post(url, json=body)
                if resp.status_code == 200:
                    data = resp.json()
                    candidates = data.get("candidates", [])
                    if candidates:
                        parts = candidates[0].get("content", {}).get("parts", [])
                        if parts:
                            return parts[0].get("text", "").strip()
                raise AIProviderUnavailableException(f"Gemini error {resp.status_code}")
        except Exception as e:
            logger.error(f"Gemini call failed: {str(e)}")
            raise AIProviderUnavailableException("Manzilo is temporarily unavailable.")
