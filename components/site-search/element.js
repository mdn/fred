import { Task } from "@lit/task";
import { LitElement, html, nothing } from "lit";

import { ifDefined } from "lit/directives/if-defined.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

import { L10nMixin } from "../../l10n/mixin.js";

import "../button/element.js";

// import chevronLeftIcon from "../icon/chevron-left.svg?lit";
// import chevronRightIcon from "../icon/chevron-right.svg?lit";
import searchIcon from "../icon/search.svg?lit";

import styles from "./element.css?lit";

/**
 * @type {{[key: string]: string}}
 */
const localeMap = {
  "en-us": "English (US)",
  de: "Deutsch",
  fr: "Français",
  es: "Español",
  it: "Italiano",
  ja: "日本語",
  ko: "한국어",
  "pt-br": "Português (BR)",
  ru: "Русский",
  "zh-cn": "简体中文",
  "zh-tw": "繁體中文",
};

/**
 *
 * @param {string} code
 * @returns {string}
 */
function readableLocaleCode(code) {
  return localeMap[code.toLowerCase()] || code;
}

/**
 *
 * @param {string} url
 * @param {string} locale
 * @returns {string}
 */
function mdnUrl2Breadcrumb(url, locale) {
  return url
    .replaceAll("_", " ")
    .split("/")
    .slice(1)
    .filter((p) => ![locale, "docs", "Web"].includes(p))
    .join(" / ");
}

export class MDNSiteSearch extends L10nMixin(LitElement) {
  static styles = styles;
  static ssr = false;

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
      this._query = trimmedQuery; // this triggers the search
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
            icon-only="true"
            .icon=${searchIcon}
            variant="plain"
            class="site-search-form__submit"
            @click=${this._handleSearch}
            .disabled=${ifDefined(
              !this._inputValue || this._inputValue.trim() === ""
                ? true
                : undefined,
            )}
            >${this.l10n`Search`}</mdn-button
          >
        </div>
      </div>
    `;
  }

  /**
   *
   * @param {number} currentPage
   * @param {number} hitCount
   * @param {number} pageSize
   */
  renderPagination(currentPage, hitCount, pageSize) {
    let maxPage = Math.ceil(hitCount / pageSize);
    if (hitCount <= pageSize) {
      return nothing;
    }
    let previousPage = null;
    let previousURL = null;
    let nextPage = null;
    let nextURL = null;

    if (hitCount > currentPage * pageSize && currentPage < maxPage) {
      nextPage = currentPage + 1;
    }
    if (currentPage > 1) {
      previousPage = currentPage - 1;
    }

    if (nextPage || previousPage !== null) {
      if (previousPage) {
        previousURL = new URL(globalThis.location.href);
        if (previousPage === 1) {
          previousURL.searchParams.delete("page");
        } else {
          previousURL.searchParams.set("page", previousPage.toString());
        }
      }

      if (nextPage) {
        nextURL = new URL(globalThis.location.href);
        nextURL.searchParams.set("page", nextPage.toString());
      }

      return html` <ul>
        ${previousURL
          ? html` <li>
              <mdn-button variant="secondary" href=${previousURL}
                >${this.l10n`Previous`}</mdn-button
              >
            </li>`
          : html`<li></li>`}
        ${nextPage
          ? html` <li>
              <mdn-button variant="secondary" href=${nextURL}
                >${this.l10n`Next`}</mdn-button
              >
            </li>`
          : html`<li></li>`}
      </ul>`;
    }
    return nothing;

    // return html`
    //   <div class="site-search__pagination">
    //     <mdn-button
    //       icon-only="true"
    //       .icon=${chevronLeftIcon}
    //       variant="plain"
    //       class="site-search__pagination__prev"
    //       @click=${this._handlePrevPage}
    //       .disabled=${ifDefined(this._currentPage === 1 ? true : undefined)}
    //       >${this.l10n`Previous`}</mdn-button
    //     >
    //     <mdn-button
    //       icon-only="true"
    //       .icon=${chevronRightIcon}
    //       variant="plain"
    //       class="site-search__pagination__next"
    //       @click=${this._handleNextPage}
    //       .disabled=${ifDefined(this._currentPage === this._totalPages ? true : undefined)}
    //       >${this.l10n`Next`}</mdn-button
    //     >
    //   </div>
    // `;
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

    return this._searchTask.render({
      pending: () => html`
        ${this.renderInputs()}
        <div class="site-search__searching">${this.l10n`Searching…`}</div>
      `,
      complete: (results) => {
        console.log("results", results);
        return results
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
                              ? readableLocaleCode(locales.at(0) || "en-US")
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
              <p class="site-search__results-stats">${this.l10n.raw({
                id: "search-stats",
                args: {
                  results: results.metadata.total.value,
                  time: results.metadata.took_ms,
                },
              })}</p>
              <ul class="site-search-results">
                ${results.documents.map(
                  (result) =>
                    html`<li class="site-search-results__item">
                      <article>
                        <a href=${result.mdn_url}>
                          <h2 class="site-search-results__title">
                            ${result.highlight.title &&
                            result.highlight.title.length > 0
                              ? unsafeHTML(result.highlight.title[0])
                              : result.title}
                            ${result.locale.toLowerCase() ===
                            this.locale.toLowerCase()
                              ? nothing
                              : html`<sup
                                  class="site-search-results__locale-indicator"
                                  >${readableLocaleCode(result.locale)}</sup
                                >`}
                          </h2>
                          <p class="site-search-results__path">
                            ${mdnUrl2Breadcrumb(result.mdn_url, this.locale)}
                          </p>
                        </a>
                        <p class="site-search-results__description">
                          ${result.highlight.body &&
                          result.highlight.body.length > 0
                            ? unsafeHTML(result.highlight.body[0])
                            : result.summary}
                        </p>
                      </article>
                    </li>`,
                )}
              </ul>
              </div>
              </section>
              <nav class="site-search__results-pagination">
                ${this.renderPagination(results.metadata.page, results.metadata.total.value, results.metadata.size)}
              </nav>`
          : html`${this.renderInputs()}`;
      },
      error: (e) => html`Error: ${e}`,
    });
  }
}

customElements.define("mdn-site-search", MDNSiteSearch);
