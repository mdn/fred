import { html, nothing } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";

/**
 * @param {object} options
 * @param {string | import("@lit").TemplateResult} options.label
 * @param {import("@lit").TemplateResult} [options.icon]
 * @param {boolean} [options.iconOnly]
 * @param {import("./types.js").ButtonIconPositions} [options.iconPosition]
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
  iconPosition,
  disabled = false,
  href,
  target,
  variant = "primary",
  action,
}) {
  const iconElement = icon ? html`<span class="icon">${icon}</span>` : nothing;
  const labelElement = html`<span id="label" class="label" ?hidden=${iconOnly}
    >${label}</span
  >`;

  const inner =
    icon && iconPosition === "after"
      ? [labelElement, iconElement]
      : [iconElement, labelElement];

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
