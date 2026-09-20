from datetime import datetime
from typing import List, Dict, Any, Optional
from sqlalchemy.orm import Session
from app.models.trip import Trip
from app.models.activity import Activity
from app.models.disruption import Disruption
from app.utils.ids import generate_disruption_id


class DisruptionDetector:
    """
    Evaluates weather risk, transit status, and schedule constraints against
    trip activities, generating structured disruption records when thresholds are crossed.
    """

    @staticmethod
    def evaluate_weather_risk(
        weather: Dict[str, Any],
        activity: Activity
    ) -> Optional[Dict[str, Any]]:
        """
        Determines whether outdoor vulnerable activities are threatened by adverse weather.
        """
        if not activity.is_vulnerable:
            return None

        precip = weather.get("precipitationProbability", 0)
        wind = weather.get("windSpeed", 0.0)
        cond = weather.get("condition", "").lower()

        # Check rain or wind thresholds
        is_rain_threat = precip >= 50 or "rain" in cond or "thunderstorm" in cond
        is_wind_threat = wind >= 10.0 or "wind" in cond

        if is_rain_threat:
            return {
                "type": "weather",
                "severity": "high" if precip >= 75 else "medium",
                "title": f"Rainfall disruption forecasted near {activity.title}",
                "description": f"Precipitation probability at {precip}% and '{weather.get('description', 'rain')}' creates hazardous conditions for outdoor activity.",
                "affected_time": activity.time,
                "source": weather.get("source", "openweather")
            }
        elif is_wind_threat:
            return {
                "type": "weather",
                "severity": "high" if wind >= 15.0 else "medium",
                "title": f"High mountain winds detected near {activity.title}",
                "description": f"Gusty winds of {wind} m/s pose safety risks for {activity.title}.",
                "affected_time": activity.time,
                "source": weather.get("source", "openweather")
            }

        return None

    @staticmethod
    def create_simulated_demo_disruption(activity: Activity) -> Dict[str, Any]:
        """
        Generates a clearly labeled demo disruption for hackathon/presentation verification.
        """
        return {
            "type": "weather",
            "severity": "medium",
            "title": f"Heavy localized rainfall forecasted near {activity.title}",
            "description": f"Precipitation probability 85% at {activity.time} near {activity.title}. Outdoor trail hazardous.",
            "affected_time": activity.time,
            "source": "sentinel_demo_simulation"
        }


disruption_detector = DisruptionDetector()
