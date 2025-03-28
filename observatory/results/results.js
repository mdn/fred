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

    .visually-hidden {
      border: 0 !important;
      clip: rect(1px, 1px, 1px, 1px) !important;
      -webkit-clip-path: inset(50%) !important;
      clip-path: inset(50%) !important;
      height: 1px !important;
      margin: -1px !important;
      overflow: hidden !important;
      padding: 0 !important;
      position: absolute !important;
      white-space: nowrap !important;
      width: 1px !important;
    }

    .scan-result {
      background-color: var(--background-primary);
      border-radius: var(--border-radius);
      justify-content: space-between;
      margin-bottom: 3rem;
      max-width: var(--max-width);
      padding: var(--spacing);

      column-gap: var(--spacing);
      display: grid;
      grid-template-areas: "grade data actions";
      grid-template-columns: auto 1fr auto;

      @media (max-width: 1199px) {
        align-items: flex-start;
        grid-template-areas: "grade data actions";
        grid-template-columns: auto 1fr auto;
        justify-content: space-between;
        row-gap: calc(var(--spacing) / 2);
      }

      @media (max-width: 991px) {
        grid-template-areas:
          "grade data   "
          ".     actions";
        grid-template-columns: min-content 1fr;
      }
    }

    h2 {
      font-size: 1.375rem;
      font-weight: 600;
      margin-bottom: 1rem;
      margin-top: 1.5rem;
      &::before {
        background-color: var(--observatory-color);
        content: "";
        display: inline-block;
        mask-position: left;
        mask-repeat: no-repeat;
        mask-size: contain;
      }
      .host {
        font-weight: 400;
      }
    }

    h2.summary::before {
      height: 1.4rem;
      mask-image: var(--summary-icon);
      width: 2rem;
    }

    h2.result::before {
      height: 1.2rem;
      mask-image: var(--results-icon);
      width: 2rem;
    }

    code {
      font-weight: 600;
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

    .scan-another {
      font-size: var(--type-smaller-font-size);
      font-weight: 400;
      margin-top: 1.2rem;
      a {
        color: var(--observatory-color-secondary);
      }
    }

    .label {
      font-weight: 600;
    }

    a {
      text-decoration: none;
      color: var(--observatory-color);
      &:hover {
        text-decoration: underline;
        text-decoration-color: var(--observatory-color-secondary);
      }
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

    .tooltip-popup {
      border-width: 0;
      background-color: var(--button-primary-default);
      border-radius: var(--border-radius);
      color: var(--observatory-inverse-color-secondary);
      left: 50%;
      margin-top: 2rem;
      max-width: min(100vw, 20rem);
      padding: 1.5rem;
      position: absolute;
      text-align: center;
      /* top: 100%; */
      /* transform: translateX(var(--tooltip-offset)); */
      /* visibility: hidden; */
      width: max-content;
      z-index: 1;

      table {
        border: 0;
        border-collapse: collapse;
        white-space: nowrap;
        width: 10rem;

        tr {
          color: var(--observatory-inverse-color-secondary);
          font-size: 0.875rem;

          &.current {
            color: var(--observatory-inverse-color);
          }
        }

        th,
        td {
          background-color: unset;
          border: 0;
          font-weight: var(--font-body);
          text-align: left;
          width: 50%;
        }

        th {
          font-size: 1rem;
          padding: 0 0 0.75rem;
        }

        td {
          padding: 0;

          svg {
            vertical-align: -0.3rem;
          }
        }
      }
    }

    .scroll-container {
      margin-bottom: 1.5rem;
      margin-top: 0.8rem;
      overflow-x: auto;
      overscroll-behavior-x: none;
    }

    .footnote {
      font-size: var(--type-smaller-font-size);
      margin-top: 1rem;
    }

    .detail-header {
      display: flex;
      gap: 0.5rem;
      padding: 0 1.5rem 0 0;

      .arrow {
        color: var(--observatory-color-secondary);
      }

      .detail-header-title {
        font-weight: 600;
        padding-right: 0.2rem;
      }

      p {
        margin: 1rem 0;
      }
    }

    .obs-pass-icon {
      svg.pass {
        path {
          fill: var(--observatory-pass-icon-bg);
        }

        circle {
          fill: var(--observatory-pass-icon-color);
        }
      }

      svg.fail {
        path {
          fill: var(--observatory-fail-icon-bg);
        }

        circle {
          fill: var(--observatory-fail-icon-color);
        }
      }
    }

    .footnote {
      font-size: var(--type-smaller-font-size);
      margin-top: 1rem;
    }

    .scan-results table {
      background: var(--observatory-table-bg);
      border: none;
      border-collapse: collapse;
      min-width: calc(992px - 2rem - 12rem);

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

      /* Some column width hints on the different result table. */
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

      @media (max-width: 425.99px) {
        td {
          .iso-date {
            code {
              font-size: x-small;
            }
          }
        }
      }

      @media (max-width: 991.99px) {
        /* responsive table */
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

    ol.tabs-list {
      column-gap: 3rem;
      display: grid;
      grid-template-areas:
        "tab-0 tab-1 tab-2 tab-3 tab-4 tab-5 ."
        "hr    hr    hr    hr    hr    hr    hr "
        "mod   mod   mod   mod   mod   mod   mod";
      grid-template-columns: repeat(6, max-content) 1fr;
      margin: 0;
      overflow-x: auto;
      overscroll-behavior-x: none;
      padding: 0;

      @media (max-width: #{$screen-lg - 0.02}) {
        column-gap: 1.75rem;
        grid-template-columns: repeat(6, max-content) auto;
      }

      &::before {
        border: none;
        border-top: 1px solid var(--observatory-border);
        content: "";
        grid-area: hr;
        margin: 0;
        width: 100%;
      }

      input[type="radio"]:not(:checked) ~ .tab-content {
        display: none;
      }

      li.tabs-list-item {
        display: contents;

        > input:checked + label {
          border-bottom: 2px solid var(--observatory-accent);
          color: var(--text-primary);
        }

        > input:not(:checked) + label:hover {
          border-bottom: 2px solid var(--observatory-accent-light);
          color: var(--text-primary);
        }

        > input:checked:focus-visible + label {
          outline-color: var(--accent-primary);
          outline-offset: 1px;
          outline-style: auto;
        }

        > input:not(:checked) + label {
          color: var(--text-secondary);
          opacity: 0.775;
        }

        > label {
          cursor: pointer;
          height: 2.2rem;
          width: max-content;
        }

        &#tabs-0 {
          > label,
          > input {
            grid-area: tab-0;
          }
        }

        &#tabs-1 {
          > label,
          > input {
            grid-area: tab-1;
          }
        }

        &#tabs-2 {
          > label,
          > input {
            grid-area: tab-2;
          }
        }

        &#tabs-3 {
          > label,
          > input {
            grid-area: tab-3;
          }
        }

        &#tabs-4 {
          > label,
          > input {
            grid-area: tab-4;
          }
        }

        &#tabs-5 {
          > label,
          > input {
            grid-area: tab-5;
          }
        }

        > section.tab-content {
          grid-area: mod;
          left: 0;
          margin: 0;
          position: sticky;

          @media (max-width: #{$screen-lg - 0.02}) {
            width: calc(
              100vw - 12rem - 3rem
            ); /* 12rem: placement width; 3rem: padding */
          }
          @media (max-width: #{$screen-md - 0.02}) {
            width: calc(100vw - 2rem); // 2rem: padding
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
