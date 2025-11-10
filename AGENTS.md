# Repository Guidelines

## Project Structure & Module Organization
- `app/` houses Next.js 16 App Router routes plus UI logic; colocated components typically live in `app/(segment)/components`.
- Shared hooks, data utilities, and Drizzle ORM helpers sit in `lib/` and `shared/`. API mocks and sample payloads live in `api-responses/`, while marketing assets are in `public/` and `agent-images/`.
- Legacy Replit/Vite experiments remain in `old_vite_code/`; do not modify unless explicitly migrating code forward.

## Build, Test, and Development Commands
- `npm run dev` launches the local server on http://localhost:5000 with hot reload.
- `npm run build` performs the Next.js production build, and `npm start` hosts the compiled output on port 5000 (matches staging).
- `npm run check` runs TypeScript in strict mode; `npm run db:push` syncs schema changes defined in `drizzle.config.ts` to the configured Neon/Postgres database.

## Coding Style & Naming Conventions
- Follow the existing TypeScript strict configuration; prefer explicit types at module boundaries.
- Use Tailwind utility classes plus shadcn/ui primitives; shared styling tokens live in `tailwind.config.ts` and `components.json`.
- Keep React server components default; name client components with a `.client.tsx` suffix only when `"use client"` is required. Use kebab-case for route folders and camelCase for files under `lib/`.

## Testing Guidelines
- Jest is not wired; regressions are caught through Storybook-like visual checks and dedicated preview links. When adding tests, colocate lightweight assertions under the relevant feature directory (e.g., `app/lib/api/testimonials.test.ts`).
- Always run `npm run check` before committing; this is the minimum gate for CI.

## Commit & Pull Request Guidelines
- Match the existing imperative tense style (e.g., `Add pricing hero animation`, `Fix session store leak`). Keep subjects ≤72 characters and reference Jira ticket IDs in the body when applicable.
- Pull requests should include: short summary, screenshots or screen recordings for UI work, API contract diffs if `api-responses/` changed, and a checklist of manual verifications (desktop/mobile, light/dark themes, authenticated vs guest states).

## Security & Configuration Tips
- Secrets (API keys, Neon URLs, Passport salts) belong in `.env.local`; never commit them. Use `.env.example` conventions when introducing new variables.
- Sessions rely on `express-session` + `connect-pg-simple`; confirm `SESSION_SECRET` and database credentials are set before running `npm start` or deploying (see `DEPLOYMENT.md` for server-side `.env` layout).
