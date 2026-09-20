from typing import List, Dict, Any, Optional
import httpx
from app.integrations.llm.base import LLMProvider
from app.core.config import settings
from app.core.logging import logger
from app.core.errors import AIProviderUnavailableException


class OpenRouterProvider(LLMProvider):
    ENDPOINT = "https://openrouter.ai/api/v1/chat/completions"

    def __init__(self, api_key: Optional[str] = None, model: Optional[str] = None):
        self.api_key = api_key or settings.OPENROUTER_API_KEY
        self.model = model or settings.LLM_MODEL or "openai/gpt-5-nano"

    async def chat(
        self,
        messages: List[Dict[str, str]],
        temperature: float = 0.4,
        max_tokens: int = 1000,
        tools: Optional[List[Dict[str, Any]]] = None
    ) -> str:
        if not self.api_key or not self.api_key.strip():
            logger.warning("OpenRouter API key is missing. Raising AIProviderUnavailableException.")
            raise AIProviderUnavailableException("OpenRouter API key not configured.")

        headers = {
            "Authorization": f"Bearer {self.api_key.strip()}",
            "Content-Type": "application/json",
            "HTTP-Referer": "https://ankahi-manzil.local",
            "X-Title": "Ankahi Manzil Travel Intelligence"
        }

        payload: Dict[str, Any] = {
            "model": self.model,
            "messages": messages,
            "temperature": temperature,
            "max_tokens": max_tokens
        }
        if tools:
            payload["tools"] = tools

        try:
            async with httpx.AsyncClient(timeout=18.0) as client:
                resp = await client.post(self.ENDPOINT, headers=headers, json=payload)
                if resp.status_code == 200:
                    data = resp.json()
                    choices = data.get("choices", [])
                    if choices:
                        return choices[0].get("message", {}).get("content", "").strip()
                    return ""
                else:
                    logger.error(f"OpenRouter returned status {resp.status_code}: {resp.text}")
                    raise AIProviderUnavailableException(f"OpenRouter returned HTTP {resp.status_code}")
        except httpx.TimeoutException:
            logger.error("OpenRouter request timed out.")
            raise AIProviderUnavailableException("Manzilo request timed out. Please try again.")
        except Exception as e:
            logger.error(f"OpenRouter invocation failed: {str(e)}")
            raise AIProviderUnavailableException("Manzilo is temporarily unavailable. Your saved trip remains safe.")
