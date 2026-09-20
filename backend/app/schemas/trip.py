from typing import List, Optional, Dict, Any
from pydantic import BaseModel, ConfigDict, Field


class TripPlanRequest(BaseModel):
    destination: str
    days: int = Field(default=4, ge=1, le=30)
    budget: float = Field(default=20000, ge=1000)
    interests: List[str] = Field(default_factory=list)
    travelers: str = "Couple"
    travelStyle: str = "balanced"


class ActivityResponse(BaseModel):
    id: str
    time: str
    title: str
    desc: str
    cost: float
    tag: str
    isVulnerable: bool = False
    status: str = "planned"
    venue: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None


class DayDataResponse(BaseModel):
    dayNumber: int
    title: str
    dayBudget: float
    activities: List[ActivityResponse]


class BreakdownResponse(BaseModel):
    stay: int
    transport: int
    food: int
    activities: int


class TripResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    success: bool = True
    tripId: str
    destination: str
    slug: str
    image: Optional[str] = None
    days: int
    totalBudget: float
    plannedCost: float
    savings: float
    travelers: str
    travelStyle: str
    status: str
    breakdown: BreakdownResponse
    daysData: List[DayDataResponse]
    createdAt: Optional[str] = None
    updatedAt: Optional[str] = None


class TripListSummary(BaseModel):
    id: str
    destination: str
    slug: str
    title: str
    image: Optional[str] = None
    dates: str
    days: int
    travelers: str
    status: str
    statusType: str
    totalBudget: float
    spent: float
    disruptionState: str
    nextActivity: str


class TripsListResponse(BaseModel):
    success: bool = True
    data: List[TripListSummary]


class TripUpdateRequest(BaseModel):
    budget: Optional[float] = None
    days: Optional[int] = None
    interests: Optional[List[str]] = None
    travelers: Optional[str] = None
    travelStyle: Optional[str] = None
    status: Optional[str] = None
