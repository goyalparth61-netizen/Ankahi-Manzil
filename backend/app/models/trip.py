from datetime import datetime
from typing import List, Optional, Any
from sqlalchemy import String, Integer, Float, DateTime, JSON, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.core.database import Base


class Trip(Base):
    __tablename__ = "trips"

    id: Mapped[str] = mapped_column(String(64), primary_key=True, index=True)
    user_id: Mapped[Optional[str]] = mapped_column(String(64), nullable=True, index=True)
    destination: Mapped[str] = mapped_column(String(128), nullable=False)
    destination_slug: Mapped[str] = mapped_column(String(128), nullable=False, index=True)
    start_date: Mapped[Optional[str]] = mapped_column(String(32), nullable=True)
    end_date: Mapped[Optional[str]] = mapped_column(String(32), nullable=True)
    days: Mapped[int] = mapped_column(Integer, default=4)
    total_budget: Mapped[float] = mapped_column(Float, default=0.0)
    planned_cost: Mapped[float] = mapped_column(Float, default=0.0)
    savings: Mapped[float] = mapped_column(Float, default=0.0)
    travelers: Mapped[str] = mapped_column(String(64), default="Couple")
    travel_style: Mapped[str] = mapped_column(String(64), default="balanced")
    interests: Mapped[Any] = mapped_column(JSON, default=list)
    breakdown: Mapped[Any] = mapped_column(JSON, default=dict)
    status: Mapped[str] = mapped_column(String(32), default="planned")  # planned, upcoming, active, completed, cancelled
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    days_data: Mapped[List["TripDay"]] = relationship("TripDay", back_populates="trip", cascade="all, delete-orphan", order_by="TripDay.day_number")
    disruptions: Mapped[List["Disruption"]] = relationship("Disruption", back_populates="trip", cascade="all, delete-orphan")
