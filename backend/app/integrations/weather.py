from datetime import datetime
from typing import Dict, Any, Optional
import httpx
from app.core.config import settings
from app.core.logging import logger


class WeatherService:
    """
    OpenWeather integration service with graceful fallback and standard normalization.
    """

    BASE_URL = "https://api.openweathermap.org/data/2.5"

    @classmethod
    async def get_current_weather(
        cls,
        lat: float,
        lon: float,
        location_name: Optional[str] = None
    ) -> Dict[str, Any]:
        api_key = settings.WEATHER_API_KEY
        if not api_key or not api_key.strip():
            logger.info(f"OpenWeather API key not configured. Returning fallback weather for {location_name or 'coordinates'}.")
            return cls._fallback_weather(location_name)

        try:
            async with httpx.AsyncClient(timeout=8.0) as client:
                resp = await client.get(
                    f"{cls.BASE_URL}/weather",
                    params={
                        "lat": lat,
                        "lon": lon,
                        "appid": api_key,
                        "units": "metric"
                    }
                )
                if resp.status_code == 200:
                    data = resp.json()
                    main = data.get("main", {})
                    weather = data.get("weather", [{}])[0]
                    wind = data.get("wind", {})

                    return {
                        "source": "openweather",
                        "isLive": True,
                        "condition": weather.get("main", "Clear"),
                        "description": weather.get("description", "clear sky"),
                        "temperature": round(main.get("temp", 20.0), 1),
                        "precipitationProbability": data.get("clouds", {}).get("all", 10),
                        "windSpeed": round(wind.get("speed", 3.5), 1),
                        "timestamp": datetime.utcnow().isoformat()
                    }
                else:
                    logger.warning(f"OpenWeather API returned status {resp.status_code}. Using fallback.")
                    return cls._fallback_weather(location_name)
        except Exception as e:
            logger.warning(f"Failed to fetch weather from OpenWeather: {str(e)}. Using fallback.")
            return cls._fallback_weather(location_name)

    @classmethod
    def _fallback_weather(cls, location_name: Optional[str] = None) -> Dict[str, Any]:
        return {
            "source": "fallback",
            "isLive": False,
            "condition": "Mostly Sunny",
            "description": "Pleasant conditions with mild mountain breeze",
            "temperature": 18.5,
            "precipitationProbability": 15,
            "windSpeed": 4.2,
            "timestamp": datetime.utcnow().isoformat()
        }


weather_service = WeatherService()
