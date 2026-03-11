import { LitElement, html } from "lit";

import { L10nMixin } from "../../l10n/mixin.js";
import searchIcon from "../icon/search.svg?lit";
import { MDNSearchModal } from "../search-modal/element.js";

import styles from "./element.css?lit";

export class MDNSearchButton extends L10nMixin(LitElement) {
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
      class="mdn-search-button"
      title=${this.l10n`Search the site`}
      @click=${this._showModal}
      data-glean-id="quick-search-open: menu"
    >
      ${searchIcon}
    </button>`;
  }
}

customElements.define("mdn-search-button", MDNSearchButton);
