import { html, nothing } from "lit";

import "./global.css";

/**
 * @param {object} options
 * @param {string | Lit.TemplateResult} [options.label]
 * @param {Lit.TemplateResult} [options.icon]
 * @param {boolean} [options.disabled]
 * @param {string} [options.href]
 */
export function Button({ label, icon, disabled = false, href }) {
  return href
    ? html`<a class="button">
        ${icon ? html`<span class="icon">${icon}</span>` : nothing} ${label}
      </a>`
    : html`<button ?disabled=${disabled} class="button">
        ${icon ? html`<span class="icon">${icon}</span>` : nothing} ${label}
      </button>`;
}
