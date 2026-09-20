from typing import List, Dict, Any
from app.services.conflict_detector import conflict_detector


class DetectorAgent:
    """Specialized agent identifying schedule anomalies, transit bottlenecks, and overlaps."""

    @staticmethod
    def audit_itinerary(activities: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        return conflict_detector.check_day_schedule_conflicts(activities)
