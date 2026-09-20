from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field


class ManziloChatRequest(BaseModel):
    message: str = Field(..., min_length=1, max_length=2000)
    conversationId: Optional[str] = None
    tripId: Optional[str] = None


class ManziloChatResponse(BaseModel):
    success: bool = True
    conversationId: str
    response: str
    widget: Optional[Dict[str, Any]] = None
    actions: List[Dict[str, Any]] = Field(default_factory=list)
    context: Dict[str, Any] = Field(default_factory=dict)
    timestamp: str


class ManziloSuggestionRequest(BaseModel):
    tripId: str
    context: Optional[str] = "weather"


class ManziloSuggestionResponse(BaseModel):
    success: bool = True
    suggestion: str
    confidence: float
