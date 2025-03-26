import { html } from "lit";

/**
 * @param {Fred.Context<Rari.SPAPage>} _context
 * @returns {Lit.TemplateResult}
 */
export function Feedback(_context) {
  return html`<a
    href="https://survey.alchemer.com/s3/7897385/MDN-HTTP-Observatory"
    target="_blank"
    rel="noopener"
    class="feedback-link"
  >
    Report Feedback
  </a>`;
}
