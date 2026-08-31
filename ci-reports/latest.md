# CI Report

- Branch: `feature/linkup-mvp`
- Commit: `f45b8af1682ea0e23e64741d1905c2d5f07376cd`
- Run: [`33410105528`](https://github.com/TJ-zip/linkup/actions/runs/33410105528)
- Generated: 2026-08-31 15:44:03 UTC

## install (npm ci)

Exit code: `0`

```
npm warn deprecated inflight@1.0.6: This module is not supported, and leaks memory. Do not use it. Check out lru-cache if you want a good and tested way to coalesce async requests by a key value, which is much more comprehensive and powerful.
npm warn deprecated @humanwhocodes/config-array@0.11.14: Use @eslint/config-array instead
npm warn deprecated rimraf@3.0.2: Rimraf versions prior to v4 are no longer supported
npm warn deprecated @humanwhocodes/object-schema@2.0.3: Use @eslint/object-schema instead
npm warn deprecated glob@7.2.3: Old versions of glob are not supported, and contain widely publicized security vulnerabilities, which have been fixed in the current version. Please update. Support for old versions may be purchased (at exorbitant rates) by contacting i@izs.me
npm warn deprecated glob@10.3.10: Old versions of glob are not supported, and contain widely publicized security vulnerabilities, which have been fixed in the current version. Please update. Support for old versions may be purchased (at exorbitant rates) by contacting i@izs.me
npm warn deprecated eslint@8.57.0: This version is no longer supported. Please see https://eslint.org/version-support for other options.
npm warn deprecated next@14.2.15: This version has a security vulnerability. Please upgrade to a patched version. See https://nextjs.org/blog/security-update-2025-12-11 for more details.

added 394 packages, and audited 395 packages in 8s

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

  ▲ Next.js 14.2.15

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
┌ ○ /                                    618 B          93.6 kB
├ ○ /_not-found                          873 B            88 kB
├ ƒ /chat/[id]                           5.32 kB         105 kB
├ ○ /community                           4.44 kB         104 kB
├ ○ /discover                            3.42 kB         107 kB
├ ○ /home                                2.8 kB          107 kB
├ ○ /linkups                             3.18 kB         107 kB
├ ○ /onboarding                          4.31 kB        97.3 kB
├ ○ /premium                             3.65 kB         104 kB
├ ○ /profile                             5.35 kB         105 kB
├ ƒ /profile/[id]                        2.23 kB         106 kB
└ ○ /who-matches                         2.23 kB         106 kB
+ First Load JS shared by all            87.1 kB
  ├ chunks/117-66a57a4cfbba4f99.js       31.6 kB
  ├ chunks/fd9d1056-8edc3f3573e7d5e5.js  53.6 kB
  └ other shared chunks (total)          1.89 kB


○  (Static)   prerendered as static content
ƒ  (Dynamic)  server-rendered on demand

```

