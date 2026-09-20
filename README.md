# Ankahi Manzil

Ankahi Manzil is a modern adaptive travel-planning web experience built around one idea: a trip should not become useless the moment real-world conditions change.

The current frontend demonstrates destination discovery, personalized itinerary generation, saved trips, disruption-aware replanning, budget views, and a conversational travel companion called Manzilo.

## Problem Statement

Most itinerary tools generate a static plan. Real travel is not static: weather changes, transport gets delayed, venues close, budgets shift, and travelers change their minds.

Ankahi Manzil presents a product concept where planning and adaptation live in the same interface.

## Solution

The application combines:

- curated destination discovery
- preference and budget based itinerary generation
- day-by-day trip timelines
- simulated disruption monitoring and replanning
- saved trip persistence in localStorage
- a conversational Manzilo travel assistant
- responsive presentation across desktop, tablet, and mobile

This branch is a frontend demo. It does not currently contain a production backend, authentication service, database, or live third-party travel APIs.

## Key Features

- Premium landing experience focused on hidden and meaningful journeys
- Searchable and filterable destination catalog
- Destination detail pages with attractions, activities, budget, timing, and weather guidance
- Adaptive trip planner with destination, duration, travelers, budget, pace, and interest controls
- Generated sample itineraries with cost breakdowns
- Saved trips stored locally under `am_saved_trips`
- My Trips portfolio with active, upcoming, and completed views
- Trip detail experience with simulated disruption and one-click replan states
- Manzilo conversational demo with contextual travel responses and rich response cards
- Profile preference controls
- Smooth page transitions, scroll reveals, hover states, responsive navigation, and reduced-motion support
- Dedicated 404 route

## How the Platform Works

1. Discover a destination or start from the planner.
2. Choose destination, duration, traveler type, budget, travel style, and interests.
3. Generate a sample adaptive itinerary.
4. Review daily activities and budget allocation.
5. Save the plan to localStorage.
6. Open My Trips to revisit saved plans.
7. Use disruption simulation to see how the interface communicates replanning.
8. Ask Manzilo questions about activities, delays, food, budget, or itinerary changes.

## Technology Stack

- React 19
- React Router 7
- Vite 8
- Tailwind CSS 4
- Framer Motion
- Lucide React
- Oxlint

## Project Structure

```text
.
├── public/
├── src/
│   ├── components/
│   │   └── layout/
│   ├── data/
│   ├── pages/
│   ├── services/
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .oxlintrc.json
├── package.json
└── vite.config.js
```

For a deeper implementation overview, see `docs/ARCHITECTURE.md`.

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Landing experience |
| `/features` | Product capabilities |
| `/destinations` | Search and filter destinations |
| `/destinations/:slug` | Destination details |
| `/how-it-works` | Adaptive planning workflow |
| `/about` | Product story and vision |
| `/plan` | Trip planner |
| `/trips` | Saved and demo trips |
| `/trips/:id` | Trip details and replan demo |
| `/manzilo` | Manzilo chat demo |
| `/profile` | Traveler preferences |
| `*` | Branded 404 page |

## Data and Service Layer

The files in `src/services` are mock API abstractions:

- `destinationService.js` returns local destination data after a simulated delay.
- `tripService.js` simulates trip creation, updates, disruptions, and replanning.
- `manziloService.js` simulates conversational responses.

Several pages currently implement demo behavior directly in component state. No live backend endpoint is required to run this branch.

## Local Persistence

Generated trips can be saved in the browser under:

```text
am_saved_trips
```

Clearing browser storage removes those saved demo trips.

## Environment Variables

No environment variables are currently required.

Do not add API keys directly to source files. When a real backend or external provider is introduced, document it with a `.env.example` file and expose only browser-safe configuration through Vite.

## Installation

Requirements:

- Node.js 20 or newer recommended
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

## CI

The frontend branch includes a GitHub Actions workflow that runs `npm ci`, `npm run lint`, and `npm run build` for pushes and pull requests targeting `frontend`.

## Backend Setup

There is no backend implementation in this branch, so there is no backend setup command to run.

The intended integration boundary is the existing `src/services` directory. A future backend can replace mock functions while keeping most page and route structure intact.

## Deployment

This is a Vite single-page application and can be deployed to static frontend platforms.

Typical settings:

```text
Install command: npm ci
Build command: npm run build
Output directory: dist
```

Because the app uses `BrowserRouter`, the host must rewrite unknown application routes to `index.html`.

No repository-specific production deployment configuration is currently committed on this branch.

## Important Configuration

- `vite.config.js` enables React and Tailwind CSS.
- `src/index.css` contains shared design tokens and global UI rules.
- `src/data/destinations.js` is the current local content source.
- React Router owns client-side routing.
- Framer Motion powers page and section animation.
- `prefers-reduced-motion` is respected globally.

## Screenshots and Demo

A dedicated screenshot set is not currently committed. For hackathon presentation, capture verified screenshots from the running build, especially the hero, destination discovery, planner, generated itinerary, disruption/replan state, Manzilo chat, and mobile navigation.

## Future Improvements

- Connect real weather, transport, venue, and mapping providers through a backend
- Replace mock itinerary generation with a production planning service
- Add authenticated user accounts
- Persist trips in a database
- Add server-side validation and rate limiting
- Add automated component and end-to-end tests
- Add production observability and error reporting
- Add map-based discovery and route visualization
- Add verified booking integrations

## Contributors

Repository: `goyalparth61-netizen/Ankahi-Manzil`

The current `frontend` branch history includes work by Archi Sharma (`@archisharma158-cmd`). Use GitHub's repository history for the authoritative contributor list as the project evolves.

## Contributing

See `CONTRIBUTING.md`.

## License

No license file is currently present in this branch. Do not assume reuse rights beyond what the repository owner explicitly grants.
