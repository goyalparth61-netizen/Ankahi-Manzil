from app.core.config import settings
from app.integrations.llm.base import LLMProvider
from app.integrations.llm.openrouter import OpenRouterProvider
from app.integrations.llm.openai import OpenAIProvider
from app.integrations.llm.gemini import GeminiProvider
from app.integrations.llm.groq import GroqProvider


def get_llm_provider() -> LLMProvider:
    provider = (settings.LLM_PROVIDER or "openrouter").lower()
    if provider == "openai":
        return OpenAIProvider()
    elif provider == "gemini":
        return GeminiProvider()
    elif provider == "groq":
        return GroqProvider()
    else:
        return OpenRouterProvider()


__all__ = [
    "LLMProvider",
    "OpenRouterProvider",
    "OpenAIProvider",
    "GeminiProvider",
    "GroqProvider",
    "get_llm_provider"
]
