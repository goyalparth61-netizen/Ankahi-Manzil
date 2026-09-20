from typing import List, Optional
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.errors import NotFoundException
from app.models.trip import Trip
from app.models.disruption import Disruption
from app.schemas.disruption import (
    DisruptionsListResponse, DisruptionResponse,
    MonitorTripResponse, ReplanRequest, ReplanResponse
)
from app.services.monitoring_service import monitoring_service
from app.services.replan_service import replan_service

router = APIRouter(prefix="/trips", tags=["Disruptions & Monitoring"])


@router.post("/{trip_id}/monitor", response_model=MonitorTripResponse)
async def monitor_trip(
    trip_id: str,
    simulate_disruption: bool = Query(False, description="Simulate demo weather disruption for presentation"),
    db: Session = Depends(get_db)
):
    """Executes a Sentinel monitoring cycle over weather, transit, and venue alerts."""
    result = await monitoring_service.run_trip_monitoring(
        trip_id=trip_id,
        db=db,
        simulate_disruption=simulate_disruption
    )
    return MonitorTripResponse(**result)


@router.get("/{trip_id}/disruptions", response_model=DisruptionsListResponse)
def get_trip_disruptions(
    trip_id: str,
    db: Session = Depends(get_db)
):
    """Retrieves all active disruptions logged for a trip."""
    trip = db.query(Trip).filter(Trip.id == trip_id).first()
    if not trip:
        raise NotFoundException(f"Trip '{trip_id}' not found", code="TRIP_NOT_FOUND")

    disruptions = db.query(Disruption).filter(
        Disruption.trip_id == trip_id,
        Disruption.status == "active"
    ).all()

    resp_items: List[DisruptionResponse] = []
    for d in disruptions:
        resp_items.append(DisruptionResponse(
            id=d.id,
            type=d.type,
            severity=d.severity,
            title=d.title,
            affectedActivity=d.description,
            time=d.affected_time,
            status=d.status,
            source=d.source,
            description=d.description
        ))

    return DisruptionsListResponse(
        success=True,
        tripId=trip_id,
        disruptions=resp_items
    )


@router.post("/{trip_id}/replan", response_model=ReplanResponse)
async def replan_trip(
    trip_id: str,
    req: ReplanRequest,
    db: Session = Depends(get_db)
):
    """Evaluates alternatives, updates itinerary, and returns reasoning explanation."""
    result = await replan_service.replan_for_disruption(
        trip_id=trip_id,
        disruption_id=req.disruptionId,
        db=db
    )
    return ReplanResponse(**result)
