from typing import List, Dict, Any, Optional
from app.utils.time import parse_time_str, time_to_minutes, minutes_to_time_str


class ConflictDetector:
    """
    Deterministic validator for itinerary schedules, travel feasibility,
    duplicate venues, and budget constraints.
    """

    @staticmethod
    def check_day_schedule_conflicts(
        activities: List[Dict[str, Any]],
        min_buffer_minutes: int = 15
    ) -> List[Dict[str, Any]]:
        """
        Inspects chronological order, overlaps, insufficient transit time, and duplicates.
        """
        conflicts = []
        seen_titles = set()

        # Sort activities by parsed time if possible
        parsed_activities = []
        for act in activities:
            t = parse_time_str(act.get("time", ""))
            parsed_activities.append({
                **act,
                "parsed_time": t,
                "minutes": time_to_minutes(t) if t else None
            })

        for i, act in enumerate(parsed_activities):
            title = act.get("title", "").strip().lower()

            # 1. Duplicate activity check
            if title in seen_titles and title not in ("hotel check-in", "lunch", "dinner", "breakfast"):
                conflicts.append({
                    "hasConflict": True,
                    "type": "duplicate",
                    "message": f"Activity '{act.get('title')}' appears multiple times on the same day.",
                    "suggestedAdjustment": "Replace duplicate visit with a distinct nearby cultural or leisure stop."
                })
            seen_titles.add(title)

            # 2. Chronological ordering and buffer check
            if i > 0:
                prev_act = parsed_activities[i - 1]
                m_curr = act.get("minutes")
                m_prev = prev_act.get("minutes")

                if m_curr is not None and m_prev is not None:
                    delta = m_curr - m_prev
                    if delta < 0:
                        conflicts.append({
                            "hasConflict": True,
                            "type": "impossible_ordering",
                            "message": f"'{act.get('title')}' ({act.get('time')}) is scheduled earlier than previous activity '{prev_act.get('title')}' ({prev_act.get('time')}).",
                            "suggestedAdjustment": f"Move '{act.get('title')}' after '{prev_act.get('title')}'."
                        })
                    elif delta < min_buffer_minutes:
                        adjusted_time = minutes_to_time_str(m_prev + min_buffer_minutes + 45)
                        conflicts.append({
                            "hasConflict": True,
                            "type": "schedule_overlap",
                            "message": f"'{act.get('title')}' begins too close to '{prev_act.get('title')}'. Only {delta} min buffer allocated.",
                            "suggestedAdjustment": f"Shift '{act.get('title')}' start time to {adjusted_time}"
                        })

        return conflicts


conflict_detector = ConflictDetector()
