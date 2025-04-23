/**
 * @file Sidebar filter Lit element.
 */

import { LitElement, html } from "lit";

import cancelIcon from "../icon/cancel.svg?lit";

import { SidebarFilterer } from "./sidebar-filterer.js";

const SIDEBAR_FILTER_FOCUS = "sidebar_filter_focus";
const SIDEBAR_FILTER_TYPED = "sidebar_filter_typed";

/**
 * SidebarFilterElement is a web component that provides a sidebar filtering functionality.
 * It integrates a SidebarFilterer to filter content and includes telemetry tracking via the gleanClick callback.
 * @augments {LitElement}
 */
class SidebarFilter extends LitElement {
  static properties = {
    query: { type: String },
    matchCount: { state: true, type: Number },
    isActive: { state: true, type: Boolean },
    hasTyped: { state: true, type: Boolean },
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
    this.isActive = false;
    /** @type {boolean} */
    this.hasTyped = false;
    /**
     * TODO
     * @type {function(string):void}
     */
    this.gleanClick = () => {};
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

  /**
   * Lifecycle callback called after the component’s DOM has been updated the first time.
   * Initializes references to the quicklinks elements used for scrolling.
   */
  firstUpdated() {
    this._quicklinks = document.querySelector("#sidebar-quicklinks");
    if (this._quicklinks) {
      this._sidebarInnerNav =
        /** @type {HTMLElement|null} */ (
          this._quicklinks.querySelector(".sidebar-inner-nav")
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
      if (
        el instanceof HTMLElement &&
        el.dataset.lastScrollTop === undefined &&
        el.scrollTop > 0
      ) {
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
    if (changedProperties.has("isActive")) {
      if (this.isActive) {
        // When the input becomes active, send telemetry for focus.
        if (typeof this.gleanClick === "function") {
          this.gleanClick(SIDEBAR_FILTER_FOCUS);
        }
      } else {
        // When deactivated, reset the typed state.
        this.hasTyped = false;
      }
    }
    if (changedProperties.has("query")) {
      // Mark that the user has typed if the query is non-empty.
      if (this.query && this.query.trim().length > 0 && !this.hasTyped) {
        this.hasTyped = true;
      }

      if (this._quicklinks) {
        // Initialize the filterer if it has not yet been created.
        if (!this._filterer) {
          const root = this._quicklinks.querySelector(".sidebar-body");
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
    if (
      changedProperties.has("hasTyped") &&
      this.hasTyped && // When the user has typed, send telemetry for typing.
      typeof this.gleanClick === "function"
    ) {
      this.gleanClick(SIDEBAR_FILTER_TYPED);
    }
  }

  /**
   * Event handler for when the input field receives focus.
   * @private
   */
  _onFocus() {
    this.isActive = true;
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
    this.isActive = false;
  }

  /**
   * Renders the component template.
   * @returns {import('lit').TemplateResult}
   */
  render() {
    return html`
      <section class="sidebar-filter-container">
        <div class="sidebar-filter ${this.query ? "has-input" : ""}">
          <label
            id="sidebar-filter-label"
            class="sidebar-filter-label"
            for="sidebar-filter-input"
          >
            <span class="icon icon-filter"></span>
            <span class="visually-hidden">Filter sidebar</span>
          </label>
          <input
            id="sidebar-filter-input"
            autocomplete="off"
            class="sidebar-filter-input-field ${this.isActive
              ? "is-active"
              : ""}"
            type="text"
            placeholder="Filter"
            .value=${this.query}
            @focus=${this._onFocus}
            @input=${this._onInput}
          />
          ${this.matchCount === undefined
            ? ""
            : html`
                <span class="sidebar-filter-count">
                  ${this.matchCount === 0
                    ? "No matches"
                    : `${this.matchCount} ${
                        this.matchCount === 1 ? "match" : "matches"
                      }`}
                </span>
              `}
          <mdn-button
            class="clear-sidebar-filter-button"
            .icon=${cancelIcon}
            @click=${this._clearFilter}
          >
            <span class="visually-hidden">Clear filter input</span>
          </mdn-button>
        </div>
      </section>
    `;
  }
}

customElements.define("sidebar-filter", SidebarFilter);
