import { Task } from "@lit/task";
import { LitElement, html, nothing } from "lit";

import { L10nMixin } from "../../l10n/mixin.js";

import { gleanClick } from "../../utils/glean.js";
import { mdnUrl2Breadcrumb } from "../../utils/mdn-url2breadcrumb.js";

import exitIcon from "../icon/cancel.svg?lit";

import styles from "./element.css?lit";

export class MDNSearchModal extends L10nMixin(LitElement) {
  static ssr = false;
  static styles = styles;

  static properties = {
    _index: { state: true },
    _query: { state: true },
    _selected: { state: true },
    _shiftFocus: { state: true },
  };

  constructor() {
    super();
    /** @type {Promise<import("./types.js").SearchIndex> | undefined} */
    this._index = undefined;
    this._query = "";
    this._selected = 0;
    this._shiftFocus = false;
    /** Capture whether user has engaged with the search. */
    this._hasEngaged = false;
  }

  async _loadIndex() {
    if (this._index) {
      return;
    }

    this._index = this._fetchIndex();
  }

  async _fetchIndex() {
    const res = await fetch(`/${this.locale}/search-index.json`);
    /** @type {import("./types.js").SearchIndexItem[]} */
    const items = await res.json();
    /** @type {import("./types.js").SearchIndexFlexItem[]} */
    const flex = items.map(({ title, url }, index) => ({
      index,
      title: title.toLowerCase(),
      slugTail: url.split("/").pop()?.toLowerCase() || "",
    }));

    return {
      flex,
      items,
    };
  }

  showModal() {
    this._loadIndex();
    this.shadowRoot?.querySelector("dialog")?.showModal();
    this.shadowRoot?.querySelector("input")?.select();
  }

  /** @param {InputEvent} event */
  _input({ inputType, target }) {
    if (target instanceof HTMLInputElement) {
      this._query = target.value;
      if (!this._hasEngaged && inputType.startsWith("insert")) {
        this._hasEngaged = true;
        gleanClick(
          `quick-search-change: ${inputType === "insertFromPaste" ? "paste" : "type"}`,
        );
      }
    }
  }

  /** @param {KeyboardEvent} event */
  _keydown(event) {
    switch (event.key) {
      case "ArrowUp": {
        event.preventDefault();
        this._select(this._selected - 1);
        break;
      }
      case "ArrowDown":
        event.preventDefault();
        this._select(this._selected + 1);
        break;

      case "Enter": {
        const { ctrlKey, shiftKey, altKey, metaKey } = event;
        const item = this._getSelectedItem();
        if (item instanceof HTMLElement) {
          event.preventDefault();
          item.dispatchEvent(
            new MouseEvent("click", {
              bubbles: true,
              composed: true,
              // we attempt to pass modifier keys through
              // but browser support is incredibly varied:
              ctrlKey,
              shiftKey,
              altKey,
              metaKey,
            }),
          );
        }
        break;
      }

      default:
        return;
    }
  }

  /** @returns {HTMLElement|null} */
  _getSelectedItem() {
    return this.shadowRoot?.querySelector("[data-selected] a") ?? null;
  }

  /** @param {number} index */
  _select(index) {
    const results = (this._queryIndex.value?.length || 0) + 1;
    const value = index % results;
    this._selected = value < 0 ? results + index : value;
    setTimeout(() => {
      const item = this._getSelectedItem();
      if (item instanceof HTMLElement) {
        item.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }
    }, 0);
  }

