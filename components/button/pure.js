import { html, nothing } from "lit";

/**
 * @param {object} options
 * @param {string | Lit.TemplateResult} [options.label]
 * @param {Lit.TemplateResult} [options.icon]
 * @param {boolean} [options.disabled]
 * @param {string} [options.href]
 * @param {import("./types.js").ButtonVariants} [options.variant]
 */
export default function Button({
  label,
  icon,
  disabled = false,
  href,
  variant,
}) {
  const inner = html`${icon ? html`<span class="icon">${icon}</span>` : nothing}
  ${label}`;
  return href
    ? html`<a class="button ${variant}" href=${href}>${inner}</a>`
    : html`<button ?disabled=${disabled} class="button ${variant}">
        ${inner}
      </button>`;
}
