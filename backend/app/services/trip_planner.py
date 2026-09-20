from datetime import datetime
from typing import Dict, Any, List, Optional
from sqlalchemy.orm import Session
from app.models.trip import Trip
from app.models.trip_day import TripDay
from app.models.activity import Activity
from app.services.destination_service import find_destination_or_default
from app.services.budget_service import budget_engine
from app.services.conflict_detector import conflict_detector
from app.schemas.trip import TripPlanRequest, TripResponse, DayDataResponse, ActivityResponse, BreakdownResponse
from app.utils.ids import generate_trip_id, generate_day_id, generate_activity_id


class TripPlannerService:
    """
    Synthesizes adaptive travel itineraries, groups activities geographically,
    assigns vulnerability flags to outdoor activities, and persists normalized trip records.
    """

    @staticmethod
    def plan_trip(req: TripPlanRequest, db: Session, user_id: Optional[str] = None) -> TripResponse:
        dest = find_destination_or_default(req.destination)

        # 1. Budget validation and computation
        planned_cost, savings, breakdown = budget_engine.compute_planned_costs(
            total_budget=req.budget,
            days=req.days,
            travel_style=req.travelStyle
        )

        trip_id = generate_trip_id()

        # Build day by day itinerary
        days_data: List[DayDataResponse] = []
        db_days: List[TripDay] = []

        # Calculate daily accommodation allowance
        daily_stay_cost = round(breakdown["stay"] / max(1, req.days), 2)

        for d in range(1, req.days + 1):
            day_id = generate_day_id()
            activities_list: List[ActivityResponse] = []
            db_activities: List[Activity] = []

            if d == 1:
                title = "Arrival & Key Landmarks"
                items = [
                    {
                        "time": "09:00",
                        "title": "Arrival & Hotel Check-in",
                        "desc": f"Check-in and settle at pre-verified accommodation in {dest.name}. Route orientation & local briefing.",
                        "cost": 0.0,
                        "tag": "Logistics",
                        "isVulnerable": False
                    },
                    {
                        "time": "11:30",
                        "title": dest.topAttractions[0] if len(dest.topAttractions) > 0 else "Historic City Center",
                        "desc": f"Iconic cultural walkthrough and guided heritage orientation in {dest.name}.",
                        "cost": 350.0,
                        "tag": "Culture",
                        "isVulnerable": False
                    },
                    {
                        "time": "13:30",
                        "title": "Authentic Regional Lunch",
                        "desc": "Curated lunch spot serving authentic regional cuisine away from tourist crowds.",
                        "cost": 850.0,
                        "tag": "Food",
                        "isVulnerable": False
                    },
                    {
                        "time": "15:30",
                        "title": dest.topAttractions[1] if len(dest.topAttractions) > 1 else "Scenic Valley Pass",
                        "desc": "Panoramic high-point view and gentle outdoor walk. Monitored for weather changes.",
                        "cost": 1200.0,
                        "tag": "Adventure",
                        "isVulnerable": True
                    },
                    {
                        "time": "19:00",
                        "title": "Local Market & Evening Promenade",
                        "desc": "Handicrafts, artisanal souvenirs, street snacks, and vibrant evening culture.",
                        "cost": 600.0,
                        "tag": "Leisure",
                        "isVulnerable": False
                    }
                ]
            elif d == 2:
                title = "Immersive Adventures & Heritage"
                outdoor_act = dest.thingsToDo[0] if len(dest.thingsToDo) > 0 else "Valley Trek & Outdoor Activity"
                items = [
                    {
                        "time": "08:30",
                        "title": "Sunrise Viewpoint & Breakfast",
                        "desc": "Scenic morning walk with specialty regional breakfast brew.",
                        "cost": 450.0,
                        "tag": "Food",
                        "isVulnerable": False
                    },
                    {
                        "time": "10:30",
                        "title": outdoor_act,
                        "desc": f"Curated outdoor route optimized for weather safety and minimal foot traffic in {dest.name}.",
                        "cost": 1800.0,
                        "tag": "Adventure",
                        "isVulnerable": True
                    },
                    {
                        "time": "14:00",
                        "title": "Riverside Garden Lunch",
                        "desc": "Fresh farm-to-table lunch overlooking nature with local seasonal produce.",
                        "cost": 950.0,
                        "tag": "Food",
                        "isVulnerable": False
                    },
                    {
                        "time": "16:30",
                        "title": dest.topAttractions[2] if len(dest.topAttractions) > 2 else "Heritage Sanctuary",
                        "desc": "Tranquil cultural sanctuary visit with local heritage storyteller.",
                        "cost": 400.0,
                        "tag": "Culture",
                        "isVulnerable": False
                    },
                    {
                        "time": "20:00",
                        "title": "Starlit Dining Experience",
                        "desc": "Acoustic ambiance and signature regional dinner under starlit skies.",
                        "cost": 1500.0,
                        "tag": "Dining",
                        "isVulnerable": False
                    }
                ]
            else:
                title = f"Local Gems & Hidden Escapes (Day {d})"
                activity_idx = (d - 1) % len(dest.thingsToDo)
                items = [
                    {
                        "time": "09:30",
                        "title": f"Hidden Hamlet Excursion — {dest.name}",
                        "desc": "Off-the-beaten-path scenic excursion and tranquil nature trail.",
                        "cost": 1200.0,
                        "tag": "Nature",
                        "isVulnerable": True
                    },
                    {
                        "time": "13:00",
                        "title": "Artisan Bistro Lunch",
                        "desc": "Signature regional culinary delicacies and artisanal tea tasting.",
                        "cost": 700.0,
                        "tag": "Food",
                        "isVulnerable": False
                    },
                    {
                        "time": "15:30",
                        "title": dest.thingsToDo[activity_idx] if len(dest.thingsToDo) > activity_idx else "Craft Workshop & Bazaar",
                        "desc": "Interactive hands-on session with master artisans and regional makers.",
                        "cost": 800.0,
                        "tag": "Craft",
                        "isVulnerable": False
                    },
                    {
                        "time": "18:30",
                        "title": "Golden Hour Sunset Watch",
                        "desc": "Prime sunset coordinates curated by Manzilo for breathtaking photography.",
                        "cost": 0.0,
                        "tag": "Scenic",
                        "isVulnerable": False
                    }
                ]

            # Validate day schedule for conflicts
            conflicts = conflict_detector.check_day_schedule_conflicts(items)

            act_sum = sum(item["cost"] for item in items)
            day_budget = round(act_sum + daily_stay_cost, 2)

            for idx, item in enumerate(items):
                act_id = generate_activity_id()
                resp_act = ActivityResponse(
                    id=act_id,
                    time=item["time"],
                    title=item["title"],
                    desc=item["desc"],
                    cost=item["cost"],
                    tag=item["tag"],
                    isVulnerable=item["isVulnerable"],
                    status="planned",
                    latitude=dest.latitude,
                    longitude=dest.longitude
                )
                activities_list.append(resp_act)

                db_act = Activity(
                    id=act_id,
                    trip_day_id=day_id,
                    time=item["time"],
                    title=item["title"],
                    description=item["desc"],
                    category=item["tag"],
                    estimated_cost=item["cost"],
                    latitude=dest.latitude,
                    longitude=dest.longitude,
                    venue=dest.name,
                    status="planned",
                    is_vulnerable=item["isVulnerable"],
                    sequence_order=idx
                )
                db_activities.append(db_act)

            day_resp = DayDataResponse(
                dayNumber=d,
                title=title,
                dayBudget=day_budget,
                activities=activities_list
            )
            days_data.append(day_resp)

            db_day = TripDay(
                id=day_id,
                trip_id=trip_id,
                day_number=d,
                title=title,
                estimated_cost=day_budget,
                activities=db_activities
            )
            db_days.append(db_day)

        # 2. Persist Trip in DB
        db_trip = Trip(
            id=trip_id,
            user_id=user_id,
            destination=dest.name,
            destination_slug=dest.slug,
            days=req.days,
            total_budget=req.budget,
            planned_cost=planned_cost,
            savings=savings,
            travelers=req.travelers,
            travel_style=req.travelStyle,
            interests=req.interests,
            breakdown=breakdown,
            status="planned",
            days_data=db_days
        )
        db.add(db_trip)
        db.commit()
        db.refresh(db_trip)

        return TripResponse(
            success=True,
            tripId=trip_id,
            destination=dest.name,
            slug=dest.slug,
            image=dest.image,
            days=req.days,
            totalBudget=req.budget,
            plannedCost=planned_cost,
            savings=savings,
            travelers=req.travelers,
            travelStyle=req.travelStyle,
            status="planned",
            breakdown=BreakdownResponse(**breakdown),
            daysData=days_data,
            createdAt=db_trip.created_at.isoformat(),
            updatedAt=db_trip.updated_at.isoformat()
        )


trip_planner_service = TripPlannerService()
