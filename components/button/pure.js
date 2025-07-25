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
 * @param {string} [options.rel]
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
  rel,
  variant = "primary",
  action,
}) {
  const labelId = `label-${randomString()}`;
  const iconElement = icon
    ? html`<span class="icon" part="icon">${icon}</span>`
    : nothing;
  const labelElement = html`
    <span id=${labelId} class="label" ?hidden=${iconOnly} part="label"
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
          aria-labelledby=${labelId}
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
          aria-labelledby=${labelId}
          ?disabled=${disabled}
          data-variant=${ifDefined(variant)}
          data-action=${ifDefined(action)}
          part="button"
        >
          ${inner}
        </button>
      `;
}

const charSet =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
function randomString() {
  return Array.from(
    { length: 6 },
    () => charSet[Math.floor(Math.random() * charSet.length)],
  ).join("");
}
