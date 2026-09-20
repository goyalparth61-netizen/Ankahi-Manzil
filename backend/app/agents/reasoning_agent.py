from typing import Dict, Any, List


class ReasoningAgent:
    """Specialized agent framing explanations for trade-offs and adaptive alterations."""

    @staticmethod
    def construct_justification(
        problem: str,
        old_activity: str,
        new_activity: str,
        delta_cost: float,
        time_slot: str
    ) -> Dict[str, Any]:
        cost_phrase = f"Saved ₹{int(abs(delta_cost)):,}" if delta_cost < 0 else f"+₹{int(delta_cost):,}" if delta_cost > 0 else "Budget neutral"
        return {
            "rationale": f"Adverse risk ({problem}) averted at {time_slot}. Substituted '{old_activity}' with '{new_activity}'. Financial impact: {cost_phrase}."
        }
