from abc import ABC, abstractmethod
from typing import List, Dict, Any, Optional


class LLMProvider(ABC):
    """
    Abstract base class for all LLM providers supporting chat completions,
    structured JSON outputs, and controlled tool invocations.
    """

    @abstractmethod
    async def chat(
        self,
        messages: List[Dict[str, str]],
        temperature: float = 0.4,
        max_tokens: int = 1000,
        tools: Optional[List[Dict[str, Any]]] = None
    ) -> str:
        """Executes a chat completion and returns the generated text response."""
        pass
