import { Task } from "@lit/task";
import { LitElement, html, nothing } from "lit";

import { L10nMixin } from "../../l10n/mixin.js";

import styles from "./element.css?lit";

export class MDNSearchModal extends L10nMixin(LitElement) {
  static styles = styles;

  static properties = {
    _index: { state: true },
    _query: { state: true },
    _selected: { state: true },
    _shiftFocus: { state: true },
  };

  constructor() {
    super();
    /** @type {import("./types.js").SearchIndex | undefined} */
    this._index = undefined;
    this._query = "";
    this._selected = 0;
    this._shiftFocus = false;
  }

  async _loadIndex() {
    const res = await fetch(`/${this.locale}/search-index.json`);
    /** @type {import("./types.js").SearchIndexItem[]} */
    const items = await res.json();
    /** @type {import("./types.js").SearchIndexFlexItem[]} */
    const flex = items.map(({ title, url }, index) => ({
      index,
      title: title.toLowerCase(),
      slugTail: url.split("/").pop()?.toLowerCase() || "",
    }));
    this._index = {
      flex,
      items,
    };
  }

  _click() {
    this._loadIndex();
    this.shadowRoot?.querySelector("dialog")?.showModal();
  }

  /** @param {InputEvent} event */
  _input({ target }) {
    if (target instanceof HTMLInputElement) {
      this._query = target.value;
    }
  }

  /** @param {KeyboardEvent} event */
  _keydown(event) {
    const results = (this._queryIndex.value?.length || 0) + 1;
    switch (event.key) {
      case "ArrowUp": {
        event.preventDefault();
        const value = (this._selected - 1) % results;
        this._selected = value < 0 ? results + value : value;
        break;
      }
      case "ArrowDown":
        event.preventDefault();
        this._selected = (this._selected + 1) % results;
        break;
      default:
        return;
    }
  }

  /** @param {SubmitEvent} _event */
  _submit(_event) {
    const item = this.shadowRoot?.querySelector("[data-selected] a");
    if (item instanceof HTMLElement) {
      item.click();
    }
  }

  /** @param {FocusEvent} event */
  _focus({ target }) {
    if (target instanceof HTMLElement) {
      const focused = target.closest("[data-result]");
      if (focused instanceof HTMLElement) {
        const index = Number.parseInt(focused.dataset.result || "NaN", 10);
        if (!Number.isNaN(index)) {
          this._selected = index;
          this._shiftFocus = true;
        }
      } else {
        this._shiftFocus = false;
      }
    }
  }

  _queryIndex = new Task(this, {
    args: () => [this._index, this._query],
    task: async ([index, query]) => {
      if (!index || !query) {
        return;
      }
      return quickSearch(query, index);
    },
  });

  render() {
    const siteSearchIndex = this._queryIndex.value?.length || 0;
    return html`
      <button class="mdn-search" title="Search the site" @click=${this._click}>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="6.5"
            cy="6.5"
            r="5.75"
            stroke="#4E4E4E"
            stroke-width="1.5"
          />
          <line
            x1="11.0607"
            y1="11"
            x2="15"
            y2="14.9393"
            stroke="#4E4E4E"
            stroke-width="1.5"
            stroke-linecap="round"
          />
        </svg>
      </button>
      <dialog @keydown=${this._keydown} @focusin=${this._focus}>
        <form @submit=${this._submit}>
          <input type="text" autofocus @input=${this._input} />
        </form>
        <ul>
          ${this._queryIndex.render({
            complete: (results) =>
              results?.map(
                ({ title, url }, i) => html`
                  <li ?data-selected=${this._selected === i} data-result=${i}>
                    <a href=${url}>${title}</a>
                  </li>
                `,
              ),
          })}
          ${this._query
            ? html`<li
                ?data-selected=${this._selected === siteSearchIndex}
                data-result=${siteSearchIndex}
              >
                <a
                  href=${`/${this.locale}/search?${new URLSearchParams({ q: this._query })}`}
                  >Site search for <code>${this._query}</code></a
                >
              </li>`
            : nothing}
        </ul>
      </dialog>
    `;
  }

  updated() {
    if (this._shiftFocus) {
      const selected = this.shadowRoot?.querySelector("[data-selected] a");
      if (selected instanceof HTMLElement) {
        selected.focus();
      }
    }
  }
}

customElements.define("mdn-search-modal", MDNSearchModal);

/**
 * @param {string} input
 * @param {import("./types.js").SearchIndex} index
 * @returns {import("./types.js").SearchResultItem[]}
 */
function quickSearch(input, index) {
  const inputValueLC = input.toLowerCase().trim();
  const q = splitQuery(input);
  const indexResults = index.flex
    .filter(({ title }) => q.every((q) => title.includes(q)))
    .map(({ index, title, slugTail }) => {
      const exact = Number([title, slugTail].includes(inputValueLC));
      return /** @type {const} */ ([exact, index]);
    })
    .sort(([aExact], [bExact]) => bExact - aExact) // Boost exact matches.
    .map(([_, i]) => i)
    .slice(0, 10);

  return indexResults.map((i) => i && (index.items || [])[i]).filter(Boolean);
}

/**
 * Used by quicksearch and sidebar filters.
 * @param {string} term
 * @returns {string[]}
 */
export function splitQuery(term) {
  term = term.trim().toLowerCase();
  return term.startsWith(".") || term.endsWith(".")
    ? // Dot is probably meaningful.
      term.split(/[ ,]+/)
    : // Dot is probably just a word separator.
      term.split(/[ ,.]+/);
}
