import { LitElement, html } from "lit";

import sidebarIcon from "../icon/sidebar.svg?lit";

import styles from "./element.css?lit";

const MAIN_SIDEBAR_ID = "main-sidebar";

export class MDNToggleSidebar extends LitElement {
  static styles = styles;

  get _sidebar() {
    const sidebar = document.querySelector(`#${MAIN_SIDEBAR_ID}`);
    if (sidebar instanceof HTMLElement) {
      return sidebar;
    }
    return null;
  }

  _click() {
    const sidebar = this._sidebar;
    if (sidebar) {
      const display = getComputedStyle(sidebar).display;
      if (display === "none") {
        sidebar.style.display = "block";
      } else {
        sidebar.style.removeProperty("display");
      }
    }
  }

  /** @param {MediaQueryListEvent} _event */
  _mediaChange(_event) {
    this._sidebar?.style.removeProperty("display");
  }

  connectedCallback() {
    super.connectedCallback();
    this._matchMedia = matchMedia("(width < 769px)");
    this._mediaChange = this._mediaChange.bind(this);
    this._matchMedia.addEventListener("change", this._mediaChange);
  }

  render() {
    return html`<mdn-button
      @click=${this._click}
      aria-controls=${MAIN_SIDEBAR_ID}
      .icon=${sidebarIcon}
      icon-only
      variant="invisible"
    >
      Toggle sidebar
    </mdn-button>`;
  }
}

customElements.define("mdn-toggle-sidebar", MDNToggleSidebar);
