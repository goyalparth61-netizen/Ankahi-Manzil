# Ankahi Manzil Frontend Architecture

## Scope

This document describes the implementation on the `frontend` branch.

Ankahi Manzil is currently a client-side React application. The branch does not contain a production backend, database, authentication provider, or live travel API integration.

## Runtime Architecture

```text
Browser
  |
  v
React 19 + React Router
  |
  +-- Shared Layout
  |     +-- Navbar
  |     +-- ScrollToTop
  |     +-- Footer
  |
  +-- Pages
  |     +-- Home
  |     +-- Features
  |     +-- Destinations
  |     +-- DestinationDetails
  |     +-- HowItWorks
  |     +-- About
  |     +-- TripPlanner
  |     +-- MyTrips
  |     +-- TripDetails
  |     +-- ManziloChat
  |     +-- Profile
  |     +-- NotFound
  |
  +-- Local data
  |     +-- src/data/destinations.js
  |
  +-- Mock service boundary
  |     +-- destinationService.js
  |     +-- tripService.js
  |     +-- manziloService.js
  |
  +-- Browser persistence
        +-- localStorage: am_saved_trips
```

## Routing

`src/App.jsx` defines all routes under the shared `Layout` component. `BrowserRouter` is initialized in `src/main.jsx`, so production hosts need an SPA rewrite to `index.html`.

## Presentation Layer

The design system lives primarily in `src/index.css` and includes brand colors, typography tokens, responsive spacing, shared buttons, glass surfaces, focus-visible treatment, premium background/card styles, and reduced-motion behavior.

## Data Model

`src/data/destinations.js` stores static destination metadata, categories, ratings, descriptive content, attraction/activity lists, workflow steps, demo itinerary data, benefits, and navigation links.

## Mock Services

`src/services` provides asynchronous mock functions so the UI has a clear future integration boundary. They intentionally simulate latency and return local/demo data.

When a backend is introduced, prefer replacing implementations inside the service layer rather than coupling pages directly to network calls.

## Trip Planning State

`TripPlanner` uses React state for planner inputs, generation progress, generated itineraries, disruption simulation, replanning, and save feedback.

Generated trips are sample objects built on the client.

## Persistence

Saved generated trips are written to `am_saved_trips` in localStorage. `MyTrips` reads this key and merges saved items with built-in demonstration trips.

## Manzilo

`ManziloChat` is a scripted contextual demonstration. It detects travel-related keywords and returns structured demo responses.

`manziloService.js` is a separate mock abstraction that can become the network boundary for a future AI backend.

## Animation

Framer Motion powers page entry, scroll reveals, workflow animation, floating elements, typing feedback, and disruption transitions. Global CSS respects `prefers-reduced-motion`.

## Accessibility Baseline

The shared shell contains a skip link and visible focus styles. Profile toggles expose switch semantics. Manzilo chat controls include accessible labels.

Further production work should add automated accessibility testing and complete keyboard verification.

## Known Demo Boundaries

- destination content is local
- weather/transit/venue monitoring is simulated
- trip generation is sample client logic
- Manzilo responses are scripted
- profile data is demo content
- no login/signup flow exists on this branch
- no production database, booking system, analytics, or third-party travel API exists
