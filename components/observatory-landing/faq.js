import { html } from "lit";

/**
 * @param {import("@fred").Context<import("@rari").SPAPage>} _context
 * @returns {import("@lit").TemplateResult}
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
