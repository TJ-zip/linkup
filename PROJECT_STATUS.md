# PROJECT_STATUS

## Product objective

Help college students find the right people for what they want to do right now (study
partner, teammate, co-founder, gym buddy, event companion) based on interests, hobbies,
goals, skills, personality and stated intent, rather than followers or popularity.
Explicitly not a dating app.

## Current architecture

Single Next.js 14 App Router application, client-rendered screens under a shared
`AppShell` with a five-tab bottom navigation. No backend, no database, no external API.
All user state lives in a React Context store persisted to `localStorage` under the key
`linkup:v1`. Recommendations come from a pure, deterministic scoring function over a
local mock dataset.

## Technology stack

Next.js 14.2.15, React 18.3.1, TypeScript (strict), Tailwind CSS 3, ESLint
(`next/core-web-vitals`). Deployed on Vercel with framework defaults.

## Working features

1. Onboarding, 8 steps, capturing name, avatar, college, course, year, interests,
   hobbies, activities, skills, career interests, goals, personality, what they are
   looking for, and bio.
2. College verification against the selected college email domain (prototype).
3. Home feed "People you should LinkUp with" with intent chips, boost banner, incoming
   request banner and remaining free LinkUps.
4. Discover with search, campus-only toggle and premium advanced filters.
5. Match scoring with a four-part breakdown and written reasons for every card.
6. LinkUp requests with a 5-per-rolling-24-hours free limit.
7. My LinkUps: requests, sent, connections, suggested.
8. Messaging with shared-interest header and conversation starters.
9. Community: events, clubs, meetups, projects, opportunities, activities, with joining.
10. Own profile with settings (premium badge, incognito, boost, reset demo).
11. Student profile pages with full reasoning and LinkUp action.
12. LinkUp Premium page, all nine premium features, monthly and annual plans.
13. "Who Matches With Me?" premium list at the 85% threshold.

## Current task

Initial MVP on `feature/linkup-mvp`, awaiting CI verification of lint, typecheck and
build, then Vercel import.

## Pending tasks

- Confirm a green GitHub Actions run and that a generated lockfile lets a later run take
  the `npm ci` path.
- Import the repository into Vercel and verify a preview deployment.
- Optional next iteration: persistence behind a real backend, real college verification
  by email, simulated replies in chat, and a real billing provider for Premium.

## Known issues

- Chat is one-sided; there is no server to deliver replies.
- Verification accepts any six-digit code after the domain check.
- State is per-browser, so a profile does not follow the user across devices.

## Required environment variables

None.

## Deployment information

Vercel, Next.js preset. Build command `next build`. No output directory override, no
environment variables, no external services.

## Important architectural decisions

- **Deterministic scoring.** No `Math.random` anywhere, so server and client renders
  agree and hydration is stable.
- **No `<img>` and no `next/font`.** Avatars are CSS gradients with initials and an emoji
  badge, and the font stack is system fonts, so the build needs no network access and
  no image host configuration.
- **Client-only state.** Removes the need for secrets, which keeps the prototype fully
  demonstrable from a single Vercel import.
- **Free tier stays useful.** Premium adds convenience, personalisation and discovery.
  Basic connection ability is never paywalled.
- **Free users can still accept incoming requests**; Premium only reveals who sent them
  before the decision.

## Last completed change

Added My LinkUps, messaging, community, own and student profile pages, the LinkUp
Premium page and the premium "Who Matches With Me?" list, plus README and this file.
