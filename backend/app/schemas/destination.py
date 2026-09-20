from typing import List, Optional
from pydantic import BaseModel, ConfigDict, Field


class DestinationBase(BaseModel):
    id: int
    slug: str
    name: str
    image: str
    categories: List[str]
    rating: float
    description: str
    bestTime: str
    budget: str
    suggestedDays: str
    weather: str
    about: str
    topAttractions: List[str]
    thingsToDo: List[str]
    nearby: List[str]
    latitude: float
    longitude: float


class DestinationResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    success: bool = True
    data: DestinationBase


class DestinationsListResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    success: bool = True
    data: List[DestinationBase]
