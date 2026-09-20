from datetime import datetime
from typing import Optional, Any
from sqlalchemy import String, DateTime, JSON, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.core.database import Base


class Disruption(Base):
    __tablename__ = "disruptions"

    id: Mapped[str] = mapped_column(String(64), primary_key=True, index=True)
    trip_id: Mapped[str] = mapped_column(String(64), ForeignKey("trips.id", ondelete="CASCADE"), nullable=False, index=True)
    activity_id: Mapped[Optional[str]] = mapped_column(String(64), ForeignKey("activities.id", ondelete="SET NULL"), nullable=True)
    type: Mapped[str] = mapped_column(String(32), default="weather")  # weather, transport, venue, schedule, availability
    severity: Mapped[str] = mapped_column(String(16), default="medium")  # low, medium, high, critical
    title: Mapped[str] = mapped_column(String(256), nullable=False)
    description: Mapped[str] = mapped_column(String(1024), default="")
    affected_time: Mapped[Optional[str]] = mapped_column(String(32), nullable=True)
    source: Mapped[str] = mapped_column(String(64), default="sentinel")
    status: Mapped[str] = mapped_column(String(32), default="active")  # active, resolved, dismissed
    disruption_metadata: Mapped[Any] = mapped_column(JSON, default=dict)
    detected_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    resolved_at: Mapped[Optional[datetime]] = mapped_column(DateTime, nullable=True)

    # Relationships
    trip: Mapped["Trip"] = relationship("Trip", back_populates="disruptions")
