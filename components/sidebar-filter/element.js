/**
 * @file Sidebar filter Lit element.
 */

import { LitElement, html } from "lit";

import { L10nMixin } from "../../l10n/mixin.js";
import cancelIcon from "../icon/cancel.svg?lit";
import filterIcon from "../icon/filter.svg?lit";

import styles from "./element.css?lit";
import { SidebarFilterer } from "./sidebar-filterer.js";

class MDNSidebarFilter extends L10nMixin(LitElement) {
  static styles = styles;

  static properties = {
    query: { type: String },
    matchCount: { state: true, type: Number },
    _active: { state: true, type: Boolean },
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
    this._active = false;
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
          this._quicklinks.querySelector(".left-sidebar--content")
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
      }

      if (this._quicklinks) {
        // Initialize the filterer if it has not yet been created.
        if (!this._filterer) {
          const root = this._quicklinks.querySelector(".left-sidebar--content");
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
   * Event handler for when the input field receives focus.
   * @private
   */
  _onFocus() {
    this._active = true;
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
    this._active = false;
  }

  /**
   * Renders the component template.
   * @returns {import("types/lit.js").TemplateResult}
   */
  render() {
    return html`
      <div class="sidebar-filter ${this.query ? "has-input" : ""}">
        <label
          id="sidebar-filter-label"
          class="sidebar-filter-label"
          for="sidebar-filter-input"
        >
          <span class="icon">${filterIcon}</span>
          <span class="visually-hidden">${this.l10n`Filter sidebar`}</span>
        </label>
        <input
          id="sidebar-filter-input"
          autocomplete="off"
          class="sidebar-filter-input-field ${this._active ? "is-active" : ""}"
          type="text"
          placeholder=${this.l10n`Filter`}
          .value=${this.query}
          @focus=${this._onFocus}
          @input=${this._onInput}
        />
        ${this.matchCount === undefined
          ? ""
          : html`
              <span class="sidebar-filter-count">
                ${this.l10n.raw({
                  id: "sidebar-filter-matches",
                  args: {
                    matches: this.matchCount,
                  },
                })}
              </span>
            `}
        <mdn-button
          class="clear-sidebar-filter-button"
          .icon=${cancelIcon}
          @click=${this._clearFilter}
        >
          <span class="visually-hidden">${this.l10n`Clear filter input`}</span>
        </mdn-button>
      </div>
    `;
  }
}

customElements.define("mdn-sidebar-filter", MDNSidebarFilter);
