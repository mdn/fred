import { html } from "lit";

/**
 * @typedef {import("lit").TemplateResult} TemplateResult
 */

/**
 * @param {Fred.Context<Rari.SPAPage>} _context
 * @returns {TemplateResult}
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
