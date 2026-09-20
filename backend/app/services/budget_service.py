from typing import Dict, Any, Tuple
from app.utils.money import calculate_budget_breakdown
from app.core.errors import AppException


class BudgetEngine:
    """
    Deterministic Python arithmetic engine for all trip budgeting,
    cost breakdowns, daily allowances, and replan affordability checks.
    """

    @staticmethod
    def validate_budget_ceiling(total_budget: float, days: int) -> None:
        if total_budget <= 0:
            raise AppException(code="INVALID_BUDGET", message="Total budget must be greater than zero.")
        min_per_day = 800.0  # Bare minimum sensible threshold per day in INR
        if total_budget / max(1, days) < min_per_day:
            raise AppException(
                code="BUDGET_TOO_LOW",
                message=f"Budget of ₹{int(total_budget):,} is insufficient for a {days}-day trip. Minimum recommended is ₹{int(min_per_day * days):,}."
            )

    @staticmethod
    def compute_planned_costs(
        total_budget: float,
        days: int,
        travel_style: str = "balanced"
    ) -> Tuple[float, float, Dict[str, int]]:
        """
        Computes planned cost, safety buffer (savings), and 4-tier category allocation.
        Ensures planned cost does not silently exceed total budget (targets ~82-88% planned, 12-18% contingency).
        """
        BudgetEngine.validate_budget_ceiling(total_budget, days)

        # Target utilization percentage
        style = travel_style.lower()
        if style == "relaxed":
            utilization_rate = 0.82
        elif style == "adventurous":
            utilization_rate = 0.88
        else:
            utilization_rate = 0.85

        planned_cost = round(total_budget * utilization_rate, 2)
        savings = round(total_budget - planned_cost, 2)
        breakdown = calculate_budget_breakdown(planned_cost, travel_style=style)

        return planned_cost, savings, breakdown

    @staticmethod
    def compute_replan_impact(
        current_planned_cost: float,
        total_budget: float,
        old_activity_cost: float,
        new_activity_cost: float
    ) -> Dict[str, Any]:
        """
        Deterministically evaluates financial impact of an activity replacement during replanning.
        """
        cost_delta = round(new_activity_cost - old_activity_cost, 2)
        projected_cost = round(current_planned_cost + cost_delta, 2)
        exceeds_budget = projected_cost > total_budget
        remaining_buffer = round(total_budget - projected_cost, 2)

        return {
            "additionalCost": cost_delta,
            "projectedCost": projected_cost,
            "remainingBuffer": remaining_buffer,
            "exceedsBudget": exceeds_budget,
            "exceededBy": max(0.0, round(projected_cost - total_budget, 2))
        }


budget_engine = BudgetEngine()
