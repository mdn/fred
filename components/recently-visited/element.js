import { LitElement, html } from "lit";

import { L10nMixin } from "../../l10n/mixin.js";

import styles from "./element.css?lit";

import { RecentlyVisitedPages } from "./index.js";

export class MDNRecentlyVisited extends L10nMixin(LitElement) {
  static ssr = false;
  static styles = styles;

  constructor() {
    super();
    this._pages = new RecentlyVisitedPages();
  }

  render() {
    return html`<h2>${this.l10n`Recently visited`}</h2>
      <ul>
        ${this._pages.map(
          ({ path, title }) => html`<li><a href=${path}>${title}</a></li>`,
        )}
      </ul>`;
  }
}

customElements.define("mdn-recently-visited", MDNRecentlyVisited);
