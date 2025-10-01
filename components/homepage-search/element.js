import { LitElement, html } from "lit";

import { L10nMixin } from "../../l10n/mixin.js";
import { MDNSearchModal } from "../search-modal/element.js";

import styles from "./element.css?lit";

export class MDNHomepageSearch extends L10nMixin(LitElement) {
  static styles = styles;

  _showModal() {
    const search = document.querySelector("#search");
    if (search instanceof MDNSearchModal) {
      search.showModal();
    } else {
      console.error("MDNSearchModal not found!");
    }
  }

  render() {
    return html`<button
      class="mdn-homepage-search"
      title=${this.l10n`Search the site`}
      @click=${this._showModal}
      data-glean-id="quick-search-open: homepage"
    >
      ${this.l10n`Search`}
    </button>`;
  }
}
customElements.define("mdn-homepage-search", MDNHomepageSearch);
