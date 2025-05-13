import { html } from "@lit-labs/ssr";

import favicon from "./favicon-48x48.png?url";

export default function Favicon() {
  return html`<link rel="icon" href=${favicon} />`;
}
