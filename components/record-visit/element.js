import { LitElement } from "lit";

import {
  RecentlyVisitedPage,
  RecentlyVisitedPages,
} from "../recently-visited/index.js";

export class MDNRecordVisit extends LitElement {
  static ssr = false;
  static properties = {
    pageTitle: { type: String, attribute: "page-title" },
  };

  constructor() {
    super();
    /** @type {string | undefined} */
    this.pageTitle;
  }

  connectedCallback() {
    super.connectedCallback();
    if (this.pageTitle) {
      const visited = new RecentlyVisitedPages();
      visited.add(
        new RecentlyVisitedPage({
          title: this.pageTitle,
          path: location.pathname,
        }),
      );
    }
  }
}

customElements.define("mdn-record-visit", MDNRecordVisit);
