import { html } from "lit-html";

/**
 * @import { TemplateResult } from "lit-html"
 * @import {SPAPage} from "@mdn/rari"
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
    class="feedback-link faq-link"
  >
    Read our FAQ
  </a>`;
}
