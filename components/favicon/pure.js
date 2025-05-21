import { html } from "@lit-labs/ssr";

export default function Favicon() {
  return html`<link
      rel="shortcut icon"
      href="https://developer.mozilla.org/favicon.ico"
    />
    <link
      rel="alternate icon"
      type="image/svg+xml"
      href="https://developer.mozilla.org/favicon.svg"
    />`;
}
