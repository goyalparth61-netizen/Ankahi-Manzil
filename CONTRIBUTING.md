# Contributing to Ankahi Manzil

## Development Branch

Frontend work should be based on the `frontend` branch unless the repository owner specifies another workflow.

## Setup

```bash
git clone https://github.com/goyalparth61-netizen/Ankahi-Manzil.git
cd Ankahi-Manzil
git checkout frontend
npm ci
npm run dev
```

## Before Making Changes

- Understand the existing route and component before replacing it.
- Preserve working planner, saved-trip, and Manzilo demo behavior.
- Reuse design tokens and shared components.
- Avoid adding a dependency when the existing stack can solve the problem.
- Do not add fake APIs, keys, backend endpoints, or environment variables.

## Code Style

- Keep route-level components in `src/pages`.
- Keep reusable UI in `src/components`.
- Keep integration boundaries in `src/services`.
- Keep static destination/product data in `src/data`.
- Reuse Tailwind utilities and shared classes from `src/index.css`.
- Keep animations subtle and respect reduced motion.
- Add accessible labels to icon-only controls.

## Quality Checks

Run before opening a pull request:

```bash
npm run lint
npm run build
```

Also manually verify:

- `/`
- `/features`
- `/destinations`
- a destination details route
- `/how-it-works`
- `/about`
- `/plan`
- `/trips`
- a trip details route
- `/manzilo`
- `/profile`
- an invalid route for the 404 page

Test desktop, tablet, and mobile widths.

## Pull Request Checklist

- Existing functionality still works.
- No broken imports or routes were introduced.
- No secrets or API keys were committed.
- New UI works with keyboard focus.
- Mobile layouts do not overflow.
- Loading and disabled states remain understandable.
- Documentation was updated when implementation changed.
- `npm run lint` passes.
- `npm run build` passes.
