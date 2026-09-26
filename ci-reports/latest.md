# CI Report

- Branch: `main`
- Commit: `a9cea4c01b11e79128c4b87b7eeb29bf67126b3f`
- Run: [`36257535904`](https://github.com/TJ-zip/linkup/actions/runs/36257535904)
- Generated: 2026-09-26 17:01:34 UTC

## install (npm ci)

Exit code: `0`

```
npm warn deprecated rimraf@3.0.2: Rimraf versions prior to v4 are no longer supported
npm warn deprecated inflight@1.0.6: This module is not supported, and leaks memory. Do not use it. Check out lru-cache if you want a good and tested way to coalesce async requests by a key value, which is much more comprehensive and powerful.
npm warn deprecated @humanwhocodes/object-schema@2.0.3: Use @eslint/object-schema instead
npm warn deprecated @humanwhocodes/config-array@0.11.14: Use @eslint/config-array instead
npm warn deprecated glob@7.2.3: Old versions of glob are not supported, and contain widely publicized security vulnerabilities, which have been fixed in the current version. Please update. Support for old versions may be purchased (at exorbitant rates) by contacting i@izs.me
npm warn deprecated glob@10.3.10: Old versions of glob are not supported, and contain widely publicized security vulnerabilities, which have been fixed in the current version. Please update. Support for old versions may be purchased (at exorbitant rates) by contacting i@izs.me
npm warn deprecated eslint@8.57.0: This version is no longer supported. Please see https://eslint.org/version-support for other options.

added 394 packages, and audited 395 packages in 21s

158 packages are looking for funding
  run `npm fund` for details

5 vulnerabilities (4 high, 1 critical)

To address all issues (including breaking changes), run:
  npm audit fix --force

Run `npm audit` for details.
```

## npm run lint

Exit code: `0`

```

> linkup@0.1.0 lint
> next lint

Attention: Next.js now collects completely anonymous telemetry regarding usage.
This information is used to shape Next.js' roadmap and prioritize features.
You can learn more, including how to opt-out if you'd not like to participate in this anonymous program, by visiting the following URL:
https://nextjs.org/telemetry

✔ No ESLint warnings or errors
```

## npm run typecheck

Exit code: `0`

```

> linkup@0.1.0 typecheck
> tsc --noEmit

```

## npm run build

Exit code: `0`

```

> linkup@0.1.0 build
> next build

  ▲ Next.js 14.2.35

   Creating an optimized production build ...
 ✓ Compiled successfully
   Linting and checking validity of types ...
   Collecting page data ...
   Generating static pages (0/12) ...
   Generating static pages (3/12) 
   Generating static pages (6/12) 
   Generating static pages (9/12) 
 ✓ Generating static pages (12/12)
   Finalizing page optimization ...
   Collecting build traces ...

Route (app)                              Size     First Load JS
┌ ○ /                                    618 B          93.7 kB
├ ○ /_not-found                          873 B          88.1 kB
├ ƒ /chat/[id]                           5.32 kB         107 kB
├ ○ /community                           4.44 kB         106 kB
├ ○ /discover                            3.42 kB         110 kB
├ ○ /home                                2.8 kB          109 kB
├ ○ /linkups                             3.18 kB         109 kB
├ ○ /onboarding                          4.31 kB        97.4 kB
├ ○ /premium                             3.65 kB         106 kB
├ ○ /profile                             5.35 kB         107 kB
├ ƒ /profile/[id]                        2.23 kB         108 kB
└ ○ /who-matches                         2.23 kB         108 kB
+ First Load JS shared by all            87.3 kB
  ├ chunks/117-b93b2d5c59297f67.js       31.7 kB
  ├ chunks/fd9d1056-dcba7f094ce3d609.js  53.6 kB
  └ other shared chunks (total)          1.89 kB


○  (Static)   prerendered as static content
ƒ  (Dynamic)  server-rendered on demand

```

