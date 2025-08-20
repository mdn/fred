import { LitElement, html } from "lit";

import styles from "./element.css?lit";

export class MDNSwitch extends LitElement {
  static styles = styles;

  static properties = {
    label: { type: String },
    checked: { type: Boolean, reflect: true },
    disabled: { type: Boolean },
  };

  constructor() {
    super();
    this.label = "";
    this.checked = false;
    this.disabled = false;
  }

  _toggle() {
    this.dispatchEvent(new Event("toggle", { bubbles: true, composed: true }));
  }

  render() {
    return html` <label class="switch">
      <input
        class="switch__input"
        type="checkbox"
        ?checked=${this.checked}
        ?disabled=${this.disabled}
        @change=${this._toggle}
      />
      <slot></slot>
    </label>`;
  }
}

customElements.define("mdn-switch", MDNSwitch);
