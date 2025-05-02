import { LitElement, html } from "lit";

import styles from "./element.css?lit";

/**
 * @typedef {"first" | "prev" | "active" | "next" | "last"} Position
 * @import { MDNIXTab } from "../ix-tab/element.js";
 */

export class MDNIXTabWrapper extends LitElement {
  static styles = styles;

  /** @param {Position} position */
  _getTab(position) {
    const tabs = [...this.querySelectorAll("mdn-ix-tab")];
    if (position === "first") {
      return tabs[0];
    }
    if (position === "last") {
      return tabs.at(-1);
    }
    const active = tabs.findIndex((tab) => tab.isActive);
    if (position === "active") {
      return tabs[active];
    }
    if (position === "prev") {
      return tabs.at((active - 1) % tabs.length);
    }
    if (position === "next") {
      return tabs.at((active + 1) % tabs.length);
    }
    return;
  }

  /**@param {MDNIXTab | undefined} tab */
  _setTabActive(tab, focus = false) {
    if (!tab) {
      return;
    }
    this._getTab("active")?.unsetActive();
    tab.setActive();
    if (focus) {
      tab.focus();
    }
  }

  /** @param {MouseEvent} event */
  _tablistClick({ target }) {
    if (target instanceof HTMLElement) {
      const tab = target.closest("mdn-ix-tab") || undefined;
      this._setTabActive(tab);
    }
  }

  /** @param {KeyboardEvent} event */
  _tablistKeyDown(event) {
    /** @type {Position | undefined} */
    let position;
    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        position = "next";
        break;
      case "ArrowLeft":
      case "ArrowUp":
        position = "prev";
        break;
      case "Home":
        position = "first";
        break;
      case "End":
        position = "last";
        break;
      default:
        return;
    }
    event.preventDefault();
    this._setTabActive(this._getTab(position), true);
  }

  render() {
    return html`
      <div id="tablist" role="tablist">
        <slot
          name="tablist"
          @click=${this._tablistClick}
          @keydown=${this._tablistKeyDown}
        ></slot>
      </div>
      <slot name="active-panel"></slot>
    `;
  }

  firstUpdated() {
    this.querySelector("mdn-ix-tab")?.setActive();
  }
}

customElements.define("mdn-ix-tab-wrapper", MDNIXTabWrapper);
