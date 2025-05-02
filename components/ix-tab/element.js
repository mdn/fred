import { LitElement, html } from "lit";

import { MDNIXTabPanel } from "../ix-tab-panel/element.js";

import styles from "./element.css?lit";

export class MDNIXTab extends LitElement {
  static styles = styles;

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("slot", "tablist");
    this.setAttribute("role", "tab");
    this.unsetActive();
    const panel = this.nextElementSibling;
    if (panel instanceof MDNIXTabPanel) {
      this.panel = panel;
      if (panel.id) {
        this.setAttribute("aria-controls", panel.id);
      }
      if (this.id) {
        panel.setAttribute("aria-labelledby", this.id);
      }
    }
  }

  setActive() {
    this.setAttribute("tabindex", "0");
    this.setAttribute("aria-selected", "true");
    this.panel?.setActive();
  }

  unsetActive() {
    this.setAttribute("tabindex", "-1");
    this.setAttribute("aria-selected", "false");
    this.panel?.unsetActive();
  }

  get isActive() {
    return this.getAttribute("aria-selected") === "true";
  }

  render() {
    return html`<slot></slot>`;
  }
}

customElements.define("mdn-ix-tab", MDNIXTab);
