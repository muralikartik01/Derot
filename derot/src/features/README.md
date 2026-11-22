# Feature structure

Each product area owns its route-level pages, internal UI, and domain types.

| Folder | Responsibility |
| --- | --- |
| `api/` | HTTP requests specific to the feature |
| `components/` | UI components used only by the feature |
| `hooks/` | Feature-specific React hooks |
| `pages/` | Route-level screens |
| `schemas/` | Form validation and data schemas |
| `types/` | Feature-specific TypeScript interfaces |
| `utils/` | Feature-specific helpers |
| `index.ts` | Public exports consumed outside the feature |

Shared primitives live under `src/shared`. Import feature code through its
`index.ts` whenever it is consumed outside that feature.

## Current routes

- `/` — public landing page
- `/auth` — login and signup
- `/onboarding` — three-step preference setup
- `/home` — attention dashboard
- `/learn` — learning reset
- `/settings` — profile and preferences

Routes are declared in `src/app/routes/AppRoutes.tsx` with React Router DOM.
