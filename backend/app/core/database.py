from typing import Generator
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker, Session
from app.core.config import settings
from app.core.logging import logger

db_url = settings.sync_database_url

# Configure connect args for SQLite
connect_args = {}
if db_url.startswith("sqlite"):
    connect_args["check_same_thread"] = False
    logger.info("Using SQLite fallback database for Ankahi Manzil development.")
else:
    logger.info("Connecting to PostgreSQL database.")

engine = create_engine(
    db_url,
    connect_args=connect_args,
    pool_pre_ping=True,
    echo=False
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


def get_db() -> Generator[Session, None, None]:
    """FastAPI dependency that yields an isolated DB session and safely closes it."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
