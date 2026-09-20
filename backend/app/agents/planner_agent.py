from typing import Dict, Any, List
from app.services.trip_planner import trip_planner_service
from app.schemas.trip import TripPlanRequest


class PlannerAgent:
    """Specialized agent responsible for synthesizing and pacing itineraries."""

    @staticmethod
    def assess_feasibility(destination: str, days: int, budget: float) -> Dict[str, Any]:
        return {
            "feasible": budget >= (days * 1200),
            "suggestedDaysRange": "3–6 days",
            "dailyComfortRate": round(budget / max(1, days), 2)
        }
