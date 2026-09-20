from typing import List, Optional, Dict, Any
from pydantic import BaseModel, ConfigDict


class DisruptionResponse(BaseModel):
    id: str
    type: str
    severity: str
    title: str
    affectedActivity: Optional[str] = None
    time: Optional[str] = None
    status: str = "active"
    source: str = "sentinel"
    description: Optional[str] = None


class DisruptionsListResponse(BaseModel):
    success: bool = True
    tripId: str
    disruptions: List[DisruptionResponse]


class MonitorTripResponse(BaseModel):
    success: bool = True
    tripId: str
    checkedAt: str
    conditions: List[Dict[str, Any]]
    disruptions: List[DisruptionResponse]


class ReplanRequest(BaseModel):
    disruptionId: str


class ReplanReasoning(BaseModel):
    problem: str
    constraints: List[str]
    alternativesEvaluated: List[str]
    selectedReason: str


class ReplanNewActivity(BaseModel):
    time: str
    activity: str
    desc: Optional[str] = None
    cost: Optional[float] = None
    tag: Optional[str] = None


class ReplanResponse(BaseModel):
    success: bool = True
    tripId: str
    disruptionId: str
    reasoning: ReplanReasoning
    newActivities: List[ReplanNewActivity]
    additionalCost: float
    message: str
