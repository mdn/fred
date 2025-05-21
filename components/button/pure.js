import { html, nothing } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";

/**
 * @param {object} options
 * @param {string | import("@lit").TemplateResult} options.label
 * @param {import("@lit").TemplateResult} [options.icon]
 * @param {boolean} [options.iconOnly]
 * @param {boolean} [options.disabled]
 * @param {string} [options.href]
 * @param {import("./types.js").ButtonVariants} [options.variant]
 */
export default function Button({
  label,
  icon,
  iconOnly,
  disabled = false,
  href,
  variant,
}) {
  const inner = [
    icon ? html`<span class="icon">${icon}</span>` : nothing,
    html`<span id="label" class="label" ?hidden=${iconOnly}>${label}</span>`,
  ];
  return href
    ? html`<a
        class="button"
        data-variant=${ifDefined(variant)}
        href=${href}
        aria-labelledby="label"
      >
        ${inner}
      </a>`
    : html`<button
        ?disabled=${disabled}
        class="button"
        data-variant=${ifDefined(variant)}
        aria-labelledby="label"
      >
        ${inner}
      </button>`;
}