  /** @param {SubmitEvent} event */
  _submit(event) {
    event.preventDefault();
    const item = this._getSelectedItem();
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

  /** @param {KeyboardEvent} event */
  _globalKeydown(event) {
    const target = event.composedPath()?.[0] || event.target;
    const isTextField =
      target instanceof HTMLElement &&
      (["TEXTAREA", "INPUT"].includes(target.tagName) ||
        target.isContentEditable);

    if (isTextField) {
      return;
    }

    const selection = globalThis.getSelection()?.toString();
    const keyPressed = event.key;
    const ctrlOrMetaPressed = event.ctrlKey || event.metaKey;
    const isSlash = keyPressed === "/" && !ctrlOrMetaPressed;
    const isCtrlK = keyPressed === "k" && ctrlOrMetaPressed && !event.shiftKey;

    if (isSlash || isCtrlK) {
      event.preventDefault();
      gleanClick(
        `quick-search-open: keyboard -> ${isSlash ? "slash" : "ctrl-k"}`,
      );
      this.showModal();
      if (selection) {
        this._query = selection;
      }
    }
  }

  _queryIndex = new Task(this, {
    args: () => [this._index, this._query],
    task: async ([index, query]) => {
      if (!index || !query) {
        return;
      }
      return quickSearch(query, await index);
    },
  });

  _close() {
    this.shadowRoot?.querySelector("dialog")?.close();
  }

  connectedCallback() {
    super.connectedCallback();
    this._globalKeydown = this._globalKeydown.bind(this);
    document.addEventListener("keydown", this._globalKeydown);
    this._loadIndex = this._loadIndex.bind(this);
    this.renderRoot.addEventListener("mouseover", this._loadIndex);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.renderRoot.removeEventListener("mouseover", this._loadIndex);
    document.removeEventListener("keydown", this._globalKeydown);
  }

  _renderLoadingSearchIndex() {
    return html`<progress
      aria-label=${this.l10n`Loading search index…`}
    ></progress>`;
  }

  render() {
    const siteSearchIndex = this._queryIndex.value?.length || 0;
    const searchUrl = this._query
      ? `/${this.locale}/search?${new URLSearchParams({ q: this._query })}`
      : null;
    return html`
      <dialog @keydown=${this._keydown} @focusin=${this._focus} closedby="any">
        <form
          method="get"
          action=${`/${this.locale}/search`}
          @submit=${this._submit}
        >
          <input
            type="search"
            name="q"
            .value=${this._query}
            autofocus
            @input=${this._input}
            placeholder=${this.l10n`Search`}
            aria-label=${this.l10n`Search`}
          />
        </form>
        <mdn-button
          class="close"
          variant="plain"
          icon-only
          .icon=${exitIcon}
          @click=${this._close}
          >${this.l10n`Exit search`}</mdn-button
        >
        ${this._queryIndex.render({
          initial: this._renderLoadingSearchIndex.bind(this),
          pending: this._renderLoadingSearchIndex.bind(this),
        })}
        <ul>
          ${this._queryIndex.render({
            complete: (results) =>
              results?.map(
                ({ title, url }, i) => html`
                  <li ?data-selected=${this._selected === i} data-result=${i}>
                    <a
                      href=${url}
                      data-glean-id=${`quick-search: results[${1 + i}] -> ${this._query} -> ${url}`}
                      ><span class="slug"
                        >${mdnUrl2Breadcrumb(url, this.locale)}</span
                      >
                      <span class="title"
                        >${HighlightMatch(title, this._query)}</span
                      ></a
                    >
                  </li>
                `,
              ),
          })}
          ${searchUrl
            ? html`<li
                ?data-selected=${this._selected === siteSearchIndex}
                data-result=${siteSearchIndex}
              >
                <a
                  href=${searchUrl}
                  data-glean-id=${`quick-search: site-search -> ${this._query}`}
                  ><span class="title"
                    >${this.l10n.raw({
                      id: "search-modal-site-search",
                      args: {
                        query: this._query,
                      },
                      elements: {
                        query: { tag: "code" },
                      },
                    })}</span
                  ></a
                >
              </li>`
            : nothing}
        </ul>
      </dialog>
    `;
  }

  updated() {
    if (this._shiftFocus) {
      const selected = this._getSelectedItem();
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

/**
 * @param {string} title
 * @param {string} query
 */
function HighlightMatch(title, query) {
  // Split on highlight term and include term into parts, ignore case.
  const words = splitQuery(query);
  // $& means the whole matched string
  const regexWords = words.map((s) =>
    s.replaceAll(/[.*+?^${}()|[\]\\]/g, String.raw`\$&`),
  );
  const regex = regexWords.map((word) => `(${word})`).join("|");
  const parts = title.split(new RegExp(regex, "gi"));
  return parts
    .filter(Boolean)
    .map((part) =>
      words.includes(part.toLowerCase()) ? html`<mark>${part}</mark>` : part,
    );
}
