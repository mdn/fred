import { html } from "lit";

import "./index.css";

/**
 * @param {Fred.Context} _context
 */
export function Logo(_context) {
  return html`
    <a href="/" class="logo">
      <svg
        class="logo__image"
        data-type="desktop"
        width="160"
        height="24"
        viewBox="0 0 160 24"
        role="img"
      >
        <title>MDN Web Docs</title>
        <path
          class="logo__letter"
          d="M9.4 0 2.81 21.17H.12L6.69 0H9.4Zm2.38 0v21.17H9.4V0h2.4Zm9.27 0-6.56 21.17H11.8L18.36 0h2.69Zm2.39 0v21.17h-2.4V0h2.4Z"
        />
        <path
          class="logo__text"
          d="M84.5 9.66h-.93l-2.46 7.08h-1.26l-2.48-5.98h-.1l-2.4 5.98h-1.2l-2.58-7.08h-.87v-1.3h4.16v1.3h-1.5l1.57 4.68h.09l2.37-5.97h1.08l2.57 5.97h.12l1.3-4.66h-1.42V8.39h3.93v1.27Zm8.02 4.6a2.9 2.9 0 0 1-1.08 1.88c-.75.56-1.67.84-2.6.78a4.28 4.28 0 0 1-3.01-1.08c-.76-.74-1.15-1.77-1.15-3.15 0-1.31.37-2.37 1.08-3.22a3.65 3.65 0 0 1 2.96-1.26c1.18 0 2.1.36 2.74 1.08.64.71.99 1.58.99 2.6 0 .34-.05.68-.12 1.08h-5.88c.07 1.77.92 2.66 2.5 2.66.67 0 1.18-.16 1.5-.46.33-.3.57-.69.69-1.12l1.38.2Zm-1.82-2.47a2.5 2.5 0 0 0-.41-1.58c-.32-.5-.88-.76-1.61-.76-.71 0-1.22.23-1.59.69a3.3 3.3 0 0 0-.64 1.65h4.25Zm11.72.55c0 1.15-.3 2.19-.91 3.15-.63.97-1.6 1.43-2.92 1.43-1.38 0-2.37-.5-2.92-1.54l-.1.67-.09.66H93.8c.15-.82.24-1.65.28-2.48v-9.1H92.7v-1.3h3.06v6.22c.25-.51.62-.95 1.08-1.31a3 3 0 0 1 1.93-.56 3.5 3.5 0 0 1 2.62 1.08 4.3 4.3 0 0 1 1.03 3.08Zm-1.77.14c0-.96-.23-1.7-.68-2.18a2.18 2.18 0 0 0-1.7-.76 2.2 2.2 0 0 0-1.84.85c-.42.5-.66 1.12-.7 1.77v.94c0 .7.24 1.3.7 1.77.46.49 1.03.72 1.74.72.83 0 1.45-.3 1.86-.9.42-.62.63-1.36.63-2.2Zm15.91 4.26h-3.03v-1.66c-.27.51-.66.95-1.13 1.29a3 3 0 0 1-1.9.55c-1.1 0-2-.37-2.67-1.13a4.42 4.42 0 0 1-1-3.05c0-1.15.3-2.21.93-3.15.6-.95 1.58-1.43 2.94-1.43 1.31 0 2.25.5 2.83 1.5V5.13h-1.98v-1.3h3.63v11.64h1.38v1.27Zm-3.05-3.87v-1a2.28 2.28 0 0 0-.74-1.69 2.4 2.4 0 0 0-1.66-.64 2.19 2.19 0 0 0-1.88.9 3.63 3.63 0 0 0-.64 2.2c0 .95.23 1.68.69 2.19.46.5 1.03.76 1.7.76.73 0 1.33-.3 1.79-.88.48-.6.71-1.22.74-1.84Zm12.2-.32c0 1.29-.41 2.35-1.22 3.15-.8.8-1.88 1.22-3.2 1.22a4.1 4.1 0 0 1-3.07-1.17 4.28 4.28 0 0 1-1.15-3.1 4.83 4.83 0 0 1 1.08-3.16c.73-.87 1.82-1.3 3.26-1.3 1.45 0 2.53.43 3.25 1.3a4.7 4.7 0 0 1 1.05 3.06Zm-1.77-.04c0-.92-.23-1.66-.69-2.19a2.4 2.4 0 0 0-1.88-.8c-.83 0-1.47.27-1.91.85a3.48 3.48 0 0 0-.67 2.18c0 .85.21 1.56.65 2.16a2.2 2.2 0 0 0 1.9.9c.83 0 1.48-.3 1.94-.87.45-.66.69-1.44.66-2.23Zm10.35 1.33c-.1.73-.44 1.45-1.01 2.1-.58.66-1.47.98-2.72.98a3.9 3.9 0 0 1-2.9-1.1c-.73-.74-1.1-1.77-1.1-3.15a4.9 4.9 0 0 1 1.08-3.2 3.75 3.75 0 0 1 3.04-1.3c.53 0 1.06.06 1.54.17.5.12.96.35 1.42.67l.35 2.19-1.36.16-.3-1.4a3.28 3.28 0 0 0-1.65-.42c-.8 0-1.4.28-1.77.85a3.84 3.84 0 0 0-.58 2.2c0 .95.21 1.69.62 2.2.42.52 1.02.77 1.8.77 1.2 0 1.88-.66 2.11-2.02l1.43.3Zm7.97.44a2.2 2.2 0 0 1-1.05 1.95 4.9 4.9 0 0 1-2.7.69 6.44 6.44 0 0 1-3.35-.83l.28-2.02 1.3.14-.04 1.08c.25.11.53.2.83.25l.9.07c.55 0 1.03-.1 1.49-.3.44-.2.67-.5.67-.94a.92.92 0 0 0-.53-.88c-.35-.16-.8-.3-1.34-.39l-1.58-.32a3.22 3.22 0 0 1-1.31-.67c-.37-.32-.53-.8-.53-1.44 0-.95.34-1.59 1.06-1.96a4.9 4.9 0 0 1 2.27-.55 6.28 6.28 0 0 1 3.06.76l.18 2.02-1.33.16-.18-1.3a4.14 4.14 0 0 0-1.66-.37c-.4-.02-.8.07-1.17.25-.3.18-.46.46-.46.87 0 .4.18.67.53.83.42.18.86.3 1.3.37.51.09 1.04.18 1.55.32.5.14.94.37 1.3.69.36.42.54.96.51 1.52Zm-96.7 2.55h-3.94v-1.27h.87v-3.63c0-.85-.16-1.45-.48-1.82a1.65 1.65 0 0 0-1.3-.52c-.74 0-1.3.25-1.66.78a2.98 2.98 0 0 0-.58 1.58v3.59h1.38v1.26h-3.93v-1.26h.87v-3.6c0-.88-.16-1.48-.48-1.83a1.7 1.7 0 0 0-1.29-.52 1.93 1.93 0 0 0-1.65.75 2.85 2.85 0 0 0-.58 1.6v3.62h1.59v1.27h-4.64v-1.27h1.37V9.75h-1.4V8.46h3.08v1.47c.28-.48.62-.87 1.08-1.2a3 3 0 0 1 1.68-.45c.67 0 1.22.16 1.73.48.5.32.85.8 1.03 1.47.25-.57.62-1.03 1.13-1.4.5-.37 1.1-.55 1.81-.55.8 0 1.5.25 2.05.75.55.51.85 1.3.85 2.35v4.18h1.4v1.27Zm9.76 0H52.3v-1.66c-.27.51-.66.95-1.13 1.29-.56.4-1.23.59-1.9.55-1.11 0-2-.37-2.67-1.12a4.41 4.41 0 0 1-1-3.06c0-1.15.3-2.2.93-3.15.6-.94 1.58-1.43 2.94-1.43 1.36 0 2.25.5 2.83 1.5V5.22h-2V3.93h3.63v11.63h1.38v1.27Zm-3.06-3.86v-1.02a2.28 2.28 0 0 0-.73-1.67 2.4 2.4 0 0 0-1.66-.65 2.18 2.18 0 0 0-1.88.9 3.63 3.63 0 0 0-.65 2.2c0 .95.23 1.68.7 2.19.45.5 1.03.76 1.7.76.73 0 1.33-.3 1.79-.88.48-.6.71-1.21.73-1.83Zm14.14 3.86h-4.43v-1.27h1.37v-3.63c0-.85-.16-1.45-.5-1.82a1.68 1.68 0 0 0-1.31-.52c-.71 0-1.29.23-1.7.69a2.52 2.52 0 0 0-.67 1.6v3.66h1.38v1.26H56.1v-1.26h1.38v-5.8h-1.42V8.47h3.12V9.9c.6-1.06 1.57-1.6 2.92-1.6.83 0 1.54.26 2.12.77.57.5.85 1.28.85 2.34v4.19h1.38v1.24h-.05Z"
        />
        <path class="logo__cursor" d="M144.47 21.98H160V24h-15.53v-2.02Z" />
      </svg>
      <svg
        class="logo__image"
        data-type="mobile"
        width="83"
        height="24"
        viewBox="0 0 83 24"
        role="img"
      >
        <title>MDN Web Docs</title>
        <path
          class="logo__letter"
          d="M9.4 0 2.81 21.17H.12L6.69 0H9.4Zm2.38 0v21.17H9.4V0h2.4Zm9.27 0-6.56 21.17H11.8L18.36 0h2.69Zm2.39 0v21.17h-2.4V0h2.4Z"
        />
        <path
          class="logo__text"
          d="M45.55 16.83h-3.93v-1.27h.87v-3.63c0-.85-.16-1.45-.48-1.82a1.65 1.65 0 0 0-1.3-.52c-.74 0-1.3.25-1.66.78a2.98 2.98 0 0 0-.58 1.58v3.59h1.38v1.26h-3.93v-1.26h.87v-3.6c0-.88-.16-1.48-.48-1.83a1.7 1.7 0 0 0-1.29-.52 1.93 1.93 0 0 0-1.65.75 2.85 2.85 0 0 0-.58 1.6v3.62h1.59v1.27h-4.64v-1.27h1.37V9.75h-1.4V8.46h3.08v1.47c.28-.48.62-.87 1.08-1.2a3 3 0 0 1 1.68-.45c.67 0 1.22.16 1.73.48.5.32.85.8 1.03 1.47.25-.57.62-1.03 1.13-1.4.5-.37 1.1-.55 1.81-.55.8 0 1.5.25 2.05.75.55.51.85 1.3.85 2.35v4.18h1.4v1.27Zm9.77 0H52.3v-1.66c-.27.51-.66.95-1.13 1.29-.56.4-1.23.59-1.9.55-1.11 0-2-.37-2.67-1.12a4.41 4.41 0 0 1-1-3.06c0-1.15.3-2.2.93-3.15.6-.94 1.58-1.43 2.94-1.43 1.36 0 2.25.5 2.83 1.5V5.22h-2V3.93h3.63v11.63h1.38v1.27Zm-3.06-3.86v-1.02a2.28 2.28 0 0 0-.73-1.67 2.4 2.4 0 0 0-1.66-.65 2.18 2.18 0 0 0-1.88.9 3.63 3.63 0 0 0-.65 2.2c0 .95.23 1.68.7 2.19.45.5 1.03.76 1.7.76.73 0 1.33-.3 1.79-.88.48-.6.71-1.21.73-1.83Zm14.14 3.86h-4.43v-1.27h1.37v-3.63c0-.85-.16-1.45-.5-1.82a1.68 1.68 0 0 0-1.31-.52c-.71 0-1.29.23-1.7.69a2.52 2.52 0 0 0-.67 1.6v3.66h1.38v1.26H56.1v-1.26h1.38v-5.8h-1.42V8.47h3.12V9.9c.6-1.06 1.57-1.6 2.92-1.6.83 0 1.54.26 2.12.77.57.5.85 1.28.85 2.34v4.19h1.38v1.24h-.05Z"
        />
        <path class="logo__cursor" d="M67.71 21.98H83V24H67.71v-2.02Z" />
      </svg>
    </a>
  `;
}
