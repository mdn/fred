import { Task } from "@lit/task";
import { LitElement, html } from "lit";

import "../feedback.js";
import { nothing } from "lit";

import { OBSERVATORY_API_URL } from "../constants.js";

import { Rating } from "./rating.js";
import styles from "./results.css?lit";
import { Tabs } from "./tabs.js";

export class Results extends LitElement {
  static styles = styles;

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
   * @type { Lit.PropertyDeclarations }
   */
  static properties = {
    host: { type: String },
    selectedTab: { state: true, type: Number },
    _usePostInApi: { state: true, type: Boolean },
  };

  _apiTask = new Task(this, {
    args: () => [this.host],
    task: async ([host], { signal }) => {
      if (!host) {
        throw new Error("No host provided");
      }
      try {
        const res = await fetch(
          `${OBSERVATORY_API_URL}/api/v2/analyze?host=${encodeURIComponent(
            host,
          )}`,
          { signal, method: this._usePostInApi ? "POST" : "GET" },
        );
        if (!res.ok) {
          let message = `${res.status}: ${res.statusText}`;
          try {
            const data = await res.json();
            if (data.error) {
              message = data.message;
            }
          } catch {
            // Ignore.
          }
          throw new Error(message);
        }
        return await res.json();
      } catch (error) {
        throw new Error("Observatory API request for scan data failed", {
          cause: error,
        });
      }
    },
  });

  connectedCallback() {
    super.connectedCallback();
    this._updateSelectedTab = this._updateSelectedTab.bind(this);
    this.selectedTab = this._getSelectedTab();
    globalThis.addEventListener("hashchange", this._updateSelectedTab);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    globalThis.removeEventListener("hashchange", this._updateSelectedTab);
  }

  firstUpdated() {
    const params = new URLSearchParams(globalThis.location.search);
    this.host = params.get("host");
  }

  _updateSelectedTab() {
    this.selectedTab = this._getSelectedTab();
  }

  /**
   * @returns {number}
   */
  _getSelectedTab() {
    const hash = globalThis.location.hash.replace("#", "");
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
    globalThis.history.replaceState(
      "",
      "",
      globalThis.location.pathname + globalThis.location.search + "#" + key,
    );
  }

  render() {
    if (!this.host) {
      return nothing;
    }
    return this._apiTask.render({
      pending: () =>
        html` <label class="visually-hidden" for="progress-bar">
            Rescanning ${this.host} </label
          ><mdn-progress-bar id="progress-bar"></mdn-progress-bar>`,

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
