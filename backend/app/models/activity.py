from typing import Optional
from sqlalchemy import String, Integer, Float, Boolean, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.core.database import Base


class Activity(Base):
    __tablename__ = "activities"

    id: Mapped[str] = mapped_column(String(64), primary_key=True, index=True)
    trip_day_id: Mapped[str] = mapped_column(String(64), ForeignKey("trip_days.id", ondelete="CASCADE"), nullable=False, index=True)
    time: Mapped[str] = mapped_column(String(16), nullable=False)
    title: Mapped[str] = mapped_column(String(256), nullable=False)
    description: Mapped[str] = mapped_column(String(1024), default="")
    category: Mapped[str] = mapped_column(String(64), default="General")
    estimated_cost: Mapped[float] = mapped_column(Float, default=0.0)
    latitude: Mapped[Optional[float]] = mapped_column(Float, nullable=True)
    longitude: Mapped[Optional[float]] = mapped_column(Float, nullable=True)
    venue: Mapped[Optional[str]] = mapped_column(String(256), nullable=True)
    status: Mapped[str] = mapped_column(String(32), default="planned")  # planned, disrupted, replanned, completed
    is_vulnerable: Mapped[bool] = mapped_column(Boolean, default=False)
    sequence_order: Mapped[int] = mapped_column(Integer, default=0)

    # Relationships
    trip_day: Mapped["TripDay"] = relationship("TripDay", back_populates="activities")
