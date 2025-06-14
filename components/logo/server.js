import { html } from "lit";

import { ServerComponent } from "../server/index.js";

export class Logo extends ServerComponent {
  /**
   * @param {import("@fred").Context} context
   */
  render(context) {
    return html`
      <a href=${`/${context.locale}/`} class="logo">
        <svg
          class="logo__image"
          width="83"
          height="24"
          viewBox="0 0 83 24"
          role="img"
        >
          <title>MDN</title>
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
}
