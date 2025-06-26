import { html } from "@lit-labs/ssr";

export default function Favicon() {
  return html`
    <link
      rel="icon"
      sizes="32x32"
      href="https://developer.mozilla.org/favicon.ico"
    />
    <link
      rel="icon"
      type="image/svg+xml"
      href="https://developer.mozilla.org/favicon.svg"
    />
  `;
}
