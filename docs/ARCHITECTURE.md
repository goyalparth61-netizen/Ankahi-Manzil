# Ankahi Manzil Full-Stack Architecture

## Scope

The `frontend` branch now contains the redesigned React client and the FastAPI backend.

## Runtime Architecture

```text
React / Vite
   |
   | VITE_API_BASE_URL
   v
FastAPI /api
   |
   +-- destinations
   +-- trips
   +-- Sentinel monitoring
   +-- replanning
   +-- Manzilo
   +-- profile
   |
   v
SQLAlchemy
   |
   +-- SQLite local fallback
   +-- PostgreSQL / Supabase compatible
```

## Frontend Service Layer

All HTTP access is centralized in `src/services`.

### apiClient.js

- reads `VITE_API_BASE_URL`
- optionally sends `X-User-ID`
- normalizes backend error responses
- exposes backend health checking

### destinationService.js

Primary source:

- `GET /api/destinations`
- `GET /api/destinations/{slug}`

Fallback:

- `src/data/destinations.js`

### tripService.js

Primary endpoints:

- `POST /api/trips/plan`
- `GET /api/trips`
- `GET /api/trips/{id}`
- `PATCH /api/trips/{id}`
- `DELETE /api/trips/{id}`
- `POST /api/trips/{id}/monitor`
- `GET /api/trips/{id}/disruptions`
- `POST /api/trips/{id}/replan`

It also maintains a browser localStorage cache under:

```text
am_saved_trips
```

### manziloService.js

Primary endpoints:

- `POST /api/manzilo/chat`
- `POST /api/manzilo/suggestion`

The chat UI preserves backend `conversationId`, sends the latest local trip ID when available and renders rich response widgets.

### profileService.js

Primary endpoints:

- `GET /api/profile`
- `PATCH /api/profile`

## Backend Architecture

```text
backend/app/
├── agents/
│   ├── orchestrator.py
│   ├── planner_agent.py
│   ├── monitor_agent.py
│   ├── detector_agent.py
│   ├── reasoning_agent.py
│   └── replan_agent.py
├── api/
│   ├── router.py
│   └── routes/
├── core/
├── integrations/
├── models/
├── schemas/
├── services/
└── main.py
```

### Agent Flow

```text
Trip request
   ↓
Planner / deterministic budget engine
   ↓
Persist trip + days + activities
   ↓
Sentinel monitoring
   ↓
Disruption detection
   ↓
Reasoning
   ↓
Smallest-change replan
```

Manzilo orchestrates conversational context over persisted trip state and can return structured widgets.

## Persistence

Backend persistence uses SQLAlchemy.

- local development: SQLite
- hosted environment: PostgreSQL/Supabase via `DATABASE_URL`

Alembic manages migrations.

## User Identity

Authentication is not implemented yet.

The backend reads optional:

```text
X-User-ID
```

If absent, it uses a development guest user. Frontend `VITE_API_USER_ID` can set this header for local/demo user separation.

## CORS

FastAPI allows local Vite origins and additionally reads:

```text
FRONTEND_URL
```

for deployed frontend access.

## Fallback Design

The frontend intentionally remains usable if the API is unavailable.

This is important for hackathon resilience, but the UI surfaces whether data came from the backend or fallback where relevant.

## CI

The `frontend` branch workflow validates both stacks:

### Frontend

- `npm ci`
- `npm run lint`
- `npm run build`

### Backend

- Python 3.12
- `pip install -r backend/requirements.txt`
- `pytest -v`

## Current Production Gaps

- authentication/session management
- deployed database URL is environment-specific
- provider API keys must be configured for live external intelligence
- no browser E2E suite yet
- no production telemetry/observability provider yet
