# DeRoT web application

React, TypeScript, Vite, and React Router. The glass UI and product assets live here.

## Local commands

Run inside `UI/derot`:

```bash
npm ci
npm run dev
npm run lint
npm run build
npm run preview
```

Equivalent wrapper commands are available at the repository root. Commit the
frontend lockfile when changing dependencies.

## Source ownership

```text
src/
├── app/
│   ├── data/            Browser persistence adapter
│   ├── providers/       Application state and context
│   ├── routes/          Route composition and navigation checks
│   └── types/           Client product models
├── features/            Auth, onboarding, landing, feed, and settings
├── shared/              Reusable components, hooks, and types
├── assets/derot/         Bundled illustrations and logos
├── App.tsx              Root composition
├── App.css              Application styles
├── index.css            Global tokens and shared styles
└── main.tsx             Browser entry point
```

Use `shared/` for reusable code instead of parallel top-level `components/`,
`hooks/`, or `types/` directories. Feature conventions are documented in
[`src/features/README.md`](src/features/README.md).

## Routes and persistence

Public routes are `/` and `/auth`. `/onboarding` requires a local user profile.
`/home`, `/learn`, and `/settings` also require onboarding preferences.
These are navigation checks, not server authorization.

`app/data/localRepository.ts` persists state under `derot_app_state_v1`.
Login creates a demo profile without checking credentials. Feed data comes from
`features/feed/data/contentCatalog.ts`; approval labels are seed metadata.

When API is implemented, add HTTP adapters and loading/error states, replace demo
login, and move authoritative state to the server. The local repository is a
development persistence adapter, not an HTTP contract.

Production hosting must serve `index.html` for application routes because the app
uses `BrowserRouter`. Vite handles this in development.
