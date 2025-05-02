import { LitElement, html } from "lit";

import styles from "./element.css?lit";
import Button from "./pure.js";

export class MDNButton extends LitElement {
  static styles = styles;

  static properties = {
    disabled: { type: Boolean },
    variant: { type: String },
    icon: { state: true },
  };

  constructor() {
    super();
    this.disabled = false;
    /** @type {Lit.TemplateResult | undefined} */
    this.icon = undefined;
    /** @type {import("./types.js").ButtonVariants} */
    this.variant = "primary";
  }

  render() {
    return Button({
      label: html`<slot></slot>`,
      disabled: this.disabled,
      icon: this.icon,
      variant: this.variant,
    });
  }
}

customElements.define("mdn-button", MDNButton);
