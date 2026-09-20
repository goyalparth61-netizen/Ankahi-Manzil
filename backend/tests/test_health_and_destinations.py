def test_health_check(client):
    response = client.get("/api/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "ok"
    assert data["service"] == "ankahi-manzil-backend"


def test_get_all_destinations(client):
    response = client.get("/api/destinations")
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    assert len(data["data"]) >= 12

    # Check key destinations
    slugs = [d["slug"] for d in data["data"]]
    assert "manali" in slugs
    assert "goa" in slugs
    assert "jaipur" in slugs
    assert "ladakh" in slugs


def test_get_destinations_search_and_filter(client):
    # Filter by category
    response = client.get("/api/destinations?category=Beaches")
    assert response.status_code == 200
    data = response.json()
    for d in data["data"]:
        assert any(c.lower() == "beaches" for c in d["categories"])

    # Search by query
    response = client.get("/api/destinations?q=pink+city")
    assert response.status_code == 200
    data = response.json()
    assert len(data["data"]) >= 1
    assert data["data"][0]["slug"] == "jaipur"


def test_get_destination_by_slug(client):
    response = client.get("/api/destinations/manali")
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    dest = data["data"]
    assert dest["name"] == "Manali"
    assert dest["rating"] == 4.7
    assert len(dest["topAttractions"]) > 0
    assert "latitude" in dest
    assert "longitude" in dest


def test_get_destination_not_found(client):
    response = client.get("/api/destinations/invalid-destination-slug-xyz")
    assert response.status_code == 404
    data = response.json()
    assert data["success"] is False
    assert data["error"]["code"] == "DESTINATION_NOT_FOUND"
