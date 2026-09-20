from typing import List, Dict, Any, Optional
import httpx
from app.core.config import settings
from app.core.logging import logger


LOCAL_CURATED_PLACES: Dict[str, List[Dict[str, Any]]] = {
    "manali": [
        {"name": "Cafe 1947", "category": "Cafe / Dining", "rating": 4.6, "priceLevel": "₹₹", "avgCost": 750, "highlight": "Riverside Italian bistro with live acoustic evenings in Old Manali", "isIndoor": True},
        {"name": "Drifters' Cafe", "category": "Cafe", "rating": 4.5, "priceLevel": "₹₹", "avgCost": 550, "highlight": "Artisan mountain brew, waffles, board games and library lounge", "isIndoor": True},
        {"name": "The Lazy Dog", "category": "Cafe & Bar", "rating": 4.7, "priceLevel": "₹₹₹", "avgCost": 850, "highlight": "Terrace seating overlooking Beas river with gourmet trout and mocktails", "isIndoor": True},
        {"name": "Himalayan Nyin-Gha-Ma Buddhist Temple", "category": "Culture / Museum", "rating": 4.6, "priceLevel": "Free", "avgCost": 50, "highlight": "Tranquil Tibetan prayer hall with ancient wall murals and calm courtyard", "isIndoor": True},
        {"name": "Museum of Himachal Culture & Folk Art", "category": "Museum", "rating": 4.4, "priceLevel": "₹", "avgCost": 150, "highlight": "Fascinating collection of traditional Himachali attire, instruments & woodwork", "isIndoor": True},
        {"name": "Naggar Castle & Roerich Art Gallery", "category": "Culture / Heritage", "rating": 4.8, "priceLevel": "₹₹", "avgCost": 300, "highlight": "Historic timber-stone castle and Russian artist Nicholas Roerich estate", "isIndoor": True},
    ],
    "goa": [
        {"name": "Vinayak Family Restaurant", "category": "Dining", "rating": 4.7, "priceLevel": "₹₹", "avgCost": 600, "highlight": "Legendary fresh fish thali overlooking lush paddy fields in Assagao", "isIndoor": True},
        {"name": "Artjuna Cafe & Lifestyle Garden", "category": "Cafe", "rating": 4.6, "priceLevel": "₹₹", "avgCost": 700, "highlight": "Open-air garden cafe serving organic Mediterranean breakfast and artisan coffee", "isIndoor": True},
        {"name": "Houses of Goa Museum", "category": "Museum", "rating": 4.5, "priceLevel": "₹", "avgCost": 200, "highlight": "Unique triangular museum celebrating Indo-Portuguese residential architecture", "isIndoor": True},
    ]
}


class PlacesService:
    """
    Google Places API integration for POI discovery, nearby restaurants,
    cafes, and indoor contingencies, with structured local fallback.
    """

    PLACES_NEARBY_URL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json"

    @classmethod
    async def search_nearby(
        cls,
        lat: float,
        lon: float,
        keyword: str = "cafe",
        place_type: Optional[str] = None,
        radius_meters: int = 5000,
        destination_slug: Optional[str] = "manali"
    ) -> List[Dict[str, Any]]:
        api_key = settings.PLACES_API_KEY
        if api_key and api_key.strip():
            try:
                params = {
                    "location": f"{lat},{lon}",
                    "radius": radius_meters,
                    "keyword": keyword,
                    "key": api_key
                }
                if place_type:
                    params["type"] = place_type

                async with httpx.AsyncClient(timeout=6.0) as client:
                    resp = await client.get(cls.PLACES_NEARBY_URL, params=params)
                    if resp.status_code == 200:
                        results = resp.json().get("results", [])
                        places = []
                        for r in results[:6]:
                            places.append({
                                "name": r.get("name"),
                                "rating": r.get("rating", 4.5),
                                "vicinity": r.get("vicinity", ""),
                                "category": r.get("types", ["Attraction"])[0].replace("_", " ").title(),
                                "highlight": f"Verified venue rated {r.get('rating', 4.5)}/5 near coordinates",
                                "avgCost": 500,
                                "isIndoor": True
                            })
                        if places:
                            return places
            except Exception as e:
                logger.warning(f"Google Places API query failed: {str(e)}")

        # Fallback to destination curated catalog
        slug = (destination_slug or "manali").lower()
        candidates = LOCAL_CURATED_PLACES.get(slug, LOCAL_CURATED_PLACES["manali"])

        kw = keyword.lower()
        filtered = [c for c in candidates if kw in c["name"].lower() or kw in c["category"].lower() or kw in c["highlight"].lower()]
        return filtered if filtered else candidates[:4]


places_service = PlacesService()
