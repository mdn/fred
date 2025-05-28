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
    /** @type {Promise<import("./types.js").SearchIndex> | undefined} */
    this._index = undefined;
    this._query = "";
    this._selected = 0;
    this._shiftFocus = false;
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

  _showModal() {
    this._loadIndex();
    this.shadowRoot?.querySelector("dialog")?.showModal();
    this.shadowRoot?.querySelector("input")?.select();
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

  /** @param {SubmitEvent} event */
  _submit(event) {
    event.preventDefault();
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
      this._showModal();
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

  render() {
    const siteSearchIndex = this._queryIndex.value?.length || 0;
    return html`
      <dialog @keydown=${this._keydown} @focusin=${this._focus}>
        <form @submit=${this._submit}>
          <input
            type="text"
            .value=${this._query}
            autofocus
            @input=${this._input}
          />
        </form>
        <ul>
          ${this._queryIndex.render({
            initial: () => html`<progress></progress>`,
            pending: () => html`<progress></progress>`,
            complete: (results) =>
              results?.map(
                ({ title, url }, i) => html`
                  <li ?data-selected=${this._selected === i} data-result=${i}>
                    <a href=${url}>${HighlightMatch(title, this._query)}</a>
                    <small>
                      ${url
                        .split("/")
                        .slice(1)
                        .filter((p) => !["docs", this.locale].includes(p))
                        .join(" / ")}
                    </small>
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
                  >${this.l10n.raw({
                    id: "search-modal_site-search",
                    args: {
                      query: this._query,
                    },
                    elements: {
                      query: { tag: "code" },
                    },
                  })}</a
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
