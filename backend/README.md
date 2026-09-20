# Ankahi Manzil — Production Travel Backend

An intelligent, production-style backend for **Ankahi Manzil**, powering autonomous travel planning, Sentinel disruption monitoring, and multi-agent reasoning with **Manzilo**.

---

## Technical Stack

- **Runtime**: Python 3.12+
- **Framework**: FastAPI with Pydantic v2 & `pydantic-settings`
- **Database / ORM**: SQLAlchemy 2.x & Alembic (PostgreSQL / Supabase compatible, automatic SQLite local fallback)
- **HTTP Client**: `httpx` (Async)
- **External Providers**:
  - OpenRouter (default: `openai/gpt-5-nano`) / OpenAI / Gemini / Groq
  - OpenWeather (Atmospheric data & precipitation probabilities)
  - Google Maps & Geocoding (Transit times, distances & route planning)
  - Google Places (Nearby attractions, cafes & weather-safe indoor venues)

---

## Directory Structure

```
backend/
├── app/
│   ├── main.py                  # FastAPI app entrypoint, CORS, latency middleware & error handlers
│   ├── api/
│   │   ├── router.py            # Master API router (/api)
│   │   └── routes/
│   │       ├── health.py        # GET /api/health
│   │       ├── destinations.py  # GET /api/destinations, GET /api/destinations/{slug}
│   │       ├── trips.py         # POST /api/trips/plan, GET /api/trips, GET/PATCH/DELETE /api/trips/{id}
│   │       ├── disruptions.py   # POST /api/trips/{id}/monitor, GET disruptions, POST replan
│   │       ├── manzilo.py       # POST /api/manzilo/chat, POST /api/manzilo/suggestion
│   │       └── profile.py       # GET /api/profile, PATCH /api/profile
│   │
│   ├── core/
│   │   ├── config.py            # Strongly typed Settings class via pydantic-settings
│   │   ├── database.py          # SQLAlchemy 2.0 engine, SessionLocal & get_db dependency
│   │   ├── errors.py            # Standardized exception system and error handlers
│   │   ├── logging.py           # Masked logging that prevents secret leaks
│   │   └── security.py          # Guest user identity and headers
│   │
│   ├── models/                  # Normalized SQLAlchemy 2.x models
│   │   ├── trip.py
│   │   ├── trip_day.py
│   │   ├── activity.py
│   │   ├── disruption.py
│   │   ├── conversation.py
│   │   ├── message.py
│   │   └── profile.py
│   │
│   ├── schemas/                 # Pydantic v2 schemas aligned with frontend models
│   │   ├── destination.py
│   │   ├── trip.py
│   │   ├── disruption.py
│   │   ├── manzilo.py
│   │   └── profile.py
│   │
│   ├── services/                # Pure Python deterministic business logic
│   │   ├── destination_service.py
│   │   ├── trip_planner.py
│   │   ├── budget_service.py
│   │   ├── route_optimizer.py
│   │   ├── conflict_detector.py
│   │   ├── monitoring_service.py
│   │   ├── disruption_detector.py
│   │   ├── replan_service.py
│   │   └── manzilo_service.py
│   │
│   ├── agents/                  # Multi-agent architecture under Manzilo
│   │   ├── orchestrator.py      # Master orchestrator, memory & rich widget synthesizer
│   │   ├── planner_agent.py
│   │   ├── monitor_agent.py
│   │   ├── detector_agent.py
│   │   ├── reasoning_agent.py
│   │   └── replan_agent.py
│   │
│   ├── integrations/            # External API client abstractions with graceful fallbacks
│   │   ├── llm/
│   │   │   ├── base.py
│   │   │   ├── openrouter.py
│   │   │   ├── openai.py
│   │   │   ├── gemini.py
│   │   │   └── groq.py
│   │   ├── weather.py           # OpenWeather client with standard normalization
│   │   ├── maps.py              # Google Maps routing & geocoding
│   │   └── places.py            # Google Places discovery
│   │
│   └── utils/
│       ├── ids.py
│       ├── money.py             # Deterministic budget math & breakdowns
│       └── time.py
│
├── alembic/                     # Database migrations
├── tests/                       # Automated pytest test suite
├── alembic.ini
├── requirements.txt
├── .env.example
└── README.md
```

---

## Setup & Installation

### 1. Navigate to Backend & Create Virtual Environment

```bash
cd backend
python -m venv .venv
```

**Activate on Windows (PowerShell):**
```powershell
.venv\Scripts\activate
```

**Activate on Linux/macOS:**
```bash
source .venv/bin/activate
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Configure Environment

Copy `.env.example` to `.env` if you haven't already:
```bash
copy .env.example .env
```

Ensure your `.env` contains:
```env
APP_ENV=development
HOST=0.0.0.0
PORT=8000
FRONTEND_URL=http://localhost:5173

DATABASE_URL=

LLM_PROVIDER=openrouter
LLM_MODEL=openai/gpt-5-nano
OPENROUTER_API_KEY=your_key_here

WEATHER_PROVIDER=openweather
WEATHER_API_KEY=your_key_here

MAPS_API_KEY=your_key_here
PLACES_API_KEY=your_key_here

LOG_LEVEL=INFO
```

> **Note**: If `DATABASE_URL` is empty, the application automatically uses the local SQLite database (`sqlite:///./ankahi_manzil.db`). When a PostgreSQL connection string (such as Supabase) is provided, it connects seamlessly.

### 4. Apply Database Migrations

```bash
alembic upgrade head
```

### 5. Start the FastAPI Server

```bash
uvicorn app.main:app --reload --port 8000
```

- API Base URL: `http://localhost:8000/api`
- Interactive OpenAPI Docs: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

---

## Running Automated Tests

Run the complete test suite:
```bash
pytest -v
```

All external providers (OpenRouter, OpenWeather, Google APIs) are mocked or safely stubbed to prevent accidental token usage during automated testing.

---

## Connecting the Frontend

1. Ensure the backend is running on `http://localhost:8000`.
2. In the frontend root:
   ```bash
   npm install
   npm run dev
   ```
3. The frontend communicates with the backend via `src/services/apiClient.js` defaulting to `http://localhost:8000/api`.
