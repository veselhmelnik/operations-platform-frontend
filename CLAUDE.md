# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev     # start dev server (localhost:3000)
npm run build   # production build
npm run start   # run a production build
npm run lint    # eslint (flat config: eslint-config-next core-web-vitals + typescript)
```

There is no test suite or test runner configured in this repo (no test script, no `*.test.*`/`*.spec.*` files).

Type-checking is not a separate script — `next build` type-checks, or run `npx tsc --noEmit` directly.

## Environment

- `NEXT_PUBLIC_API_URL` (`.env.local`) points to the backend API (`http://localhost:3001` in dev).
- The backend lives in a sibling project, `../api` (NestJS + Prisma), outside this git repo — this repo only contains the Next.js frontend (`web`).

## Architecture

**This is Next.js 16 with breaking changes from what you may know it as** — see `AGENTS.md` for the mandate to check `node_modules/next/dist/docs/` before writing framework code. The concrete instance of this in the repo: `middleware.ts` has been renamed/replaced by [proxy.ts](proxy.ts) (`export function proxy(request)` instead of `middleware`). Don't reintroduce a `middleware.ts`.

**Auth**: cookie-based (`access_token`, presumably httpOnly, set by the backend). Two enforcement layers:
- [proxy.ts](proxy.ts) — redirects to `/login` server-side for any route without the cookie, except `/login`, `/api`, and static assets.
- [app/lib/AuthGuard.tsx](app/lib/AuthGuard.tsx) — wraps the `(dashboard)` route group's layout ([app/(dashboard)/layout.tsx](app/(dashboard)/layout.tsx)); on mount calls `getCurrentUser`, and on failure logs out and client-redirects to `/login`.

**API access has two parallel fetch wrappers**, both throwing `Error(message)` on non-OK responses (callers don't check `response.ok`):
- [app/lib/api/api-client.ts](app/lib/api/api-client.ts) — browser `fetch`, `credentials: 'include'`, used from client components/hooks.
- [app/lib/api/api-server.ts](app/lib/api/api-server.ts) — server-side `fetch`, manually forwards the cookie via `next/headers` `cookies()`, used from server components.

Every backend URL is centralized in [app/lib/api/api-routes.ts](app/lib/api/api-routes.ts) as nested builder functions (`apiRoutes.organizations.projects.tasks.byId(orgId, projectId, taskId)`, etc.) — don't hand-build API path strings elsewhere. Resource modules ([organizations.ts](app/lib/api/organizations.ts), [projects.ts](app/lib/api/projects.ts), [tasks.ts](app/lib/api/tasks.ts), [members.ts](app/lib/api/members.ts), [auth.ts](app/lib/api/auth.ts)) are thin functions that take an `ApiFetcher` (either `apiClient` or `apiServer`) as their first argument, so the same function works from both client and server call sites. Request/response payload shapes live in `app/lib/api/dto/*.dto.ts`.

Frontend page URLs are centralized the same way in [app/lib/routes.ts](app/lib/routes.ts) (`routes.project(orgId, projectId)`, etc.) — use these instead of hand-built `href`/`router.push` strings.

**Data fetching**: TanStack React Query, provider in [app/providers.tsx](app/providers.tsx) (`'use client'`, one `QueryClient` per mount). Query keys are centralized in [app/lib/queryKeys.ts](app/lib/queryKeys.ts) — always read/write cache through this module (`queryKeys.board(orgId, projectId)`, etc.) rather than inlining key arrays, or invalidation will silently miss. Task mutation hooks live in `app/hooks/tasks/` (`useUpdateTask`, `useDeleteTask`, `useMoveTask`) and all follow the same shape: pull `organizationId`/`projectId` from [useProjectParams](app/hooks/useProjectParams.ts) (wraps `next/navigation`'s `useParams`), call the matching `app/lib/api/*.ts` function with `apiClient`, and invalidate `queryKeys.board(...)` on success.

**Routing**: App Router with route groups `(auth)` (just `/login`) and `(dashboard)` (everything else, gated by `AuthGuard`), under dynamic segments `organizations/[organizationId]/projects/[projectId]/...`.

**Kanban board** (`app/(dashboard)/organizations/[organizationId]/projects/[projectId]/Kanban/`): [KanbanBoard.tsx](app/(dashboard)/organizations/[organizationId]/projects/[projectId]/Kanban/KanbanBoard.tsx) owns the `@dnd-kit` `DndContext` and drag state. Board data is a single React Query cache entry shaped `Record<TaskStatus, Task[]>` (see [app/types/board.ts](app/types/board.ts)). `onDragOver` does optimistic local reordering by writing straight to `queryClient.setQueryData(...)`; `onDragEnd` computes the final column/position via [app/utils/helpers/dndBoard.helper.ts](app/utils/helpers/dndBoard.helper.ts) (`moveTaskInBoard`/`getDropTarget`) and persists it with `useMoveTask`. Column order/labels come from `COLUMNS` in [app/utils/constants.ts](app/utils/constants.ts).

**Types**: domain types (`Task`, `Project`, `Organization`, `OrganizationMember`, `User`, `Board`) live under `app/types/`, re-exported from [app/types/index.ts](app/types/index.ts). `TaskStatus`/`OrganizationRole` in [app/types/enums.ts](app/types/enums.ts) are string-union types and must match the backend's values exactly.

**Styling**: Tailwind v4 via `@tailwindcss/postcss`; shared class-name fragments centralized in [app/utils/tailwind-constants.ts](app/utils/tailwind-constants.ts).

**Path alias**: `@/*` maps to the repo root (e.g. `@/app/types`).
