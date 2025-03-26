import { Task } from "@lit/task";
import { LitElement, css, html } from "lit";

import "../feedback.js";
import { nothing } from "lit";

import { OBSERVATORY_API_URL } from "../constants.js";

import { Rating } from "./rating.js";
import { Tabs } from "./tabs.js";

export class Results extends LitElement {
  static styles = css`
    :host {
      --border-radius: 0.3rem;
      --progress-color: var(--observatory-accent);
    }

    .scan-result {
      background-color: var(--background-primary);
      border-radius: var(--border-radius);
      justify-content: space-between;
      margin-bottom: 3rem;
      max-width: var(--max-width);
      padding: var(--spacing);

      grid-column-gap: var(--spacing);
      column-gap: var(--spacing);
      display: grid;
      grid-template-areas: "grade data actions";
      grid-template-columns: auto 1fr auto;
    }

    .grade-trend {
      grid-area: grade;
      justify-self: start;
    }

    .data {
      grid-area: data;
    }

    .actions {
      grid-area: actions;
    }

    .info-tooltip {
      position: relative;
      border: none;
      background: none;
      cursor: pointer;
      display: inline-block;
    }

    .grade {
      background: var(--grade-bg);
      border: 1px solid var(--grade-border);
      border-radius: 0.2em;
      color: var(--grade-border);
      display: inline-block;
      font-size: 1.7rem;
      font-weight: 600;
      height: 5rem;
      line-height: 5rem;
      text-align: center;
      width: 5rem;
    }

    .grade-a {
      --grade-bg: var(--observatory-grade-a-bg);
      --grade-border: var(--observatory-grade-a-border);
    }

    .grade-b {
      --grade-bg: var(--observatory-grade-b-bg);
      --grade-border: var(--observatory-grade-b-border);
    }

    .grade-c {
      --grade-bg: var(--observatory-grade-c-bg);
      --grade-border: var(--observatory-grade-c-border);
    }

    .grade-d {
      --grade-bg: var(--observatory-grade-d-bg);
      --grade-border: var(--observatory-grade-d-border);
    }

    .grade-f {
      --grade-bg: var(--observatory-grade-f-bg);
      --grade-border: var(--observatory-grade-f-border);
    }

    table {
      background: var(--observatory-table-bg);
      border: none;
      min-width: calc($screen-lg - 2rem - 12rem);

      th {
        background: var(--observatory-table-header-bg);
        color: var(--text-secondary);
        font-weight: 500;
        vertical-align: top;
      }

      tr:nth-child(odd) {
        background-color: var(--observatory-table-bg-alternate);
      }

      td {
        overflow-wrap: anywhere;
        padding: 0.5rem 1.5rem;
        vertical-align: top;

        &.cookie-name:first-child {
          max-width: 15rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        &.score > span {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
        }
      }

      a {
        color: var(--observatory-color);
        text-decoration: underline;
        text-decoration-color: var(--observatory-color-secondary);

        &:hover,
        &:active {
          text-decoration: none;
        }
      }

      span.not-counted {
        color: var(--observatory-color-secondary);

        a {
          text-decoration: none;
        }
      }

      // Some column width hints on the different result table.
      &.tests {
        th,
        td {
          &:first-of-type {
            width: 25%;
          }
        }

        td.score {
          white-space: nowrap;
        }
      }

      &.csp {
        th,
        td {
          &:first-of-type {
            width: 45%;
          }
        }
      }

      &.headers {
        th,
        td {
          &:first-of-type {
            width: 30%;
          }
        }
      }

      &.cookies {
        th,
        td {
          &:nth-of-type(n + 3) {
            text-align: center;
          }
        }
      }

      th,
      td {
        border: none;
        padding: 1.5rem;

        :first-child {
          margin-top: 0;
        }

        :last-child {
          margin-bottom: 0;
        }
      }

      .icon {
        height: 1.3rem;
        width: 1.3rem;
      }

      @media (max-width: #{$screen-sm - 0.02}) {
        td {
          .iso-date {
            code {
              font-size: x-small;
            }
          }
        }
      }

      @media (max-width: #{$screen-lg - 0.02}) {
        // responsive table
        min-width: 0;

        thead {
          display: none;
        }

        tbody {
          display: block;
        }

        tr {
          display: grid;
          grid-template-columns: max-content auto;
        }

        tr:nth-of-type(odd) {
          background: var(--observatory-table-header-bg);
        }

        td {
          column-gap: 2em;
          display: grid;
          grid-auto-flow: column;
          grid-column: span 2;
          grid-template-columns: subgrid;

          .humanized-duration {
            display: none;
          }
        }

        td:before {
          content: attr(data-header);
          display: inline;
          font-weight: 600;
        }

        &.tests,
        &.csp,
        &.headers,
        &.cookies {
          td:first-of-type {
            width: auto;
          }
        }

        td:not(:last-of-type) {
          padding-bottom: 0;
        }

        td:nth-of-type(n + 2) {
          padding-top: 0.75rem;
        }

        &.cookies {
          td:nth-of-type(n + 3) {
            text-align: left;
          }
        }

        td.score {
          display: grid;

          > span {
            display: block;
          }

          .obs-pass-icon {
            display: inline-block;
            height: 1.5em;
            vertical-align: top;
          }
        }
      }
    }
  `;

  constructor() {
    super();
    /** @type { string | undefined } */
    this.host = undefined;
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
    this.host = params.get("host") ?? undefined;
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
