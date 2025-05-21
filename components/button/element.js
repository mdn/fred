import { LitElement, html } from "lit";

import styles from "./element.css?lit";
import Button from "./pure.js";

export class MDNButton extends LitElement {
  static styles = styles;

  static properties = {
    disabled: { type: Boolean },
    variant: { type: String },
    icon: { state: true },
    iconOnly: { type: Boolean, attribute: "icon-only" },
    href: { type: String },
  };

  constructor() {
    super();
    this.disabled = false;
    /** @type {import("types/lit.js").TemplateResult | undefined} */
    this.icon = undefined;
    this.iconOnly = false;
    /** @type {import("./types.js").ButtonVariants} */
    this.variant = "primary";
    /** @type {string | undefined} */
    this.href = undefined;
  }

  render() {
    return Button({
      label: html`<slot></slot>`,
      disabled: this.disabled,
      icon: this.icon,
      iconOnly: this.iconOnly,
      variant: this.variant,
      href: this.href,
    });
  }
}

customElements.define("mdn-button", MDNButton);
