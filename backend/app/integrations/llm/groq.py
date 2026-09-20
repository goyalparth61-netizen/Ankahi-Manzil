from typing import List, Dict, Any, Optional
import httpx
from app.integrations.llm.base import LLMProvider
from app.core.config import settings
from app.core.logging import logger
from app.core.errors import AIProviderUnavailableException


class GroqProvider(LLMProvider):
    ENDPOINT = "https://api.groq.com/openai/v1/chat/completions"

    def __init__(self, api_key: Optional[str] = None, model: Optional[str] = None):
        self.api_key = api_key or settings.GROQ_API_KEY
        self.model = model or "llama-3.1-8b-instant"

    async def chat(
        self,
        messages: List[Dict[str, str]],
        temperature: float = 0.4,
        max_tokens: int = 1000,
        tools: Optional[List[Dict[str, Any]]] = None
    ) -> str:
        if not self.api_key or not self.api_key.strip():
            raise AIProviderUnavailableException("Groq API key not configured.")

        headers = {
            "Authorization": f"Bearer {self.api_key.strip()}",
            "Content-Type": "application/json"
        }
        payload = {
            "model": self.model,
            "messages": messages,
            "temperature": temperature,
            "max_tokens": max_tokens
        }

        try:
            async with httpx.AsyncClient(timeout=18.0) as client:
                resp = await client.post(self.ENDPOINT, headers=headers, json=payload)
                if resp.status_code == 200:
                    data = resp.json()
                    choices = data.get("choices", [])
                    if choices:
                        return choices[0].get("message", {}).get("content", "").strip()
                raise AIProviderUnavailableException(f"Groq error {resp.status_code}")
        except Exception as e:
            logger.error(f"Groq call failed: {str(e)}")
            raise AIProviderUnavailableException("Manzilo is temporarily unavailable.")
