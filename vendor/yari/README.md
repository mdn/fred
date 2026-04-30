# Vendored Yari

This is a trimmed-down vendored copy of [mdn/yari](https://github.com/mdn/yari) (MPL-2.0). Yari is deprecated — fred uses only the parts needed to render MDN Plus and to support the playground/runner. Everything else has been removed.

Originally inlined from upstream commit [`0cfdd1b8`](https://github.com/mdn/yari/commit/0cfdd1b8445c0c6983ff4f2ce6375ae32308047a) (yari 5.x); has since been pruned for fred's needs.

## What's here

- **`client/src/`** — React/Lit source for the legacy bundle. Fred's [`legacy/index.tsx`](../../legacy/index.tsx) renders `<Plus />` from this tree. Subset kept: `plus/`, `ui/`, `document/`, `lit/`, `playground/`, `settings/`, `telemetry/`, `homepage/static-page/` (used by Plus docs), plus shared providers (`user-context.tsx`, `ui-context.tsx`, `placement-context.tsx`) and utilities. Yari's full SPA router and the homepage/blog/community/curriculum/observatory/etc. routes have all been removed.
- **`client/pwa/src/`** — service worker source, used by the rspack `service-worker` entry in [rspack.config.js](../../rspack.config.js). Note: the offline pre-cache install handler currently no-ops because it expects a manifest format and path that fred doesn't emit. Fixing that would require additional work (see "Known limitations" below).
- **`client/public/assets/`** — illustration/icon SVGs and PNGs referenced by Plus React components.
- **`libs/play/`** — playground runner used at runtime by fred's [server.js](../../server.js) (`handleRunner`). Not bundled by rspack.
- **`libs/{constants,languages,locale-utils,types}/`** — utility libs imported by `client/src/` files we kept.
- **`package.json`, `package-lock.json`** — define the deps installed into `node_modules/` here. The root declares `libs/*` and `client/pwa` as npm workspaces, so a single `npm ci` populates everything. Rspack reaches into this tree to resolve React, react-router-dom, and other yari runtime deps when building the legacy bundle (see [rspack.config.js](../../rspack.config.js)).

## How fred uses it

- `npm install` in fred's root triggers `fred/package.json`'s `prepare` script, which runs `npm ci` here. Workspaces hoist nested deps to `vendor/yari/node_modules/`.
- `npm run build` / `npm run dev` (with `FRED_LEGACY=true`) bundles `legacy/index.tsx` and the service worker via rspack, pulling React/React-Router/etc. from `vendor/yari/node_modules/`.

## Dependencies

What each entry in [`package.json`](./package.json) is for:

- **`@mdn/minimalist`** — Sass mixins (e.g. `animation`) used by [loading/index.scss](./client/src/ui/atoms/loading/index.scss).
- **`@mozilla/glean`** — telemetry SDK powering the Glean event/ping pipeline in [client/src/telemetry/](./client/src/telemetry/).
- **`@stripe/stripe-js`** — loads Stripe.js for the Plus subscribe flow ([stripe.tsx](./client/src/plus/offer-overview/offer-overview-subscribe/stripe.tsx)).
- **`@use-it/interval`** — `setInterval` React hook used by [offline-settings.tsx](./client/src/settings/offline-settings.tsx) to poll offline-content state.
- **`dayjs`** — "time ago" relative-time formatting in [collections](./client/src/plus/collections/) views.
- **`dexie`** — IndexedDB wrapper backing the offline-settings DB and PWA service worker DB ([settings/db.ts](./client/src/settings/db.ts), [pwa/src/db.ts](./client/pwa/src/db.ts)).
- **`prismjs`** — syntax highlighter used by [syntax-highlight.tsx](./client/src/document/code/syntax-highlight.tsx) for code blocks.
- **`prism-svelte`** — Prism language plugin lazy-loaded for `lang="svelte"` code blocks.
- **`react`** — UI framework; every Plus page is a React component.
- **`react-dom`** — React DOM renderer; mounted by fred's [legacy/index.tsx](../../legacy/index.tsx) entry that hosts the vendored Plus UI.
- **`react-markdown`** — renders streamed Markdown answers in [ai-help](./client/src/plus/ai-help/index.tsx).
- **`react-modal`** — accessible modal primitive in [ui/atoms/modal](./client/src/ui/atoms/modal/index.tsx).
- **`react-router`** — core routing primitives (`Routes`, `useParams`, `useLocation`) for Plus sub-routes.
- **`react-router-dom`** — DOM-bound router (`Link`, `useSearchParams`) used widely across Plus pages.
- **`remark-gfm`** — GitHub-flavored Markdown plugin paired with `react-markdown` in AI Help.
- **`sse.js`** — Server-Sent-Events client streaming AI Help responses ([use-ai.ts](./client/src/plus/ai-help/use-ai.ts)).
- **`swr`** — data-fetching/cache hook used pervasively (user context, collections, article actions, etc.).

## Known limitations / quirks

- **PWA offline pre-cache is a no-op** — the service worker's install handler fetches `/static/legacy/asset-manifest.json` and expects a `string[]` of asset paths, but rspack doesn't emit that file. The fetch-event runtime cache still works opportunistically; install-time pre-caching does nothing.

## License

MPL-2.0 — see [`LICENSE`](./LICENSE).
