import { html } from "lit";

/**
 * @returns {Lit.TemplateResult}
 */
export function FAQ() {
  return html`<a
    href="/en-US/observatory/docs/faq"
    target="_blank"
    rel="noopener"
    class="obs-links__link obs-links__link--faq"
  >
    Read our FAQ
  </a>`;
}
