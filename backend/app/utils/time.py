import re
from datetime import datetime, time as dt_time, timedelta
from typing import Optional, Tuple


def parse_time_str(time_str: str) -> Optional[dt_time]:
    """
    Parses various time representations (e.g. '09:00', '9:30 AM', '15:30', '3:00 PM')
    into a Python datetime.time object.
    """
    if not time_str:
        return None
    cleaned = time_str.strip().upper()

    formats = [
        "%H:%M",
        "%I:%M %p",
        "%I:%M%p",
        "%H:%M:%S"
    ]
    for fmt in formats:
        try:
            return datetime.strptime(cleaned, fmt).time()
        except ValueError:
            continue
    return None


def time_to_minutes(t: dt_time) -> int:
    return t.hour * 60 + t.minute


def minutes_to_time_str(minutes: int) -> str:
    h = (minutes // 60) % 24
    m = minutes % 60
    return f"{h:02d}:{m:02d}"


def calculate_minutes_between(start_str: str, end_str: str) -> Optional[int]:
    """Returns the difference in minutes between two time strings."""
    t1 = parse_time_str(start_str)
    t2 = parse_time_str(end_str)
    if not t1 or not t2:
        return None
    m1 = time_to_minutes(t1)
    m2 = time_to_minutes(t2)
    return m2 - m1


def add_minutes_to_time(time_str: str, minutes_to_add: int) -> str:
    """Adds minutes to a time string and returns in HH:MM format."""
    t = parse_time_str(time_str)
    if not t:
        return time_str
    m = time_to_minutes(t) + minutes_to_add
    return minutes_to_time_str(m)
