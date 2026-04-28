# Vendored Yari

This is a trimmed-down vendored copy of [mdn/yari](https://github.com/mdn/yari) (MPL-2.0). Yari is deprecated — fred uses only the parts needed to render MDN Plus and to support the playground/runner. Everything else has been removed.

Originally inlined from upstream commit [`0cfdd1b8`](https://github.com/mdn/yari/commit/0cfdd1b8445c0c6983ff4f2ce6375ae32308047a) (yari 5.x); has since been pruned for fred's needs.

## What's here

- **`client/src/`** — React/Lit source for the legacy bundle. Fred's [`legacy/index.tsx`](../../legacy/index.tsx) renders `<Plus />` from this tree. Subset kept: `plus/`, `ui/`, `document/`, `lit/`, `playground/`, `settings/`, `telemetry/`, `homepage/static-page/` (used by Plus docs), plus shared providers (`user-context.tsx`, `ui-context.tsx`, `placement-context.tsx`) and utilities. Yari's full SPA router and the homepage/blog/community/curriculum/observatory/etc. routes have all been removed.
- **`client/pwa/src/`** — service worker source, used by the rspack `service-worker` entry in [rspack.config.js](../../rspack.config.js). Note: the offline pre-cache install handler currently no-ops because it expects a manifest format and path that fred doesn't emit. Fixing that would require additional work (see "Known limitations" below).
- **`client/public/assets/`** — illustration/icon SVGs and PNGs referenced by Plus React components.
- **`libs/play/`** — playground runner used at runtime by fred's [server.js](../../server.js) (`handleRunner`). Not bundled by rspack.
- **`libs/{constants,languages,locale-utils,types}/`** — utility libs imported by `client/src/` files we kept.
- **`package.json`, `yarn.lock`** — define the deps installed into `node_modules/` here. Rspack reaches into this tree to resolve React, react-router-dom, and other yari runtime deps when building the legacy bundle (see [rspack.config.js:430-433](../../rspack.config.js#L430-L433)).

## How fred uses it

- `npm install` in fred's root triggers `fred/package.json`'s `prepare` script, which runs `yarn --frozen-lockfile` here. That invokes `vendor/yari/package.json`'s own `prepare`, which recursively installs nested `node_modules/` for `libs/locale-utils/`, `libs/play/`, and `client/pwa/`.
- `npm run build` / `npm run dev` (with `FRED_LEGACY=true`) bundles `legacy/index.tsx` and the service worker via rspack, pulling React/React-Router/etc. from `vendor/yari/node_modules/` and `vendor/yari/client/pwa/node_modules/`.

## Known limitations / quirks

- **Express v4/v5 mismatch** — yari was written against Express 4, fred uses Express 5. Server-side calls into `libs/play/handleRunner` need a `// @ts-expect-error` at the call site (see [server.js](../../server.js)).
- **Dual React** — yari targets React 18; fred transitively pulls React 19 via the `downshift` devDep. The legacy bundle aliases `react` to `vendor/yari/node_modules/react@18` to keep a single copy.
- **PWA offline pre-cache is a no-op** — the service worker's install handler fetches `/asset-manifest.json` (yari's old root-level manifest path) and parses it as `{ files: object }` (yari's old shape). Fred doesn't emit either. The fetch-event runtime cache still works opportunistically, but install-time pre-caching does nothing.
- **`packageManager: "yarn@1.22.22"`** in this `package.json` is a workaround so yarn 1.x doesn't refuse to run when fred's outer `package.json` declares `npm@…` as its package manager.

## Updating

There's no automated sync. To incorporate upstream changes, hand-pick from the relevant yari commit and re-apply over this tree, then re-verify `npm run build` and `npm run tsc` in fred.

## License

MPL-2.0 — see [`LICENSE`](./LICENSE).
