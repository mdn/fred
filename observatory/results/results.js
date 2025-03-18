import { LitElement, css, html } from "lit";
import { Task } from "@lit/task";

import "../feedback.js";
import { Rating } from "./rating.js";
import { ComparisonTable } from "./grade_svg.js";
import { Tabs } from "./tabs.js";

import { OBSERVATORY_API_URL } from "../constants.js";

/**
 * @typedef {import("../constants.js").ObservatoryScanResult} ObservatoryScanResult
 * @typedef {import('lit').PropertyDeclarations} PropertyDeclarations
 * @typedef {import('../constants.js').GradeDistribution} GradeDistribution
 */

export class Results extends LitElement {
  static styles = css`
    :host {
      --button-color: blue;
    }
  `;

  /**
   * @type PropertyDeclarations
   */
  static properties = {
    host: { type: String },
    selectedTab: { type: Number },
  };

  _apiTask = new Task(this, {
    task: async ([host], { signal }) => {
      try {
        const res = await fetch(
          `${OBSERVATORY_API_URL}/api/v2/analyze?host=${encodeURIComponent(
            host
          )}`,
          { signal }
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

  constructor() {
    super();
    /** @type { string | null } */
    this.host = null;
    /** @type { number } */
    this.selectedTab = 0;
  }

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

  async _rescan(e) {
    e.preventDefault();
    this._loading = true;
    try {
      const apiUrl = `https://observatory-api.mdn.mozilla.net/api/v2/analyze?host=${encodeURIComponent(
        this.host
      )}`;
      const response = await fetch(apiUrl, { method: "POST" });
      if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText}`);
      }
      this.data = await response.json();
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      this._loading = false;
    }
  }

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
            host: this.host,
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
