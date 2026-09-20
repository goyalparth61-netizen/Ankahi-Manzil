from typing import List, Optional, Any, Dict
from fastapi import APIRouter, Depends, Query, status
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.security import get_current_user_id
from app.core.errors import NotFoundException
from app.models.trip import Trip
from app.models.trip_day import TripDay
from app.models.activity import Activity
from app.models.disruption import Disruption
from app.schemas.trip import (
    TripPlanRequest, TripResponse, TripUpdateRequest,
    DayDataResponse, ActivityResponse, BreakdownResponse,
    TripListSummary, TripsListResponse
)
from app.services.trip_planner import trip_planner_service
from app.services.destination_service import find_destination_or_default
from app.services.budget_service import budget_engine

router = APIRouter(prefix="/trips", tags=["Trips"])


def format_trip_detail(trip: Trip) -> Dict[str, Any]:
    dest = find_destination_or_default(trip.destination)
    image = dest.image

    days_data_list: List[DayDataResponse] = []
    days_compat_list: List[Dict[str, Any]] = []

    for day in trip.days_data:
        acts: List[ActivityResponse] = []
        acts_compat: List[Dict[str, Any]] = []

        for act in day.activities:
            act_resp = ActivityResponse(
                id=act.id,
                time=act.time,
                title=act.title,
                desc=act.description,
                cost=act.estimated_cost,
                tag=act.category,
                isVulnerable=act.is_vulnerable,
                status=act.status,
                venue=act.venue,
                latitude=act.latitude,
                longitude=act.longitude
            )
            acts.append(act_resp)
            acts_compat.append({
                "time": act.time,
                "title": act.title,
                "desc": act.description,
                "cost": act.estimated_cost,
                "isVulnerable": act.is_vulnerable,
                "tag": act.category
            })

        days_data_list.append(DayDataResponse(
            dayNumber=day.day_number,
            title=day.title,
            dayBudget=day.estimated_cost,
            activities=acts
        ))

        days_compat_list.append({
            "dayNum": day.day_number,
            "date": f"Day {day.day_number}",
            "title": day.title,
            "activities": acts_compat
        })

    breakdown_dict = trip.breakdown or {}
    breakdown_resp = BreakdownResponse(
        stay=breakdown_dict.get("stay", int(trip.planned_cost * 0.45)),
        transport=breakdown_dict.get("transport", int(trip.planned_cost * 0.20)),
        food=breakdown_dict.get("food", int(trip.planned_cost * 0.20)),
        activities=breakdown_dict.get("activities", int(trip.planned_cost * 0.15))
    )

    # Legacy list format for TripDetails.jsx
    breakdown_list = [
        {"category": "Stay & Lodging", "spent": breakdown_resp.stay, "cap": int(breakdown_resp.stay * 1.15)},
        {"category": "Transit & Transfers", "spent": breakdown_resp.transport, "cap": int(breakdown_resp.transport * 1.15)},
        {"category": "Artisan Dining & Cafes", "spent": breakdown_resp.food, "cap": int(breakdown_resp.food * 1.15)},
        {"category": "Activities & Permits", "spent": breakdown_resp.activities, "cap": int(breakdown_resp.activities * 1.15)},
    ]

    active_disruptions = [d for d in trip.disruptions if d.status == "active"]
    disruption_state = f"{len(active_disruptions)} Active Disruption" if active_disruptions else "Clear • Radar Scanning 24/7"

    return {
        "success": True,
        "tripId": trip.id,
        "id": trip.id,
        "title": f"{trip.destination} Adaptive Expedition",
        "destination": trip.destination,
        "slug": trip.destination_slug,
        "image": image,
        "days": trip.days,
        "duration": f"{trip.days} Days, {max(1, trip.days - 1)} Nights",
        "dates": "Custom Scheduled",
        "totalBudget": trip.total_budget,
        "budgetTotal": trip.total_budget,
        "plannedCost": trip.planned_cost,
        "budgetSpent": trip.planned_cost,
        "spent": trip.planned_cost,
        "savings": trip.savings,
        "travelers": trip.travelers,
        "travelStyle": trip.travel_style,
        "status": "Active Monitoring" if trip.status in ("active", "planned") else trip.status.capitalize(),
        "statusType": trip.status,
        "breakdown": breakdown_resp.model_dump(),
        "breakdownList": breakdown_list,
        "daysData": [d.model_dump() for d in days_data_list],
        "daysCompat": days_compat_list,
        "disruptionState": disruption_state,
        "disruptions": [
            {
                "id": d.id,
                "type": d.type,
                "severity": d.severity,
                "title": d.title,
                "affectedActivity": d.description,
                "time": d.affected_time,
                "status": d.status,
                "source": d.source
            }
            for d in trip.disruptions
        ],
        "createdAt": trip.created_at.isoformat() if trip.created_at else None,
        "updatedAt": trip.updated_at.isoformat() if trip.updated_at else None
    }


