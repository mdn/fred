import { html } from "lit";

/**
 * @typedef {import("lit").TemplateResult} TemplateResult
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
    class="obs-links__link obs-links__link--feedback"
  >
    Report Feedback
  </a>`;
}
