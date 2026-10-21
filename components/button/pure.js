import { html, nothing } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";

import { randomIdString } from "../utils/index.js";

/**
 * @param {object} options
 * @param {string | import("@lit").TemplateResult} options.label
 * @param {string} [options.labelId] - Label ID unique within the containing tree. Ignored for string labels.
 * @param {import("@lit").TemplateResult} [options.icon]
 * @param {boolean} [options.iconOnly]
 * @param {import("./types.js").ButtonIconPositions} [options.iconPosition]
 * @param {boolean} [options.disabled]
 * @param {boolean} [options.ariaDisabled]
 * @param {string} [options.ariaDescription]
 * @param {string} [options.title]
 * @param {string} [options.href]
 * @param {string} [options.target]
 * @param {string} [options.rel]
 * @param {import("./types.js").ButtonVariants} [options.variant]
 * @param {import("./types.js").ButtonActions} [options.action]
 */
export default function Button({
  label,
  labelId,
  icon,
  iconOnly,
  iconPosition,
  disabled = false,
  ariaDisabled = false,
  ariaDescription,
  title,
  href,
  target,
  rel,
  variant = "primary",
  action,
}) {
  const ariaLabel = iconOnly && typeof label === "string" ? label : undefined;
  const resolvedLabelId =
    typeof label === "string"
      ? undefined
      : (labelId ?? randomIdString("label-"));
  const iconElement = icon
    ? html`<span class="icon" part="icon" aria-hidden="true">${icon}</span>`
    : nothing;
  const labelElement = html`
    <span
      id=${ifDefined(resolvedLabelId)}
      class="label"
      ?hidden=${iconOnly}
      part="label"
      >${label}</span
    >
  `;

  const inner =
    iconPosition === "after"
      ? [labelElement, iconElement]
      : [iconElement, labelElement];

  return href
    ? html`
        <a
          class="button"
          href=${href}
          target=${ifDefined(target)}
          rel=${ifDefined(rel)}
          aria-label=${ifDefined(ariaLabel)}
          aria-labelledby=${ifDefined(resolvedLabelId)}
          aria-description=${ifDefined(ariaDescription)}
          title=${ifDefined(title)}
          data-variant=${ifDefined(variant)}
          data-action=${ifDefined(action)}
          part="button"
        >
          ${inner}
        </a>
      `
    : html`
        <button
          class="button"
          aria-label=${ifDefined(ariaLabel)}
          aria-labelledby=${ifDefined(resolvedLabelId)}
          ?disabled=${disabled}
          aria-disabled=${ariaDisabled ? "true" : nothing}
          aria-description=${ifDefined(ariaDescription)}
          title=${ifDefined(title)}
          data-variant=${ifDefined(variant)}
          data-action=${ifDefined(action)}
          part="button"
        >
          ${inner}
        </button>
      `;
}
