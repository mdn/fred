import { html } from "lit";

/**
 * @param {import("types/fred.js").Context<import("types/rari.js").SpaPage>} _context
 * @returns {import("types/lit.js").TemplateResult}
 */
export function FAQ(_context) {
  return html`<a
    href="/en-US/observatory/docs/faq"
    target="_blank"
    rel="noopener"
    class="obs-links__link obs-links__link--faq"
  >
    Read our FAQ
  </a>`;
}
