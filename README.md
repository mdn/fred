# Fred

MDN's next fr(ont)e(n)d.

## Getting started

1. Copy `.env-dist` to `.env` and update
2. Install dependencies `npm install`
3. In one terminal window, start the backend: `node --env-file=.env --run rari -- serve`
4. In another terminal window, start the frontend:

- Run local dev server `npm run dev`
- Open `http://localhost:3000/en-US/` to see the homepage

> [!NOTE]
> If you already have another local server running on port 3000, fred will use the next available port (e.g. 3001).

## Development principles

## Components and Elements

- Components which are or make use of a custom element should place that element's code in `components/element-name/element.js`
  - The class should be exported, and named `MDNElementName`
    - Acronyms should be kept all caps, to match the naming of `HTMLElement` class names, and added to `ACRONYMS` in `build/plugins/generate-element-map.js` to allow the correct types to be generated
  - The element should be registered with a name of `mdn-element-name`
  - If all this is done:
    - The element will be automatically loaded client side if it's present in the DOM at page load
      - Elements inserted client side (i.e. in a hook) won't be automatically loaded, and the hook should handle loading them: probably with an async `import()`
    - The element will be automatically loaded client side for SSR
    - The element will automatically be added to `types/element-map.d.ts` to provide proper types in e.g. `querySelector("mdn-element-name")`

### Typing

- We use [TypeScript in JSDoc annotations](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html) for typing, so we can write and directly execute JavaScript (with no transpilation step)
- We occasionally use TypeScript files directly for writing types/interface which are too complex to easily write in JSDoc
- Eventually we'll have a fully typed codebase, with no errors: while we're in active development we can ignore errors in the interest of development speed/pragmatism:
  - If we do so, we should use `// @ts-expect-error` so we get an error when we fix the error and don't leave unnecessary `// @ts-ignore` comments lying around. While we're in active development these can lack a comment, but eventually we'll require an explanatory comment on each.
