# Fred

MDN's next fr(ont)e(n)d.

## Getting started

1. Install dependencies `npm install`
2. In one terminal window, start the backend:

- Run `CONTENT_ROOT=../content/files npm run rari serve`
- Where `CONTENT_ROOT` points to the location of the [mdn/content](https://github.com/mdn/content/) files.

3. In another terminal window, start the frontend:

- Run local dev server `npm run dev`
- Open `http://localhost:3000/en-US/` to see the homepage

> [!NOTE]
> If you already have another local server running on port 3000, fred will use the next available port (e.g. 3001).

## Development principles

### Typing

- We use [TypeScript in JSDoc annotations](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html) for typing, so we can write and directly execute JavaScript (with no transpilation step)
- We occasionally use TypeScript files directly for writing types/interface which are too complex to easily write in JSDoc
- Eventually we'll have a fully typed codebase, with no errors: while we're in active development we can ignore errors in the interest of development speed/pragmatism:
  - If we do so, we should use `// @ts-expect-error` so we get an error when we fix the error and don't leave unnecessary `// @ts-ignore` comments lying around
