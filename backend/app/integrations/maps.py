from typing import Optional, Dict, Any, Tuple
import httpx
from app.core.config import settings
from app.core.logging import logger
from app.services.route_optimizer import route_optimizer


class MapsService:
    """
    Google Maps integration for geocoding and route distance/matrix calculations
    with robust fallback to haversine geodesic approximations.
    """

    GEOCODE_URL = "https://maps.googleapis.com/maps/api/geocode/json"
    DIRECTIONS_URL = "https://maps.googleapis.com/maps/api/directions/json"

    @classmethod
    async def geocode(cls, address: str) -> Optional[Tuple[float, float]]:
        api_key = settings.MAPS_API_KEY
        if not api_key or not api_key.strip():
            return None

        try:
            async with httpx.AsyncClient(timeout=6.0) as client:
                resp = await client.get(
                    cls.GEOCODE_URL,
                    params={"address": address, "key": api_key}
                )
                if resp.status_code == 200:
                    data = resp.json()
                    results = data.get("results", [])
                    if results:
                        loc = results[0]["geometry"]["location"]
                        return loc["lat"], loc["lng"]
        except Exception as e:
            logger.warning(f"Google Maps geocoding failed for '{address}': {str(e)}")
        return None

    @classmethod
    async def calculate_route_transit(
        cls,
        origin_lat: float,
        origin_lon: float,
        dest_lat: float,
        dest_lon: float,
        is_mountain: bool = False
    ) -> Dict[str, Any]:
        """
        Calculates distance in km and duration in minutes via Google Directions API,
        or falls back to Haversine speed modeling.
        """
        api_key = settings.MAPS_API_KEY
        if api_key and api_key.strip():
            try:
                async with httpx.AsyncClient(timeout=6.0) as client:
                    resp = await client.get(
                        cls.DIRECTIONS_URL,
                        params={
                            "origin": f"{origin_lat},{origin_lon}",
                            "destination": f"{dest_lat},{dest_lon}",
                            "key": api_key
                        }
                    )
                    if resp.status_code == 200:
                        data = resp.json()
                        routes = data.get("routes", [])
                        if routes and routes[0].get("legs"):
                            leg = routes[0]["legs"][0]
                            dist_m = leg.get("distance", {}).get("value", 0)
                            dur_s = leg.get("duration", {}).get("value", 0)
                            return {
                                "source": "google_maps",
                                "distanceKm": round(dist_m / 1000.0, 2),
                                "durationMinutes": max(10, int(round(dur_s / 60.0))),
                                "summary": leg.get("duration", {}).get("text", "Normal traffic")
                            }
            except Exception as e:
                logger.warning(f"Google Maps directions API error: {str(e)}")

        # Fallback to deterministic route calculation
        dist_km = route_optimizer.haversine_distance_km(origin_lat, origin_lon, dest_lat, dest_lon)
        dur_mins = route_optimizer.estimate_travel_time_minutes(dist_km, is_mountain=is_mountain)

        return {
            "source": "fallback_haversine",
            "distanceKm": dist_km,
            "durationMinutes": dur_mins,
            "summary": f"Estimated ~{dur_mins} mins via scenic route"
        }


maps_service = MapsService()
