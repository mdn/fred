import { html } from "lit-html";

/**
 * @import { TemplateResult } from "lit-html"
 * @import {SPAPage} from "@mdn/rari"
 */

/**
 * @param {Fred.Context<Rari.SPAPage>} _context
 * @returns {TemplateResult}
 */

export function Feedback(_context) {
  return html`<a
    href="https://survey.alchemer.com/s3/7897385/MDN-HTTP-Observatory"
    target="_blank"
    rel="noopener"
    class="feedback-link">
    Report Feedback
  </a>`;
}
