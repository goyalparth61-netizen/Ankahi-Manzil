from typing import List, Optional, Any
from pydantic import BaseModel


class ProfileResponse(BaseModel):
    success: bool = True
    travelStyle: str = "balanced"
    preferredInterests: List[str] = []
    budgetPreference: Optional[str] = None
    savedDestinations: List[Any] = []
    sentinelEnabled: bool = True


class ProfileUpdateRequest(BaseModel):
    travelStyle: Optional[str] = None
    preferredInterests: Optional[List[str]] = None
    budgetPreference: Optional[str] = None
    savedDestinations: Optional[List[Any]] = None
    sentinelEnabled: Optional[bool] = None
