import { Task } from "@lit/task";
import { LitElement, html } from "lit";

import "./compat-table.js";
import {
  BCD_BASE_URL,
  DEFAULT_LOCALE,
  ISSUE_METADATA_TEMPLATE,
} from "./constants.js";

/**
 * @typedef {{data: BCD.Identifier, browsers: BCD.Browsers}} Compat
 */

export class LazyCompatTable extends LitElement {
  static properties = {
    query: {},
    locale: {},
  };

  constructor() {
    super();
    this.query = "";
    this.locale = DEFAULT_LOCALE;
  }

  connectedCallback() {
    super.connectedCallback();
  }

  get _issueUrl() {
    const url = "https://github.com/mdn/browser-compat-data/issues/new";
    const sp = new URLSearchParams();
    const metadata = ISSUE_METADATA_TEMPLATE.replaceAll(
      "$DATE",
      new Date().toISOString(),
    )
      .replaceAll("$QUERY_ID", this.query)
      .trim();
    sp.set(
      "mdn-url",
      `https://developer.mozilla.org${globalThis.location.pathname}`,
    );
    sp.set("metadata", metadata);
    sp.set("title", `${this.query} - Missing compatibility data`);
    sp.set("template", "data-problem.yml");

    return `${url}?${sp.toString()}`;
  }

  get _issueLink() {
    const onClick = (/** @type {MouseEvent} */ event) => {
      event.preventDefault();
      window.open(this._issueUrl, "_blank", "noopener,noreferrer");
    };

    return html`<a
      class="bc-github-link external external-icon"
      href="#"
      @click=${onClick}
      target="_blank"
      rel="noopener noreferrer"
      title="Report missing compatibility data"
      >Report this issue</a
    >`;
  }

  _dataTask = new Task(this, {
    args: () => [this.query],
    task: async ([query], { signal }) => {
      const response = await fetch(
        `${BCD_BASE_URL}/bcd/api/v0/current/${query}.json`,
        { signal },
      );
      if (!response.ok) {
        console.error("Failed to fetch BCD data:", response);

        if (response.status === 404) {
          throw html`No compatibility data found for <code>${query}</code>.
            (${this._issueLink})`;
        }

        throw html`Got HTTP ${response.status} when fetching browser
          compatibility data for <code>${query}</code>`;
      }
      return /** @type {Promise<Compat>} */ response.json();
    },
  });

  render() {
    return this._dataTask.render({
      pending: () => html`<p>Loading...</p>`,

      complete:
        /**
         * @param {Compat} compat
         */
        (compat) =>
          compat
            ? html`<compat-table
                query=${this.query}
                locale=${this.locale}
                .data=${compat.data}
                .browserInfo=${compat.browsers}
              ></compat-table>`
            : html`<p>No compatibility data found</p>`,
      error: (error) => html`<p>${error}</p>`,
    });
  }
}

customElements.define("lazy-compat-table", LazyCompatTable);
