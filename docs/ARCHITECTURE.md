# Frontend Architecture

## Scope

This document covers the `frontend` branch of Ankahi Manzil.

The branch is a client-side React application. It does not contain a production backend, database or authentication provider.

## Product Architecture

The frontend is organized around three user modes.

### 1. Discover

Routes:

- `/`
- `/destinations`
- `/destinations/:slug`
- `/about`

Purpose:

- create desire to travel
- expose curated local destination data
- move from visual discovery into planning

### 2. Intelligence

Routes:

- `/features`
- `/manzilo`
- `/how-it-works`

Purpose:

- demonstrate Manzilo as a product interface
- expose recommendation/route/replan reasoning
- use the existing mock chat service for conversational responses

### 3. Journey Workspace

Routes:

- `/plan`
- `/trips`
- `/trips/:id`
- `/profile`

Purpose:

- collect trip constraints
- generate a sample itinerary
- save browser-local trip state
- demonstrate disruption/replanning
- manage demo travel preferences

## Runtime Flow

```text
Browser
  |
  v
React 19
  |
  +-- React Router
  |    +-- Layout
  |         +-- Navbar
  |         +-- Outlet
  |         +-- Footer
  |
  +-- Local destination data
  |    +-- src/data/destinations.js
  |
  +-- Mock asynchronous services
  |    +-- destinationService.js
  |    +-- tripService.js
  |    +-- manziloService.js
  |
  +-- Browser state
       +-- React component state
       +-- localStorage: am_saved_trips
```

## Design System

`src/index.css` owns the global visual system.

The reset intentionally avoids a generic card-heavy SaaS aesthetic. Its primary patterns are:

- cinematic image surfaces
- editorial typography
- asymmetric discovery grids
- sticky narrative sections
- compact product-workspace panels
- consistent circular/pill actions
- restrained motion and borders
- dedicated desktop/tablet/mobile compositions

Tailwind remains available for route-level composition.

## Services

### destinationService

Returns data from `src/data/destinations.js` after simulated latency.

### tripService

Provides mock asynchronous trip operations including plan creation and disruption/replan responses.

The Journey Composer calls `createTripPlan` to preserve this service boundary.

### manziloService

Provides mock conversational responses.

The `/manzilo` route calls `chatWithManzilo`.

## Persistence

Generated planner journeys may be stored under:

```text
am_saved_trips
```

`/trips` merges those browser-saved entries with built-in demo journeys.

`/trips/:id` reads matching saved journey data when the route ID exists in localStorage.

## Motion

Framer Motion is used for:

- page entry
- state transitions
- image/content reveal
- AI mode transitions
- generated itinerary state
- conversational typing feedback
- disruption/replan transitions

Global CSS respects `prefers-reduced-motion`.

## Integration Boundaries

When production services are introduced:

1. keep network calls inside `src/services`
2. keep API secrets off the client
3. validate planner inputs on the server
4. replace localStorage-only persistence with authenticated storage
5. expose real monitoring state separately from simulated/demo state
6. preserve explainable replan output in the UI

## Current Limitations

- destination content is static/local
- trip generation is a frontend sample workflow
- disruptions are simulated
- Manzilo uses a mock service
- profile settings are not persisted to a backend
- there is no authentication
- there is no live map, weather, transport or booking integration