@router.post("/plan", response_model=TripResponse)
def plan_trip(
    req: TripPlanRequest,
    db: Session = Depends(get_db),
    user_id: str = Depends(get_current_user_id)
):
    """Generates an optimized, budget-protected trip plan and stores it."""
    return trip_planner_service.plan_trip(req, db, user_id=user_id)


@router.get("", response_model=TripsListResponse)
def list_trips(
    status: Optional[str] = Query(None),
    db: Session = Depends(get_db),
    user_id: str = Depends(get_current_user_id)
):
    """Lists trips for the active user, optionally filtered by status."""
    query = db.query(Trip)
    if user_id:
        query = query.filter(Trip.user_id == user_id)
    if status and status.lower() != "all":
        query = query.filter(Trip.status == status.lower())

    trips = query.order_by(Trip.created_at.desc()).all()

    summaries: List[TripListSummary] = []
    for t in trips:
        dest = find_destination_or_default(t.destination)
        active_dis = [d for d in t.disruptions if d.status == "active"]
        dis_text = f"{len(active_dis)} Disruptions Logged" if active_dis else "Sentinel Guard Active"

        summaries.append(TripListSummary(
            id=t.id,
            destination=t.destination,
            slug=t.destination_slug,
            title=f"{t.destination} Adaptive Expedition",
            image=dest.image,
            dates="Custom Scheduled",
            days=t.days,
            travelers=t.travelers,
            status="Active Monitoring" if t.status in ("active", "planned") else t.status.capitalize(),
            statusType=t.status,
            totalBudget=t.total_budget,
            spent=t.planned_cost,
            disruptionState=dis_text,
            nextActivity="Day 1 Check-in"
        ))

    return TripsListResponse(success=True, data=summaries)


@router.get("/{trip_id}")
def get_trip_by_id(
    trip_id: str,
    db: Session = Depends(get_db)
):
    """Retrieves full trip details including daysData, activities, and budget breakdowns."""
    trip = db.query(Trip).filter(Trip.id == trip_id).first()
    if not trip:
        raise NotFoundException(f"Trip with ID '{trip_id}' not found", code="TRIP_NOT_FOUND")

    return format_trip_detail(trip)


@router.patch("/{trip_id}")
def update_trip(
    trip_id: str,
    updates: TripUpdateRequest,
    db: Session = Depends(get_db)
):
    """Updates trip attributes like budget, travelers, style, or status."""
    trip = db.query(Trip).filter(Trip.id == trip_id).first()
    if not trip:
        raise NotFoundException(f"Trip with ID '{trip_id}' not found", code="TRIP_NOT_FOUND")

    if updates.budget is not None:
        trip.total_budget = updates.budget
        planned_cost, savings, breakdown = budget_engine.compute_planned_costs(
            total_budget=updates.budget,
            days=trip.days,
            travel_style=trip.travel_style
        )
        trip.planned_cost = planned_cost
        trip.savings = savings
        trip.breakdown = breakdown

    if updates.days is not None:
        trip.days = updates.days

    if updates.travelers is not None:
        trip.travelers = updates.travelers

    if updates.travelStyle is not None:
        trip.travel_style = updates.travelStyle

    if updates.interests is not None:
        trip.interests = updates.interests

    if updates.status is not None:
        trip.status = updates.status.lower()

    db.commit()
    db.refresh(trip)

    return {
        "success": True,
        "tripId": trip.id,
        "message": "Trip updated successfully",
        "data": format_trip_detail(trip)
    }


@router.delete("/{trip_id}")
def delete_trip(
    trip_id: str,
    db: Session = Depends(get_db)
):
    """Deletes a trip and cascades to days, activities, and disruptions."""
    trip = db.query(Trip).filter(Trip.id == trip_id).first()
    if not trip:
        raise NotFoundException(f"Trip with ID '{trip_id}' not found", code="TRIP_NOT_FOUND")

    db.delete(trip)
    db.commit()

    return {
        "success": True,
        "tripId": trip_id,
        "message": f"Trip '{trip_id}' deleted successfully"
    }
