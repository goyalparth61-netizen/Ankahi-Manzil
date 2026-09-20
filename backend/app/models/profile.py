from datetime import datetime
from typing import Optional, Any
from sqlalchemy import String, Boolean, DateTime, JSON
from sqlalchemy.orm import Mapped, mapped_column
from app.core.database import Base


class Profile(Base):
    __tablename__ = "profiles"

    id: Mapped[str] = mapped_column(String(64), primary_key=True, index=True)
    user_id: Mapped[Optional[str]] = mapped_column(String(64), nullable=True, unique=True, index=True)
    name: Mapped[Optional[str]] = mapped_column(String(128), nullable=True)
    travel_style: Mapped[str] = mapped_column(String(64), default="balanced")
    budget_preference: Mapped[Optional[str]] = mapped_column(String(64), nullable=True)
    preferred_interests: Mapped[Any] = mapped_column(JSON, default=list)
    saved_destinations: Mapped[Any] = mapped_column(JSON, default=list)
    sentinel_enabled: Mapped[bool] = mapped_column(Boolean, default=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
