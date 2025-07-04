import { html, nothing } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";

/**
 * @param {object} options
 * @param {string | import("@lit").TemplateResult} options.label
 * @param {import("@lit").TemplateResult} [options.icon]
 * @param {boolean} [options.iconOnly]
 * @param {boolean} [options.disabled]
 * @param {string} [options.href]
 * @param {string} [options.target]
 * @param {import("./types.js").ButtonVariants} [options.variant]
 * @param {import("./types.js").ButtonActions} [options.action]
 */
export default function Button({
  label,
  icon,
  iconOnly,
  disabled = false,
  href,
  target,
  variant = "primary",
  action,
}) {
  const inner = [
    icon ? html`<span class="icon">${icon}</span>` : nothing,
    html`<span id="label" class="label" ?hidden=${iconOnly}>${label}</span>`,
  ];
  return href
    ? html`<a
        href=${href}
        target=${ifDefined(target)}
        class="button"
        aria-labelledby="label"
        data-variant=${ifDefined(variant)}
        data-action=${ifDefined(action)}
      >
        ${inner}
      </a>`
    : html`<button
        class="button"
        aria-labelledby="label"
        ?disabled=${disabled}
        data-variant=${ifDefined(variant)}
        data-action=${ifDefined(action)}
      >
        ${inner}
      </button>`;
}
