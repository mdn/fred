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
