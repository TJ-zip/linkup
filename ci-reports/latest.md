# CI Report

- Branch: `feature/linkup-mvp`
- Commit: `52a31c5feddb7a706cefd0b07edbac9e8c512ad4`
- Run: [`33408988661`](https://github.com/TJ-zip/linkup/actions/runs/33408988661)
- Generated: 2026-08-31 15:32:16 UTC

## install (npm install)

Exit code: `0`

```
npm warn deprecated inflight@1.0.6: This module is not supported, and leaks memory. Do not use it. Check out lru-cache if you want a good and tested way to coalesce async requests by a key value, which is much more comprehensive and powerful.
npm warn deprecated rimraf@3.0.2: Rimraf versions prior to v4 are no longer supported
npm warn deprecated @humanwhocodes/object-schema@2.0.3: Use @eslint/object-schema instead
npm warn deprecated @humanwhocodes/config-array@0.11.14: Use @eslint/config-array instead
npm warn deprecated glob@7.2.3: Old versions of glob are not supported, and contain widely publicized security vulnerabilities, which have been fixed in the current version. Please update. Support for old versions may be purchased (at exorbitant rates) by contacting i@izs.me
npm warn deprecated glob@10.3.10: Old versions of glob are not supported, and contain widely publicized security vulnerabilities, which have been fixed in the current version. Please update. Support for old versions may be purchased (at exorbitant rates) by contacting i@izs.me
npm warn deprecated eslint@8.57.0: This version is no longer supported. Please see https://eslint.org/version-support for other options.
npm warn deprecated next@14.2.15: This version has a security vulnerability. Please upgrade to a patched version. See https://nextjs.org/blog/security-update-2025-12-11 for more details.

added 392 packages, and audited 393 packages in 32s

158 packages are looking for funding
  run `npm fund` for details

5 vulnerabilities (4 high, 1 critical)

To address all issues (including breaking changes), run:
  npm audit fix --force

Run `npm audit` for details.
```

## npm run lint

Exit code: `1`

```

> linkup@0.1.0 lint
> next lint

/home/runner/work/linkup/linkup/node_modules/next/dist/lib/find-pages-dir.js:42
        throw new Error("> Couldn't find any `pages` or `app` directory. Please create one under the project root");
              ^

Error: > Couldn't find any `pages` or `app` directory. Please create one under the project root
    at findPagesDir (/home/runner/work/linkup/linkup/node_modules/next/dist/lib/find-pages-dir.js:42:15)
    at Module.nextLint (/home/runner/work/linkup/linkup/node_modules/next/dist/cli/next-lint.js:76:65)

Node.js v20.20.2
```

## npm run typecheck

Exit code: `0`

```

> linkup@0.1.0 typecheck
> tsc --noEmit

```

## npm run build

Exit code: `1`

```

> linkup@0.1.0 build
> next build

⚠ No build cache found. Please configure build caching for faster rebuilds. Read more: https://nextjs.org/docs/messages/no-cache
Attention: Next.js now collects completely anonymous telemetry regarding usage.
This information is used to shape Next.js' roadmap and prioritize features.
You can learn more, including how to opt-out if you'd not like to participate in this anonymous program, by visiting the following URL:
https://nextjs.org/telemetry


> Build error occurred
Error: > Couldn't find any `pages` or `app` directory. Please create one under the project root
    at findPagesDir (/home/runner/work/linkup/linkup/node_modules/next/dist/lib/find-pages-dir.js:42:15)
    at /home/runner/work/linkup/linkup/node_modules/next/dist/build/index.js:402:73
    at async Span.traceAsyncFn (/home/runner/work/linkup/linkup/node_modules/next/dist/trace/trace.js:154:20)
    at async build (/home/runner/work/linkup/linkup/node_modules/next/dist/build/index.js:364:9)
```

