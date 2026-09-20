from typing import Dict, Any


def format_inr(amount: float) -> str:
    """Formats a number into standard Indian Rupee format."""
    int_amount = int(round(amount))
    return f"₹{int_amount:,}"


def calculate_budget_breakdown(total_planned: float, travel_style: str = "balanced") -> Dict[str, int]:
    """
    Deterministically breaks down planned expenses across 4 categories:
    - stay
    - transport
    - food
    - activities
    """
    style = travel_style.lower()
    if style == "relaxed":
        # More towards comfortable stays and fine dining
        stay_ratio = 0.50
        transport_ratio = 0.15
        food_ratio = 0.20
        activities_ratio = 0.15
    elif style == "adventurous":
        # More towards high-octane activities and transit
        stay_ratio = 0.35
        transport_ratio = 0.25
        food_ratio = 0.15
        activities_ratio = 0.25
    else:  # balanced
        stay_ratio = 0.45
        transport_ratio = 0.20
        food_ratio = 0.20
        activities_ratio = 0.15

    stay = int(round(total_planned * stay_ratio))
    transport = int(round(total_planned * transport_ratio))
    food = int(round(total_planned * food_ratio))
    activities = int(total_planned - (stay + transport + food))

    return {
        "stay": stay,
        "transport": transport,
        "food": food,
        "activities": max(0, activities)
    }
