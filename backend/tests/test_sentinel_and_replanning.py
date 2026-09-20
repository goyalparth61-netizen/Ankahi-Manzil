import pytest
from app.integrations.weather import weather_service


def test_weather_normalization():
    fallback = weather_service._fallback_weather("Manali")
    assert "source" in fallback
    assert "condition" in fallback
    assert "temperature" in fallback
    assert "precipitationProbability" in fallback
    assert "windSpeed" in fallback
    assert "timestamp" in fallback


def test_sentinel_monitor_and_replan(client):
    # 1. Create a trip to monitor
    plan_payload = {
        "destination": "Manali",
        "days": 4,
        "budget": 20000,
        "interests": ["Scenic Nature", "Adventure"],
        "travelers": "Couple",
        "travelStyle": "balanced"
    }
    plan_resp = client.post("/api/trips/plan", json=plan_payload)
    trip_id = plan_resp.json()["tripId"]

    # 2. Trigger Sentinel monitoring with simulation parameter
    monitor_resp = client.post(f"/api/trips/{trip_id}/monitor?simulate_disruption=true")
    assert monitor_resp.status_code == 200
    mon_data = monitor_resp.json()
    assert mon_data["success"] is True
    assert len(mon_data["conditions"]) > 0
    assert len(mon_data["disruptions"]) > 0
    disruption = mon_data["disruptions"][0]
    disruption_id = disruption["id"]
    assert disruption["type"] == "weather"
    assert disruption["status"] == "active"

    # 3. Fetch disruptions
    dis_resp = client.get(f"/api/trips/{trip_id}/disruptions")
    assert dis_resp.status_code == 200
    assert len(dis_resp.json()["disruptions"]) >= 1

    # 4. Trigger Replan
    replan_resp = client.post(f"/api/trips/{trip_id}/replan", json={"disruptionId": disruption_id})
    assert replan_resp.status_code == 200
    rep_data = replan_resp.json()
    assert rep_data["success"] is True
    assert rep_data["disruptionId"] == disruption_id
    assert "reasoning" in rep_data
    assert len(rep_data["newActivities"]) > 0
    assert "additionalCost" in rep_data
    assert "message" in rep_data
