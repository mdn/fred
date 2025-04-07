import { Task } from "@lit/task";
import { LitElement, html } from "lit";

import "./compat-table.js";
import { BCD_BASE_URL, DEFAULT_LOCALE } from "./constants.js";

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

  _dataTask = new Task(this, {
    args: () => [this.query],
    task: async ([query], { signal }) => {
      const response = await fetch(
        `${BCD_BASE_URL}/bcd/api/v0/current/${query}.json`,
        { signal },
      );
      if (!response.ok) {
        console.error("Failed to fetch BCD data:", response);
        throw new Error(response.statusText);
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
      error: (error) => html`<p>Error loading data: <code>${error}</code></p>`,
    });
  }
}

customElements.define("lazy-compat-table", LazyCompatTable);
