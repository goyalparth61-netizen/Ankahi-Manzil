from datetime import datetime
from typing import List, Optional
from sqlalchemy import String, Integer, Float, DateTime, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.core.database import Base


class TripDay(Base):
    __tablename__ = "trip_days"

    id: Mapped[str] = mapped_column(String(64), primary_key=True, index=True)
    trip_id: Mapped[str] = mapped_column(String(64), ForeignKey("trips.id", ondelete="CASCADE"), nullable=False, index=True)
    day_number: Mapped[int] = mapped_column(Integer, nullable=False)
    title: Mapped[str] = mapped_column(String(256), nullable=False)
    date: Mapped[Optional[str]] = mapped_column(String(32), nullable=True)
    estimated_cost: Mapped[float] = mapped_column(Float, default=0.0)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    # Relationships
    trip: Mapped["Trip"] = relationship("Trip", back_populates="days_data")
    activities: Mapped[List["Activity"]] = relationship("Activity", back_populates="trip_day", cascade="all, delete-orphan", order_by="Activity.sequence_order")
