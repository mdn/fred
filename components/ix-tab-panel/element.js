import { LitElement, html } from "lit";

import styles from "./element.css?lit";

export class MDNIXTabPanel extends LitElement {
  static styles = styles;

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("tabindex", "0");
    this.setAttribute("role", "tabpanel");
  }

  setActive() {
    this.setAttribute("slot", "active-panel");
  }

  unsetActive() {
    this.removeAttribute("slot");
  }

  render() {
    return html`<slot></slot>`;
  }
}

customElements.define("mdn-ix-tab-panel", MDNIXTabPanel);
