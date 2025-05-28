import { html } from "lit";

export default function Button({
  href,
}) {
  return href
    ? html`
        <a
          class="button"
          href="href"
          data-variant="varian"
          data-action="action"
        >
          label
        </a>
      `
    : html`
        <button
          class="button"
          type="button"
          data-variant="variant"
          data-action="action"
          disabled
        >
          label
        </button>
      `;
}
