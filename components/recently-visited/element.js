import { LitElement, html } from "lit";

import styles from "./element.css?lit";

import { RecentlyVisitedPages } from "./index.js";

export class MDNRecentlyVisited extends LitElement {
  static ssr = false;
  static styles = styles;

  constructor() {
    super();
    this._pages = new RecentlyVisitedPages();
  }

  render() {
    return html`<h2>Recently visited</h2>
      <ul>
        ${this._pages.map(
          ({ path, title }) => html`<li><a href=${path}>${title}</a></li>`,
        )}
      </ul>`;
  }
}

customElements.define("mdn-recently-visited", MDNRecentlyVisited);
