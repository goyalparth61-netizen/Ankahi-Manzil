# Ankahi Manzil

Ankahi Manzil is a travel discovery and adaptive journey-planning frontend concept focused on a simple idea:

> Discover places that are not on everyone’s list, then build a journey that can still be useful when the plan changes.

The current `frontend` branch is a React demo. It contains curated local destination data, an interactive planner, locally saved trips, simulated disruption/replanning, and a mock Manzilo conversational service.

## Product Problem

Most travel interfaces separate inspiration from planning. Discovery becomes a card catalog, itinerary builders become forms, and AI is often presented as marketing copy instead of an actual interface.

Ankahi Manzil combines three product modes:

1. **Discover** — browse destinations as an editorial travel atlas.
2. **Plan** — turn destination, pace, budget, travelers and interests into a sample day-by-day journey.
3. **Adapt** — demonstrate how a vulnerable itinerary block can be replaced without rebuilding the entire trip.

## Current Experience

### Home

The homepage is an image-led editorial travel experience built around the message:

**Discover the places that aren’t on everyone’s list.**

It includes immersive destination storytelling, asymmetric destination emphasis, and a direct path into the AI experience and planner.

### Explore

`/destinations` provides search and category filtering over the local destination dataset. Destinations are deliberately presented with mixed visual hierarchy rather than as a uniform card grid.

### Manzilo Studio

`/features` is an interactive AI product demonstration rather than a marketing feature page.

Users can:

- switch between Discover, Build and Adapt modes
- select a travel mood
- change budget context
- inspect recommendation reasoning
- view a generated route
- trigger a visual replan scenario
- continue into the full Manzilo conversation or Journey Composer

### Journey Composer

`/plan` keeps the existing planning functionality while presenting it as a product workspace.

Inputs include:

- destination
- duration
- travelers
- budget
- pace
- interests

The page uses the mock `tripService` boundary and local destination data to produce a sample journey. A generated journey can be saved to browser localStorage.

### My Trips

`/trips` combines built-in demo journeys with trips saved from the Journey Composer.

Saved trips use:

```text
localStorage key: am_saved_trips
```

### Trip Detail

`/trips/:id` displays the itinerary and provides a local disruption/replan demonstration.

For locally saved planner trips, the detail route reads the matching browser-stored plan when available.

### Manzilo Chat

`/manzilo` connects to the existing `manziloService.js` mock abstraction.

The service currently supports demo responses for:

- general planning
- Manali
- Goa
- budget-related prompts

No production AI provider is connected on this branch.

### Travel Preferences

`/profile` is a demo preference workspace. It is not backed by authentication or a user database.

## Technology Stack

- React 19
- React Router 7
- Vite 8
- Tailwind CSS 4
- Framer Motion
- Lucide React
- Oxlint

No additional UI framework was introduced for the frontend reset.

## Architecture

```text
Browser
  |
  v
React + React Router
  |
  +-- Shared shell
  |   +-- Navbar
  |   +-- Footer
  |   +-- PageTransition
  |
  +-- Discovery
  |   +-- Home
  |   +-- Destinations
  |   +-- DestinationDetails
  |
  +-- Intelligence
  |   +-- Features / Manzilo Studio
  |   +-- ManziloChat
  |   +-- HowItWorks
  |
  +-- Journey workspace
  |   +-- TripPlanner
  |   +-- MyTrips
  |   +-- TripDetails
  |   +-- Profile
  |
  +-- Local data
  |   +-- src/data/destinations.js
  |
  +-- Mock service boundaries
      +-- destinationService.js
      +-- tripService.js
      +-- manziloService.js
```

See `docs/ARCHITECTURE.md` for implementation details.

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Editorial discovery homepage |
| `/destinations` | Search/filter travel atlas |
| `/destinations/:slug` | Immersive destination story |
| `/features` | Interactive Manzilo Studio |
| `/how-it-works` | Adaptive planning loop |
| `/plan` | Journey Composer |
| `/trips` | Local/demo trip library |
| `/trips/:id` | Trip detail + replan demo |
| `/manzilo` | Mock conversational workspace |
| `/profile` | Demo travel preferences |
| `/about` | Product story |
| `*` | Branded 404 |

## Backend and API Status

There is **no production backend in this branch**.

The current service files are mock asynchronous abstractions:

- `destinationService.js`
- `tripService.js`
- `manziloService.js`

They are intentionally kept as integration boundaries so a future backend can replace the implementation without forcing route components to know backend details.

## Authentication

There is currently **no authentication implementation** on this branch.

The profile route is a frontend preference demo only.

## Environment Variables

No environment variables are currently required.

There is no `.env.example` because this branch does not use external API credentials.

If a real backend or AI provider is added, keep secrets server-side and document only browser-safe Vite variables.

## Installation

Requirements:

- Node.js 20+ recommended
- npm

```bash
git clone https://github.com/goyalparth61-netizen/Ankahi-Manzil.git
cd Ankahi-Manzil
git checkout frontend
npm ci
```

## Development

```bash
npm run dev
```

## Lint

```bash
npm run lint
```

## Production Build

```bash
npm run build
```

## Preview

```bash
npm run preview
```

## Deployment

The branch builds as a Vite single-page application.

Typical static-host settings:

```text
Install: npm ci
Build: npm run build
Output: dist
```

Because React Router uses `BrowserRouter`, the deployment host must rewrite unknown application routes to `index.html`.

## Design System

The reset design system lives in `src/index.css`.

The current visual direction uses:

- deep forest/navy surfaces rather than generic SaaS blue
- warm sand/ember highlights
- editorial typography with selective serif accents
- cinematic full-bleed photography
- asymmetric destination composition
- restrained borders instead of heavy shadows
- product-workspace layouts for AI/planning screens
- motion primarily for transitions, reveal and state change

## Accessibility

Current baseline includes:

- semantic navigation
- keyboard-focus treatment
- labeled form controls
- accessible switch semantics
- reduced-motion support
- descriptive image alt text where images are meaningful
- skip-to-content navigation

Further production work should add automated accessibility testing.

## CI

`.github/workflows/frontend-ci.yml` runs on pushes and pull requests targeting `frontend`:

1. `npm ci`
2. `npm run lint`
3. `npm run build`

## Future Improvements

- production authentication
- server-side trip persistence
- real mapping/geospatial service
- live weather and transit integrations
- production AI/LLM integration for Manzilo
- server-side validation and rate limiting
- end-to-end and component tests
- verified booking/partner integrations
- production analytics and error reporting

## Contributors

Repository: `goyalparth61-netizen/Ankahi-Manzil`

Use GitHub repository history as the authoritative contributor record.

## License

No license file is currently present on this branch.
