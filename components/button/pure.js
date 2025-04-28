import { html, nothing } from "lit";

/**
 * @param {object} options
 * @param {string | Lit.TemplateResult} [options.label]
 * @param {Lit.TemplateResult} [options.icon]
 * @param {boolean} [options.disabled]
 * @param {string} [options.href]
 */
export default function Button({ label, icon, disabled = false, href }) {
  const inner = html`${icon ? html`<span class="icon">${icon}</span>` : nothing}
  ${label}`;
  return href
    ? html`<a class="button" href=${href}>${inner}</a>`
    : html`<button ?disabled=${disabled} class="button">${inner}</button>`;
}
