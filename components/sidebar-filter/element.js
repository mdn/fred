/**
 * @file Sidebar filter Lit element.
 */

import { LitElement, html } from "lit";

import { L10nMixin } from "../../l10n/mixin.js";
import { gleanClick } from "../../utils/glean.js";
import cancelIcon from "../icon/cancel.svg?lit";

import styles from "./element.css?lit";
import { SidebarFilterer } from "./sidebar-filterer.js";

class MDNSidebarFilter extends L10nMixin(LitElement) {
  static styles = styles;

  static properties = {
    query: { type: String },
    matchCount: { state: true, type: Number },
  };

  /**
   * Creates an instance of SidebarFilterElement.
   */
  constructor() {
    super();
    /** @type {string} */
    this.query = "";
    /** @type {number|undefined} */
    this.matchCount = undefined;
    /** @type {boolean} */
    this.hasTyped = false;
    /**
     * @type {SidebarFilterer|null}
     */
    this._filterer = null;
    /**
     * @type {HTMLElement|null}
     */
    this._quicklinks = null;
    /**
     * @type {HTMLElement|null}
     */
    this._sidebarInnerNav = null;
  }

  firstUpdated() {
    this._quicklinks = document.querySelector(".left-sidebar");
    if (this._quicklinks) {
      this._sidebarInnerNav =
        /** @type {HTMLElement|null} */ (
          this._quicklinks.querySelector(".left-sidebar__content")
        ) || null;
    }
  }

  /**
   * Saves the current scroll position from the specified elements and resets them.
   * @private
   */
  _saveScrollPosition() {
    const refs = [this._quicklinks, this._sidebarInnerNav];
    for (const el of refs) {
      if (el && el.dataset.lastScrollTop === undefined && el.scrollTop > 0) {
        el.dataset.lastScrollTop = String(el.scrollTop);
        el.scrollTop = 0;
      }
    }
  }

  /**
   * Restores the scroll position of the previously saved elements.
   * @private
   */
  _restoreScrollPosition() {
    const refs = [this._quicklinks, this._sidebarInnerNav];
    for (const el of refs) {
      if (el && typeof el.dataset.lastScrollTop === "string") {
        el.scrollTop = Number(el.dataset.lastScrollTop);
        delete el.dataset.lastScrollTop;
      }
    }
  }

  /**
   * Lit lifecycle method called after properties are updated.
   * Triggers telemetry events and applies filtering logic when properties change.
   * @param {Map<string, any>} changedProperties
   */
  updated(changedProperties) {
    if (changedProperties.has("query")) {
      // Mark that the user has typed if the query is non-empty.
      if (this.query && this.query.trim().length > 0 && !this.hasTyped) {
        this.hasTyped = true;
        gleanClick("sidebar_filter_typed");
      }

      if (this._quicklinks) {
        // Initialize the filterer if it has not yet been created.
        if (!this._filterer) {
          const root = this._quicklinks.querySelector(".left-sidebar__content");
          if (root instanceof HTMLElement) {
            this._filterer = new SidebarFilterer(root);
          }
        }
        const trimmedQuery = this.query.trim();
        if (trimmedQuery) {
          this._saveScrollPosition();
        }
        if (this._filterer) {
          const count = this._filterer.applyFilter(trimmedQuery);
          this.matchCount = count;
        }
        if (!trimmedQuery) {
          this._restoreScrollPosition();
        }
      }
    }
  }

  /**
   * Event handler for focus events on the text field.
   * @private
   */
  _onFocus() {
    gleanClick("sidebar_filter_focus");
  }

  /**
   * Event handler for input events on the text field.
   * @param {Event} event The input event.
   * @private
   */
  _onInput(event) {
    const target = /** @type {HTMLInputElement} */ (event.target);
    this.query = target.value;
  }

  /**
   * Clears the filter input and resets the active state.
   * @private
   */
  _clearFilter() {
    this.query = "";
  }

  /**
   * Renders the component template.
   * @returns {import("@lit").TemplateResult}
   */
  render() {
    return html`
      <label class="icon" for="input">
        <span class="visually-hidden">${this.l10n`Filter sidebar`}</span>
      </label>
      <input
        id="input"
        autocomplete="off"
        class="input"
        type="text"
        placeholder=${this.l10n`Filter`}
        .value=${this.query}
        @focus=${this._onFocus}
        @input=${this._onInput}
      />
      ${this.matchCount === undefined
        ? ""
        : html` <span class="counter"> ${this.matchCount} </span> `}
      <mdn-button
        class="button"
        variant="plain"
        label=${this.l10n`Clear filter input`}
        .icon=${cancelIcon}
        icon-only
        @click=${this._clearFilter}
      ></mdn-button>
    `;
  }
}

customElements.define("mdn-sidebar-filter", MDNSidebarFilter);
