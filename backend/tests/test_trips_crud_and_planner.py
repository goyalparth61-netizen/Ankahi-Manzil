def test_plan_and_crud_trip(client):
    # 1. Plan trip
    plan_payload = {
        "destination": "Manali",
        "days": 4,
        "budget": 20000,
        "interests": ["Scenic Nature", "Cafes & Nightlife", "Trekking & Hiking"],
        "travelers": "Couple",
        "travelStyle": "balanced"
    }
    response = client.post("/api/trips/plan", json=plan_payload)
    assert response.status_code == 200
    trip_data = response.json()

    assert trip_data["success"] is True
    assert "tripId" in trip_data
    trip_id = trip_data["tripId"]
    assert trip_data["destination"] == "Manali"
    assert trip_data["slug"] == "manali"
    assert trip_data["days"] == 4
    assert trip_data["totalBudget"] == 20000
    assert trip_data["plannedCost"] > 0
    assert trip_data["savings"] > 0
    assert "breakdown" in trip_data
    assert len(trip_data["daysData"]) == 4

    # 2. Get trips list
    list_resp = client.get("/api/trips")
    assert list_resp.status_code == 200
    trips_list = list_resp.json()["data"]
    assert any(t["id"] == trip_id for t in trips_list)

    # 3. Get trip by id
    get_resp = client.get(f"/api/trips/{trip_id}")
    assert get_resp.status_code == 200
    fetched = get_resp.json()
    assert fetched["destination"] == "Manali"
    assert len(fetched["daysData"]) == 4

    # 4. Patch trip budget
    patch_resp = client.patch(f"/api/trips/{trip_id}", json={"budget": 25000})
    assert patch_resp.status_code == 200
    assert patch_resp.json()["data"]["totalBudget"] == 25000

    # 5. Invalid trip ID returns 404
    bad_resp = client.get("/api/trips/non-existent-trip-id-999")
    assert bad_resp.status_code == 404
    assert bad_resp.json()["error"]["code"] == "TRIP_NOT_FOUND"

    # 6. Delete trip
    del_resp = client.delete(f"/api/trips/{trip_id}")
    assert del_resp.status_code == 200
    assert del_resp.json()["success"] is True

    # 7. Verify deletion
    verify_resp = client.get(f"/api/trips/{trip_id}")
    assert verify_resp.status_code == 404
