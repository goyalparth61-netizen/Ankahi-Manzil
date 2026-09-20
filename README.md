# Ankahi Manzil

Ankahi Manzil is a full-stack adaptive travel platform concept built around three connected experiences:

1. **Discover** meaningful destinations beyond the obvious.
2. **Plan** a trip around duration, travelers, pace, interests and budget.
3. **Adapt** the trip when disruptions affect the itinerary.

The `frontend` branch now contains both the redesigned React frontend and the integrated FastAPI backend under `backend/`.

## Product Experience

### Discover

- Editorial travel homepage
- Searchable destination atlas
- Destination detail stories
- Backend-powered destination catalog with local fallback

### Journey Composer

`/plan` sends planner inputs to:

```text
POST /api/trips/plan
```

When FastAPI is online, the UI renders the backend-generated `daysData`, budget breakdown and persisted trip ID. If the API is unavailable, the frontend falls back to a local demo plan.

### My Trips

`/trips` loads persisted trips from:

```text
GET /api/trips
```

The UI falls back to browser cache and built-in demo journeys when required.

### Trip Intelligence

`/trips/:id` supports:

- backend trip loading
- Sentinel monitoring
- simulated disruption detection
- replan requests
- backend refresh after a successful replan

Endpoints:

```text
GET  /api/trips/{id}
POST /api/trips/{id}/monitor
GET  /api/trips/{id}/disruptions
POST /api/trips/{id}/replan
```

### Manzilo

`/manzilo` is connected to the FastAPI Manzilo orchestrator:

```text
POST /api/manzilo/chat
POST /api/manzilo/suggestion
```

The frontend preserves:

- `conversationId`
- latest saved `tripId` context
- backend rich widgets
- fallback responses when the backend or AI provider is unavailable

### Profile

`/profile` reads and updates:

```text
GET   /api/profile
PATCH /api/profile
```

Supported persisted fields include:

- travel style
- preferred interests
- budget preference
- saved destinations
- Sentinel enabled state

### Team and Contact

The product also includes:

- `/history` — product evolution
- `/team` — Team CiPher
- `/contact` — Gmail-based contact flow

## Tech Stack

### Frontend

- React 19
- React Router 7
- Vite 8
- Tailwind CSS 4
- Framer Motion
- Lucide React
- Oxlint

### Backend

- Python 3.12+
- FastAPI
- Pydantic v2
- SQLAlchemy 2.x
- Alembic
- SQLite fallback
- PostgreSQL / Supabase compatible
- httpx
- pytest

### AI / External Integrations

Backend integrations support:

- OpenRouter
- OpenAI
- Gemini
- Groq
- OpenWeather
- Google Maps
- Google Places

All provider keys are optional for deterministic/local functionality; the backend includes graceful fallbacks.

## Repository Structure

```text
.
├── backend/
│   ├── app/
│   │   ├── agents/
│   │   ├── api/
│   │   ├── core/
│   │   ├── integrations/
│   │   ├── models/
│   │   ├── schemas/
│   │   ├── services/
│   │   └── main.py
│   ├── alembic/
│   ├── tests/
│   ├── requirements.txt
│   └── .env.example
├── src/
│   ├── components/
│   ├── data/
│   ├── pages/
│   ├── services/
│   │   ├── apiClient.js
│   │   ├── destinationService.js
│   │   ├── tripService.js
│   │   ├── manziloService.js
│   │   └── profileService.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .env.example
├── package.json
└── vite.config.js
```

## Frontend Environment

Copy the root example:

```powershell
copy .env.example .env
```

Default local configuration:

```env
VITE_API_BASE_URL=http://localhost:8000/api
VITE_API_USER_ID=
```

`VITE_API_USER_ID` is optional. If omitted, the backend uses its development guest user.

## Backend Environment

From `backend/`:

```powershell
copy .env.example .env
```

Important values:

```env
APP_ENV=development
HOST=0.0.0.0
PORT=8000
FRONTEND_URL=http://localhost:5173

DATABASE_URL=

LLM_PROVIDER=openrouter
LLM_MODEL=openai/gpt-5-nano

OPENROUTER_API_KEY=
OPENAI_API_KEY=
GEMINI_API_KEY=
GROQ_API_KEY=

WEATHER_PROVIDER=openweather
WEATHER_API_KEY=
MAPS_API_KEY=
PLACES_API_KEY=
```

If `DATABASE_URL` is empty, the backend uses local SQLite.

## Run the Full Stack Locally

### Terminal 1 — Backend

```powershell
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
copy .env.example .env
alembic upgrade head
uvicorn app.main:app --reload --port 8000
```

Backend:

```text
http://localhost:8000
API:  http://localhost:8000/api
Docs: http://localhost:8000/docs
```

### Terminal 2 — Frontend

From repository root:

```powershell
npm ci
copy .env.example .env
npm run dev
```

Frontend:

```text
http://localhost:5173
```

## API Overview

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | `/api/health` | Backend health |
| GET | `/api/destinations` | Destination catalog |
| GET | `/api/destinations/{slug}` | Destination details |
| POST | `/api/trips/plan` | Generate + persist trip |
| GET | `/api/trips` | List user trips |
| GET | `/api/trips/{id}` | Full trip details |
| PATCH | `/api/trips/{id}` | Update trip |
| DELETE | `/api/trips/{id}` | Delete trip |
| POST | `/api/trips/{id}/monitor` | Sentinel monitoring cycle |
| GET | `/api/trips/{id}/disruptions` | Active disruptions |
| POST | `/api/trips/{id}/replan` | Replan around disruption |
| POST | `/api/manzilo/chat` | Context-aware Manzilo chat |
| POST | `/api/manzilo/suggestion` | Predictive suggestion |
| GET | `/api/profile` | Get travel profile |
| PATCH | `/api/profile` | Update travel profile |

## Frontend Fallback Strategy

The frontend is resilient by design:

- destination API failure → local destination dataset
- trip planner failure → local generated plan
- trip list/detail failure → localStorage or built-in demo
- Manzilo failure → local response fallback
- profile failure → local default profile
- monitoring/replan failure → presentation-safe local fallback

This allows hackathon demos to remain usable even if an external provider or deployed backend is temporarily unavailable.

## Database

The backend uses SQLAlchemy.

Local default:

```text
SQLite: backend/ankahi_manzil.db
```

For hosted deployment, set `DATABASE_URL` to a PostgreSQL/Supabase connection string.

Apply migrations with:

```powershell
cd backend
alembic upgrade head
```

## Testing

Frontend:

```powershell
npm run lint
npm run build
```

Backend:

```powershell
cd backend
pytest -v
```

GitHub Actions runs both frontend quality checks and backend tests on the `frontend` branch.

## Deployment

### Frontend

Typical static frontend settings:

```text
Build command: npm run build
Output: dist
```

Set:

```env
VITE_API_BASE_URL=https://YOUR-BACKEND-DOMAIN/api
```

### Backend

Run:

```text
uvicorn app.main:app --host 0.0.0.0 --port $PORT
```

Set:

```env
FRONTEND_URL=https://YOUR-FRONTEND-DOMAIN
```

and configure database/provider environment variables as needed.

## Authentication

There is no full authentication flow yet.

The backend currently resolves a user through the optional `X-User-ID` header and otherwise falls back to a development guest identity. This keeps trip/profile persistence user-scoped without inventing an authentication system that is not implemented yet.

## Team CiPher

- **Parth Goyal** — B.Tech CSE, Cyber Security
- **Archi Sharma** — B.Tech CSE, Artificial Intelligence & Machine Learning

## Future Improvements

- production authentication
- real account/session management
- deployed database persistence
- production monitoring providers
- live maps UI
- booking partner integrations
- end-to-end browser tests
- production telemetry and error monitoring

## License

No license file is currently present on this branch.
