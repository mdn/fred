import { LitElement, css, html } from "lit";
import { Task } from "@lit/task";

import "../feedback.js";
import { Rating } from "./rating.js";
import { Tabs } from "./tabs.js";

import { OBSERVATORY_API_URL } from "../constants.js";

/**
 * @import { PropertyDeclarations } from "lit"
 */

export class Results extends LitElement {
  static styles = css`
    :host {
      --button-color: blue;
    }
  `;

  constructor() {
    super();
    /** @type { string | null } */
    this.host = null;
    /** @type { number } */
    this.selectedTab = 0;
    /** @type { boolean } */
    this._usePostInApi = false;
  }

  /**
   * @type PropertyDeclarations
   */
  static properties = {
    host: { type: String },
    selectedTab: { type: Number },
    _usePostInApi: { type: Boolean },
  };

  _apiTask = new Task(this, {
    task: async ([host], { signal }) => {
      if (!host) {
        throw new Error("No host provided");
      }
      try {
        const res = await fetch(
          `${OBSERVATORY_API_URL}/api/v2/analyze?host=${encodeURIComponent(
            host
          )}`,
          { signal, method: this._usePostInApi ? "POST" : "GET" }
        );
        if (!res.ok) {
          let message = `${res.status}: ${res.statusText}`;
          try {
            const data = await res.json();
            if (data.error) {
              message = data.message;
            }
          } finally {
            throw new Error(message);
          }
        }
        return await res.json();
      } catch (e) {
        throw new Error("Observatory API request for scan data failed");
      }
    },
    args: () => [this.host],
  });

  connectedCallback() {
    super.connectedCallback();
    this.selectedTab = this._getSelectedTab();
    window.addEventListener("hashchange", this._updateSelectedTab);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener("hashchange", this._updateSelectedTab);
  }

  firstUpdated() {
    const params = new URLSearchParams(window.location.search);
    this.host = params.get("host");
  }

  _updateSelectedTab() {
    this.selectedTab = this._getSelectedTab();
  }

  /**
   * @returns {number}
   */
  _getSelectedTab() {
    const hash = window.location.hash.replace("#", "");
    const tabs = [
      "scoring",
      "csp",
      "cookies",
      "headers",
      "history",
      "benchmark",
    ];
    const index = tabs.indexOf(hash);
    return index === -1 ? 0 : index;
  }

  /**
   *
   * @param {Event} e
   */
  async _rescan(e) {
    e.preventDefault();
    if (!this.host) {
      return;
    }
    this._usePostInApi = true;
    this._apiTask.run();
  }

  /**
   *
   * @param {number} index
   * @param {string} key
   */
  _handleTabSelect(index, key) {
    this.selectedTab = index;
    window.history.replaceState(
      "",
      "",
      window.location.pathname + window.location.search + "#" + key
    );
  }

  render() {
    if (!this.host) {
      return html``;
    }
    return this._apiTask.render({
      pending: () => html`<progress></progress>`,

      complete: (data) => html`
        <section class="summary">
          ${Rating({
            result: data,
            host: this.host || "",
            rescan: this._rescan,
          })}
        </section>
        <section class="results">
          ${Tabs({
            result: data,
            selectedTab: this.selectedTab,
            onTabSelect: (index, key) => this._handleTabSelect(index, key),
          })}
        </section>
      </div>`,

      error: (e) => html`<div class="error">${e}</div>`,
    });
  }
}

customElements.define("mdn-observatory-results", Results);
