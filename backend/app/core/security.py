import uuid
from typing import Optional
from fastapi import Request


DEFAULT_GUEST_USER_ID = "guest_traveler_01"


def get_current_user_id(request: Request) -> str:
    """Extract user_id from headers if present, else fallback to development guest user ID."""
    auth_header = request.headers.get("X-User-ID")
    if auth_header and auth_header.strip():
        return auth_header.strip()
    return DEFAULT_GUEST_USER_ID
