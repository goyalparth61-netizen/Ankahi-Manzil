import uuid
import time


def generate_id(prefix: str = "") -> str:
    """Generate a clean, unique identifier with an optional prefix."""
    unique_suffix = uuid.uuid4().hex[:8]
    timestamp = int(time.time())
    if prefix:
        return f"{prefix}_{timestamp}_{unique_suffix}"
    return f"{timestamp}_{unique_suffix}"


def generate_trip_id() -> str:
    return generate_id("trip")


def generate_day_id() -> str:
    return generate_id("day")


def generate_activity_id() -> str:
    return generate_id("act")


def generate_disruption_id() -> str:
    return generate_id("dis")


def generate_conversation_id() -> str:
    return generate_id("conv")


def generate_message_id() -> str:
    return generate_id("msg")


def generate_profile_id() -> str:
    return generate_id("prof")
