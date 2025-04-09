import { LitElement, html } from "lit";

import { Button } from "./pure.js";
import styles from "./shadow.css?lit";

export class MDNButton extends LitElement {
  static styles = styles;

  static properties = {
    disabled: { type: Boolean },
    icon: { state: true },
  };

  constructor() {
    super();
    this.disabled = false;
    /** @type {Lit.TemplateResult | undefined} */
    this.icon = undefined;
  }

  render() {
    return Button({
      label: html`<slot></slot>`,
      disabled: this.disabled,
      icon: this.icon,
    });
  }
}

customElements.define("mdn-button", MDNButton);
