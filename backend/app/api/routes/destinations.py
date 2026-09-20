from typing import Optional
from fastapi import APIRouter, Query
from app.schemas.destination import DestinationsListResponse, DestinationResponse
from app.services.destination_service import get_all_destinations, get_destination_by_slug

router = APIRouter(prefix="/destinations", tags=["Destinations"])


@router.get("", response_model=DestinationsListResponse)
def list_destinations(
    q: Optional[str] = Query(None, description="Search query across name, description, categories"),
    category: Optional[str] = Query(None, description="Filter by category")
):
    """Retrieve all curated destinations with optional search and category filters."""
    destinations = get_all_destinations(q=q, category=category)
    return DestinationsListResponse(success=True, data=destinations)


@router.get("/{slug}", response_model=DestinationResponse)
def get_destination(slug: str):
    """Retrieve detailed information, attractions, and activities for a single destination."""
    destination = get_destination_by_slug(slug)
    return DestinationResponse(success=True, data=destination)
