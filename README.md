# Fred

MDN's next fr(ont)e(n)d.

## Getting started

1. Copy `.env-dist` to `.env` and update
2. Install dependencies `npm install`
3. Bring up the dev environment with `npm run start`

## Commands

- `npm run start`
  - runs the rari server and the live-reloading development server together
  - run with `NODE_ENV=production` to run rari with the preview server, you'll need to have run `npm run build` first
- `node --env-file=.env --run rari -- serve`
  - runs the rari server
  - necessary for `npm run dev` and `npm run preview`
- `npm run dev`
  - brings up the live-reloading development server, likely what you want for doing local development
- `npm run build`
  - builds the production js/css/asset bundles
  - must be run at least once for `npm run preview` to work
- `npm run preview`
  - runs the preview server: using the production bundles with the rari server: useful for testing our prod rspack config

### Accessing from non-localhost

If you want to access fred from a different machine, you'll need to run with certain options:

- `HTTPS=true` to enable HTTPS with a self-signed certificate, allowing Web APIs requiring a secure context to work
- `ORIGIN_MAIN=your.local.ip.address` to allowlist your address in the playground

So a full command might look like:

```
HTTPS=true ORIGIN_MAIN=192.168.0.99 npm run start
```

This is useful to test changes on mobile, tablets and other platforms.

## Development principles

### Supported Browsers

_tl;dr_ For visitors to MDN, we support the _Baseline widely available browser set_, with some minor modifications.

#### Browsers

The [*Baseline widely available browser set*](https://developer.mozilla.org/en-US/docs/Glossary/Baseline/Compatibility) is defined as browsers from the *Core browser set* whose initial release date is on or before 30 months prior to today's date, plus long-term support releases.

MDN supports these browsers, along with Firefox for iOS and all currently active Firefox ESR versions:

* Apple Safari (iOS, macOS) — released within the last 2½ years
* Google Chrome (Android, Desktop) — released within the last 2½ years
* Microsoft Edge (Desktop) — released within the last 2½ years
* Mozilla Firefox (Android, Desktop, iOS) — released within the last 2½ years
* Mozilla Firefox ESR — currently supported by Mozilla

#### "Supported"

In this context, *supported* means that any issues with rendering or functionality are considered bugs and will be addressed as soon as reasonably possible.

For issues encountered while using unsupported browsers, we decide on a case-by-case assessment of whether the issue will be addressed; however, these issues may have lower priority.  Issues with screen readers and other accessibility aids are likely to carry higher levels of importance.

We make our best efforts to design MDN to degrade gracefully; however, there are no guarantees of any level of functionality outside the supported browser set.

### Environment variables

See [the environment variables README](./components/env/README.md).

### Inline JS

We need to run some JS as soon as possible at page load, to avoid layout shifts and flashes.
We place this JS in `entry.inline.js`, and it's inlined on page load.
Rspack also generates the necessary CSP hash when doing a prod build with `npm run build`.

If this code is component-specific, it can be [imported with `?source&csp=true`](#custom-imports) and used to set the value of `static inlineScript` in a Server Component.
Remember to add an additional entry to the CSP hashes in yari when doing so.

### Custom Imports

We support a range of non-standard imports in our JavaScript. This includes:

#### `?source`

Imports the raw source of the file as a string.

```js
import text from "./some-file.txt?source";
```

#### `&csp=true`

Logs a CSP hash for the source of the file during the production build.
Most commonly used alongside `?source` to import the source of a file for inlining in a component, which needs to be allowlisted in our CSP:

```js
import inlineScript from "./inline.js?source&csp=true";
```

### Layout

See [the layout README](./components/layout/README.md).

### Media queries

See [the media queries README](./components/media/README.md).

### Sandbox

We have a basic sandbox for testing and styling components in isolation at http://localhost:3000/sandbox

To add a component to the sandbox, add a `sandbox.js` file to the component, which exports a class named like `MyComponentSandbox` which extends the `SandboxComponent` exported from `components/sandbox/class.js`.

### Components and Elements

- Components should live in the `components/` folder, with reserved names which cause certain behavior, explained further below:
  - `component-name/`
    - `global.css` - (reserved): automatically added to global styles
    - `element.js` - (reserved): custom element, automatically imported client side, always imported server side
    - `element.css` - (recommended): styles for custom element's shadow dom
    - `server.js` - (reserved): server component, will automatically load the adjacent `server.css` file when used
    - `server.css` - (reserved): automatically added to page styles when its server component is used in that page
- `global.css`: components which have CSS which should be loaded on _all_ pages should expose that through a `global.css` file:
  - This should be used sparingly, use it for things needed in almost all components, like colors, fonts, etc.
  - Or, when creating a custom element, use it to set the "browser default" styles on that custom element: usually as simple as just `mdn-component-name { display: block; }` or similar
- `element.js`: custom elements should be defined in `components/component-name/element.js`
  - The class should be exported, and named `MDNComponentName`
    - Acronyms should be kept all caps, to match the naming of `HTMLElement` class names, and added to `ACRONYMS` in `build/plugins/generate-element-map.js` to allow the correct types to be generated
  - The element should be registered with a name of `mdn-component-name`
  - If all this is done:
    - The element will be automatically loaded client side if it's present in the DOM at page load
      - Elements inserted client side (i.e. in a hook, or another custom element) won't be automatically loaded, and the hook should handle loading them: probably with an async `import()`
    - The element will be automatically loaded server side for SSR
    - The element will automatically be added to `types/element-map.d.ts` to provide proper types in e.g. `querySelector("mdn-component-name")`
- `server.js`: server components should be defined in `components/component-name/server.js`
  - The class should extend `ServerComponent` from `components/server/index.js`, and be named `ComponentName`
- `server.css`: server component styles should be placed in `components/component-name/server.css`
  - These will be automatically loaded server side when the adjacent `ServerComponent` is used
    - Therefore, these styles should be scoped to the component, usually with a wrapping class

### Typing

- We use [TypeScript in JSDoc annotations](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html) for typing, so we can write and directly execute JavaScript (with no transpilation step)
- We occasionally use TypeScript files directly for writing types/interface which are too complex to easily write in JSDoc
- Eventually we'll have a fully typed codebase, with no errors: while we're in active development we can ignore errors in the interest of development speed/pragmatism:
  - If we do so, we should use `// @ts-expect-error` so we get an error when we fix the error and don't leave unnecessary `// @ts-ignore` comments lying around. While we're in active development these can lack a comment, but eventually we'll require an explanatory comment on each.

### Hydration errors

If our server side rendered custom elements are different to the initial state of our custom elements when rendered client side, Lit will error out during hydration, stopping the execution of our client side JS.

To avoid this, don't compute things that are server/client dependent in `connectedCallback` (or run functions which do this). Instead you must run these in `firstUpdated` (despite the warning lit will raise in development about the element scheduling an update after an update completed).

This issue is tracked upstream: https://github.com/lit/lit/issues/1434
