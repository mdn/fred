import { html, nothing } from "lit";

import { ifDefined } from "lit/directives/if-defined.js";

/**
 * @param {object} options
 * @param {string|Lit.TemplateResult} [options.label]
 * @param {boolean} [options.disabled]
 * @param {string} [options.extraClasses]
 * @param {(event: MouseEvent) => void} [options.handleClick]
 * @param {import("lit").SVGTemplateResult} [options.icon]
 * @param {"button"|"reset"|"submit"} [options.type]
 */
export function Button({
  handleClick,
  label,
  disabled,
  extraClasses = "",
  icon,
  type = "button",
}) {
  return html`<button
    type=${ifDefined(type)}
    ?disabled=${ifDefined(disabled)}
    class=${`button ${extraClasses}`.trim()}
    @click=${ifDefined(handleClick)}
  >
    ${icon ? html`<span class="icon">${icon}</span>` : nothing} ${label}
  </button>`;
}
