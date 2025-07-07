import { Task } from "@lit/task";
import { LitElement, html, nothing } from "lit";

import { ifDefined } from "lit/directives/if-defined.js";

import { L10nMixin } from "../../l10n/mixin.js";

import "../button/element.js";

import searchIcon from "../icon/search.svg?lit";

import styles from "./element.css?lit";

export class MDNSiteSearch extends L10nMixin(LitElement) {
  static styles = styles;

  static properties = {
    _inputValue: { state: true },
    _query: { state: true },
    _page: { state: true },
  };

  constructor() {
    super();
    /** @type {string | undefined} */
    this._inputValue = undefined;
    /** @type {string | undefined} */
    this._query = undefined;
    /** @type {string[]} */
    this._locales = [this.locale];
    /** @type {string} */
    this._sort = "";
    this._page = 1;
  }

  _searchTask = new Task(this, {
    args: () => [this._query, this._locales, this._sort, this._page],
    task: async ([query, locales, sort, page], { signal }) => {
      if (!query) {
        return;
      }

      const params = new URLSearchParams({
        q: query,
        sort,
        page: page.toString(),
      });

      for (const locale of locales) {
        params.append("locale", locale);
      }

      const res = await fetch(`/api/v1/search?${params}`, { signal });
      if (!res.ok) {
        throw new Error(`${res.status}: ${res.statusText}`);
      }
      return /** @type {Promise<import("./types.js").SearchResponse>} */ (
        res.json()
      );
    },
  });

  connectedCallback() {
    super.connectedCallback();
    const params = new URLSearchParams(location.search);
    const queryParam = params.get("q") || undefined;

    this._inputValue = queryParam;
    this._query = queryParam;

    this._locales = params.has("locale")
      ? params.getAll("locale").sort()
      : [this.locale];
    this._sort = params.get("sort") || "best";

    const page = params.get("page");

    if (page) {
      try {
        this._page = Number.parseInt(page, 10);
      } catch {
        this._page = 1;
      }
    }
  }

  /**
   * @param {Event} event
   */
  _handleInput(event) {
    const target = /** @type {HTMLInputElement} */ (event.target);
    this._inputValue = target.value;
  }

  /**
   * @param {KeyboardEvent} event
   */
  _handleKeyDown(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      this._executeSearch();
    }
  }

  /**
   * @param {Event} event
   */
  _handleSearch(event) {
    event.preventDefault();
    this._executeSearch();
  }

  _executeSearch() {
    const trimmedQuery = this._inputValue?.trim();
    if (trimmedQuery) {
      const url = new URL(location.href);
      url.searchParams.set("q", trimmedQuery);
      url.searchParams.set("page", "1");
      globalThis.history.pushState({}, "", url);

      this._page = 1;
      this._query = trimmedQuery; // This triggers the search task
    }
  }

  renderInputs() {
    return html`
      <div class="site-search-form">
        <div class="site-search-form__form">
          <input
            class="site-search-form__input"
            name="query"
            type="text"
            .value=${this._inputValue || ""}
            @input=${this._handleInput}
            @keydown=${this._handleKeyDown}
          />
          <mdn-button
            class="site-search-form__submit"
            @click=${this._handleSearch}
            .disabled=${ifDefined(
              !this._inputValue || this._inputValue.trim() === ""
                ? true
                : undefined,
            )}
          >
            ${searchIcon}
          </mdn-button>
        </div>
      </div>
    `;
  }

  render() {
    /** @type {Array<string[]>} */
    const LOCALE_OPTIONS =
      this.locale === "en-US"
        ? []
        : [[this.locale], ["en-US"], [this.locale, "en-US"].sort()];

    /** @type {[string, string][]} */
    const SORT_OPTIONS = [
      ["best", this.l10n`Best`],
      ["relevance", this.l10n`Relevance`],
      ["popularity", this.l10n`Popularity`],
    ];

    /*
    this.disabled = false;
    this.icon = undefined;
    this.iconOnly = false;
    this.iconPosition = "before";
    this.variant = "primary";
    this.action = undefined;
    this.href = undefined;
    this.target = undefined;
    */

    return this._searchTask.render({
      pending: () => html`
        ${this.renderInputs()}
        <div class="site-search__searching">${this.l10n`Searching…`}</div>
      `,
      complete: (results) =>
        results
          ? html`
            ${this.renderInputs()}

            <h1 class="site-search__title">
              ${this.l10n.raw({
                id: "search-title",
                args: {
                  query: this._query,
                },
              })}
            </h1>
            <section class="site-search__options">
              ${
                LOCALE_OPTIONS.length > 0
                  ? html` <h2>${this.l10n`Language`}</h2>
                      <ul>
                        ${LOCALE_OPTIONS.map((locales) => {
                          const label =
                            locales.length == 1
                              ? locales.at(0)
                              : this.l10n`Both`;
                          if (this._locales.join(",") === locales.join(",")) {
                            return html`<li><em>${label}</em></li>`;
                          } else {
                            const url = new URL(location.href);
                            url.searchParams.delete("locale");
                            for (const locale of locales) {
                              url.searchParams.append("locale", locale);
                            }
                            return html`<li><a href=${url}>${label}</a></li>`;
                          }
                        })}
                      </ul>`
                  : nothing
              }
              <h2>${this.l10n`Sort by`}</h2>
              <ul>
              ${SORT_OPTIONS.map(([sort, label]) => {
                if (this._sort === sort) {
                  return html`<li><em>${label}</em></li>`;
                } else {
                  const url = new URL(location.href);
                  url.searchParams.set("sort", sort);
                  return html`<li><a href=${url}>${label}</a></li>`;
                }
              })}
              </ul>
            </section>
            <section class="site-search__results">
              <h2>${this.l10n`Results`}</h2>
              ${this.l10n.raw({
                id: "search-stats",
                args: {
                  results: results.metadata.total.value,
                  time: results.metadata.took_ms,
                },
              })}
              <ul class="site-search-results">
                ${results.documents.map(
                  (result) =>
                    html`<li class="site-search-results__item">
                      <article>
                        ${result.locale.toLowerCase() ===
                        this.locale.toLowerCase()
                          ? nothing
                          : html`<span
                              class="site-search-results__locale-indicator"
                              >${result.locale
                                .split("-")
                                .map((value, index) =>
                                  index > 0 ? value.toUpperCase() : value,
                                )
                                .join("-")}</span
                            >`}
                        <h2 class="site-search-results__title">
                          <a href=${result.mdn_url}>${result.title}</a>
                        </h2>

                        <p class="site-search-results__summary">
                          ${result.summary}
                        </p>
                      </article>
                    </li>`,
                )}
              </ul>
              </div>`
          : this.l10n`No results!`,
      error: (e) => html`Error: ${e}`,
    });
  }
}

customElements.define("mdn-site-search", MDNSiteSearch);
