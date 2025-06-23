import { LitElement, html } from "lit";

import styles from "./element.css?lit";
import Button from "./pure.js";

export class MDNButton extends LitElement {
  static styles = styles;

  static properties = {
    disabled: { type: Boolean },
    variant: { type: String },
    action: { type: String },
    icon: { state: true },
    iconOnly: { type: Boolean, attribute: "icon-only" },
    href: { type: String },
    target: { type: String },
  };

  constructor() {
    super();
    this.disabled = false;
    /** @type {import("@lit").TemplateResult | undefined} */
    this.icon = undefined;
    this.iconOnly = false;
    /** @type {import("./types.js").ButtonVariants} */
    this.variant = "primary";
    /** @type {import("./types.js").ButtonActions} */
    this.action = undefined;
    /** @type {string | undefined} */
    this.href = undefined;
    /** @type {string | undefined} */
    this.target = undefined;
  }

  render() {
    return Button({
      label: html`<slot></slot>`,
      disabled: this.disabled,
      icon: this.icon,
      iconOnly: this.iconOnly,
      variant: this.variant,
      action: this.action,
      href: this.href,
      target: this.target,
    });
  }
}

customElements.define("mdn-button", MDNButton);
