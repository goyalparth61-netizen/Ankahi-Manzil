import pytest
from app.services.budget_service import budget_engine
from app.services.conflict_detector import conflict_detector
from app.core.errors import AppException


def test_budget_engine_deterministic_allocations():
    total_budget = 20000.0
    days = 4
    planned_cost, savings, breakdown = budget_engine.compute_planned_costs(
        total_budget=total_budget,
        days=days,
        travel_style="balanced"
    )

    # 1. Total planned + savings must equal total budget
    assert planned_cost + savings == total_budget
    assert planned_cost > 0
    assert savings > 0

    # 2. Sum of 4 breakdown buckets must equal planned_cost
    assert breakdown["stay"] + breakdown["transport"] + breakdown["food"] + breakdown["activities"] == int(planned_cost)

    # 3. Stay allocation should be around 45% of planned cost (0.45 * 17000 = 7650)
    assert 7000 <= breakdown["stay"] <= 9000


def test_budget_engine_insufficient_ceiling():
    with pytest.raises(AppException) as exc:
        budget_engine.compute_planned_costs(total_budget=500.0, days=4)
    assert exc.value.code == "BUDGET_TOO_LOW"


def test_conflict_detector_identifies_overlaps():
    activities = [
        {"title": "Arrival", "time": "09:00"},
        {"title": "Guided Trek", "time": "09:05"},  # Only 5 minutes buffer
    ]
    conflicts = conflict_detector.check_day_schedule_conflicts(activities, min_buffer_minutes=15)
    assert len(conflicts) > 0
    assert conflicts[0]["type"] == "schedule_overlap"
    assert "suggestedAdjustment" in conflicts[0]


def test_conflict_detector_identifies_duplicates():
    activities = [
        {"title": "Solang Valley", "time": "09:00"},
        {"title": "Solang Valley", "time": "14:00"},
    ]
    conflicts = conflict_detector.check_day_schedule_conflicts(activities)
    assert any(c["type"] == "duplicate" for c in conflicts)


def test_conflict_detector_identifies_impossible_order():
    activities = [
        {"title": "Afternoon Tea", "time": "16:00"},
        {"title": "Morning Walk", "time": "08:00"},
    ]
    conflicts = conflict_detector.check_day_schedule_conflicts(activities)
    assert any(c["type"] == "impossible_ordering" for c in conflicts)
