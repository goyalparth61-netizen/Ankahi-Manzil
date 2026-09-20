import math
from typing import Tuple, Optional, Dict, Any


class RouteOptimizer:
    """
    Computes spatial distances, transit duration estimates,
    and clusters stops to eliminate backtracking.
    """

    @staticmethod
    def haversine_distance_km(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
        """Calculates great-circle distance between two points in kilometers."""
        R = 6371.0  # Earth's radius in km
        dlat = math.radians(lat2 - lat1)
        dlon = math.radians(lon2 - lon1)
        a = (math.sin(dlat / 2) ** 2 +
             math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) *
             math.sin(dlon / 2) ** 2)
        c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
        return round(R * c, 2)

    @staticmethod
    def estimate_travel_time_minutes(distance_km: float, is_mountain: bool = False) -> int:
        """Estimates transit duration based on terrain."""
        # Mountains: ~25 km/h average speed; plains/urban: ~35 km/h
        avg_speed_kmh = 25.0 if is_mountain else 35.0
        hours = distance_km / avg_speed_kmh
        minutes = int(round(hours * 60))
        # Add 10-minute terminal buffer for boarding / parking
        return max(15, minutes + 10)


route_optimizer = RouteOptimizer()
