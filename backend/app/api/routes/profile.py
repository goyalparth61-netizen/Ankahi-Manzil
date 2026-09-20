from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.security import get_current_user_id
from app.models.profile import Profile
from app.schemas.profile import ProfileResponse, ProfileUpdateRequest
from app.utils.ids import generate_profile_id

router = APIRouter(prefix="/profile", tags=["Profile"])


def get_or_create_profile(db: Session, user_id: str) -> Profile:
    profile = db.query(Profile).filter(Profile.user_id == user_id).first()
    if not profile:
        profile = Profile(
            id=generate_profile_id(),
            user_id=user_id,
            name="Devansh Verma",
            travel_style="balanced",
            budget_preference="Comfort",
            preferred_interests=["Scenic Nature", "Cafes & Nightlife", "Trekking & Hiking"],
            saved_destinations=["manali", "goa", "jaipur"],
            sentinel_enabled=True
        )
        db.add(profile)
        db.commit()
        db.refresh(profile)
    return profile


@router.get("", response_model=ProfileResponse)
def get_profile(
    db: Session = Depends(get_db),
    user_id: str = Depends(get_current_user_id)
):
    profile = get_or_create_profile(db, user_id)
    return ProfileResponse(
        success=True,
        travelStyle=profile.travel_style,
        preferredInterests=profile.preferred_interests or [],
        budgetPreference=profile.budget_preference,
        savedDestinations=profile.saved_destinations or [],
        sentinelEnabled=profile.sentinel_enabled
    )


@router.patch("", response_model=ProfileResponse)
def update_profile(
    updates: ProfileUpdateRequest,
    db: Session = Depends(get_db),
    user_id: str = Depends(get_current_user_id)
):
    profile = get_or_create_profile(db, user_id)

    if updates.travelStyle is not None:
        profile.travel_style = updates.travelStyle
    if updates.preferredInterests is not None:
        profile.preferred_interests = updates.preferredInterests
    if updates.budgetPreference is not None:
        profile.budget_preference = updates.budgetPreference
    if updates.savedDestinations is not None:
        profile.saved_destinations = updates.savedDestinations
    if updates.sentinelEnabled is not None:
        profile.sentinel_enabled = updates.sentinelEnabled

    db.commit()
    db.refresh(profile)

    return ProfileResponse(
        success=True,
        travelStyle=profile.travel_style,
        preferredInterests=profile.preferred_interests or [],
        budgetPreference=profile.budget_preference,
        savedDestinations=profile.saved_destinations or [],
        sentinelEnabled=profile.sentinel_enabled
    )
