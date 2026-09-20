from typing import Optional
from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import Field, field_validator


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore"
    )

    APP_ENV: str = "development"
    HOST: str = "0.0.0.0"
    PORT: int = 8000
    FRONTEND_URL: str = "http://localhost:5173"

    DATABASE_URL: Optional[str] = None

    # LLM Settings
    LLM_PROVIDER: str = "openrouter"
    LLM_MODEL: str = "openai/gpt-5-nano"

    OPENROUTER_API_KEY: Optional[str] = None
    OPENAI_API_KEY: Optional[str] = None
    GEMINI_API_KEY: Optional[str] = None
    GROQ_API_KEY: Optional[str] = None

    # External Provider Settings
    WEATHER_PROVIDER: str = "openweather"
    WEATHER_API_KEY: Optional[str] = None

    MAPS_API_KEY: Optional[str] = None
    PLACES_API_KEY: Optional[str] = None

    LOG_LEVEL: str = "INFO"

    @property
    def sync_database_url(self) -> str:
        """Returns the database URL for SQLAlchemy sync engine with SQLite fallback."""
        if not self.DATABASE_URL or not self.DATABASE_URL.strip():
            return "sqlite:///./ankahi_manzil.db"

        url = self.DATABASE_URL.strip()
        if url.startswith("postgres://"):
            url = url.replace("postgres://", "postgresql+psycopg://", 1)
        elif url.startswith("postgresql://") and "+psycopg" not in url:
            url = url.replace("postgresql://", "postgresql+psycopg://", 1)
        return url

    def get_active_llm_api_key(self) -> Optional[str]:
        """Returns the active LLM provider API key."""
        provider = self.LLM_PROVIDER.lower()
        if provider == "openrouter":
            return self.OPENROUTER_API_KEY
        elif provider == "openai":
            return self.OPENAI_API_KEY
        elif provider == "gemini":
            return self.GEMINI_API_KEY
        elif provider == "groq":
            return self.GROQ_API_KEY
        return None

    def validate_provider_keys(self) -> None:
        """Checks if the configured LLM provider has an API key set."""
        key = self.get_active_llm_api_key()
        if not key:
            # Note: We do not raise an unrecoverable exception to ensure trip persistence & deterministic planning work even without AI.
            pass


settings = Settings()
