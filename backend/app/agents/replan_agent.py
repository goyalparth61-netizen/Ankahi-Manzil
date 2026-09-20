from typing import Dict, Any
from sqlalchemy.orm import Session
from app.services.replan_service import replan_service


class ReplanAgent:
    """Specialized agent orchestrating itinerary replacements and contingency swaps."""

    @staticmethod
    async def execute_replan(trip_id: str, disruption_id: str, db: Session) -> Dict[str, Any]:
        return await replan_service.replan_for_disruption(trip_id, disruption_id, db)
