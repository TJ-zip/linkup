# LinkUp

**No student should feel alone in a crowd.**

LinkUp is a college-exclusive, mobile-first social app that helps students find the right
people for what they want to do right now: a study partner, a project teammate, a gym
buddy, a co-founder, or simply someone to attend an event with.

Matching is based on interests, hobbies, goals, skills, personality and intent, never on
followers or popularity. It is deliberately not a dating app.

## Stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 14 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS |
| State | React Context + `localStorage` |
| Data | Deterministic mock dataset in `lib/` |
| Hosting | Vercel (zero configuration) |

There is no backend, no database and no third-party service. Everything runs in the
browser, which makes the prototype fully navigable without any credentials.

## Repository structure

```
app/
  page.tsx              splash and routing gate
  onboarding/           8-step onboarding incl. college verification
  home/                 "People you should LinkUp with" feed + intent chips
  discover/             search, campus filter, premium advanced filters
  linkups/              requests, sent, connections, suggested
  chat/[id]/            conversation, shared interests, starters
  community/            events, clubs, meetups, projects, opportunities
  profile/              own profile and settings
  profile/[id]/         student profile with full match reasoning
  premium/              LinkUp Premium plans and features
  who-matches/          premium 85%+ compatibility list
components/             Avatar, Chip, ScoreRing, MatchCard, BottomNav, ...
lib/
  matching.ts           scoring engine, reasons, conversation starters
  students.ts           22 fictional students
  community.ts          9 community posts
  options.ts            selectable interests, goals, colleges, limits
  store.tsx             client state, premium gating, request limits
```

## How matching works

`lib/matching.ts` computes four Dice-coefficient sub-scores and a weighted overall score:

| Component | Weight | Built from |
| --- | --- | --- |
| Interest | 0.32 | interests (0.6) and hobbies (0.4) |
| Goal | 0.28 | goals (0.4), career interests (0.35), what they are looking for (0.25) |
| Personality | 0.20 | personality traits |
| Activity | 0.20 | activities they enjoy |

Bonuses: same college +6, same course +3, same year +2, complementary skills +4. The
final score is clamped to 38-98. The function is pure and deterministic, so the server
and client always render the same number and there are no hydration mismatches.

Every recommendation carries up to three plain-language reasons, for example
*"You are both here to find teammates"*, rather than an unexplained percentage.

## Free vs Premium

The free tier is genuinely usable: profile creation, discovery, matching, accepting
connections, chatting, communities and events are all free. Free users get
**5 LinkUp requests per rolling 24 hours**.

LinkUp Premium (**Rs 79/month** or **Rs 599/year**, a 37% saving) adds unlimited LinkUps,
advanced discovery filters, the "Who Matches With Me?" list, the full four-part match
breakdown, Profile Boost limited to relevant students, seeing who linked up with you
before you decide, smart conversation starters, incognito discovery and an optional
badge. No countdown timers, no fake urgency, no dark patterns.

## Configuration

No environment variables are required. See `.env.example`.

## Local development

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run typecheck
npm run build
```

## Deployment

Import the repository into Vercel and accept the detected Next.js defaults. Build command
`next build`, no output directory override, no environment variables.

## Continuous integration

- `.github/workflows/validate.yml` runs lint, typecheck and build on every push and pull
  request. It is the gate.
- `.github/workflows/ci-report.yml` runs the scripts named in `ci-request.txt` and commits
  the full captured output to `ci-reports/latest.md` on the same branch. Only script names
  already declared in `package.json` can run.

## Prototype limitations

- College verification checks that the email domain matches the selected college and then
  accepts any six-digit code. No email is sent.
- Messaging is local to the browser. There is no server, so replies do not arrive.
- Premium upgrade toggles features locally. No billing provider is connected.
- All student profiles and community posts are fictional demo data.
