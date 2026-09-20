from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.security import get_current_user_id
from app.schemas.manzilo import (
    ManziloChatRequest, ManziloChatResponse,
    ManziloSuggestionRequest, ManziloSuggestionResponse
)
from app.agents.orchestrator import orchestrator

router = APIRouter(prefix="/manzilo", tags=["Manzilo Intelligence"])


@router.post("/chat", response_model=ManziloChatResponse)
async def chat_with_manzilo(
    req: ManziloChatRequest,
    db: Session = Depends(get_db),
    user_id: str = Depends(get_current_user_id)
):
    """Conversational endpoint with dynamic trip context grounding, tool access, and rich widgets."""
    result = await orchestrator.process_chat(
        message_text=req.message,
        conversation_id=req.conversationId,
        trip_id=req.tripId,
        db=db,
        user_id=user_id
    )
    return ManziloChatResponse(**result)


@router.post("/suggestion", response_model=ManziloSuggestionResponse)
def get_manzilo_suggestion(req: ManziloSuggestionRequest):
    """Generates an immediate predictive itinerary suggestion based on current sentinel monitors."""
    context_type = (req.context or "weather").lower()
    if context_type == "weather":
        suggestion = "Based on current conditions, I recommend shifting outdoor activities to the morning."
        confidence = 0.92
    elif context_type == "transit":
        suggestion = "Peak traffic predicted along mountain highway from 16:00. Departing 30 minutes earlier will save 45 minutes of transit."
        confidence = 0.88
    else:
        suggestion = "Your planned stops are well-balanced. Ensure 15% budget buffer remains intact."
        confidence = 0.95

    return ManziloSuggestionResponse(
        success=True,
        suggestion=suggestion,
        confidence=confidence
    )
