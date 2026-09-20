import pytest
from unittest.mock import patch
from app.core.errors import AIProviderUnavailableException


def test_manzilo_request_validation(client):
    # Empty message should fail validation
    resp = client.post("/api/manzilo/chat", json={"message": ""})
    assert resp.status_code == 422


def test_manzilo_suggestion(client):
    resp = client.post("/api/manzilo/suggestion", json={"tripId": "test-trip", "context": "weather"})
    assert resp.status_code == 200
    data = resp.json()
    assert data["success"] is True
    assert "suggestion" in data
    assert data["confidence"] > 0


def test_manzilo_chat_flow_and_widget(client):
    # Create trip first
    plan_resp = client.post("/api/trips/plan", json={
        "destination": "Manali",
        "days": 4,
        "budget": 20000,
        "interests": ["Trekking"],
        "travelers": "Couple",
        "travelStyle": "balanced"
    })
    trip_id = plan_resp.json()["tripId"]

    # Ask about paragliding
    chat_resp = client.post("/api/manzilo/chat", json={
        "message": "Can I add paragliding in Manali tomorrow?",
        "tripId": trip_id
    })
    assert chat_resp.status_code == 200
    data = chat_resp.json()
    assert data["success"] is True
    assert "response" in data
    assert data["widget"] is not None
    assert data["widget"]["type"] == "itinerary-update"
    assert "conversationId" in data


def test_manzilo_ai_provider_failure_graceful_fallback(client):
    # Mock LLM provider to raise AIProviderUnavailableException
    with patch("app.agents.orchestrator.get_llm_provider") as mock_get_provider:
        mock_provider = mock_get_provider.return_value
        mock_provider.chat.side_effect = AIProviderUnavailableException("Mock provider error")

        chat_resp = client.post("/api/manzilo/chat", json={
            "message": "Why did you change my afternoon itinerary?"
        })
        # Server must NOT crash or return unhandled error; fallback reply must be provided
        assert chat_resp.status_code == 200
        data = chat_resp.json()
        assert data["success"] is True
        assert len(data["response"]) > 0
