import { html } from "lit";

/**
 * @param {Fred.Context<Rari.SpaPage>} _context
 * @returns {Lit.TemplateResult}
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
