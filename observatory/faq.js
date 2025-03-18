import { html } from "lit-html";

/**
 * @typedef {import("@mdn/rari").SPAPage} SPAPage
 * @typedef {import("lit-html").TemplateResult} TemplateResult
 */

/**
 * @param {Fred.Context<Rari.SPAPage>} _context
 * @returns {TemplateResult}
 */
export function Faq(_context) {
  return html`<a
    href="/en-US/observatory/docs/faq"
    target="_blank"
    rel="noopener"
    class="feedback-link faq-link"
  >
    Read our FAQ
  </a>`;
}
