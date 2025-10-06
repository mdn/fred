import { Task } from "@lit/task";
import { LitElement, html, nothing } from "lit";

import { unsafeHTML } from "lit/directives/unsafe-html.js";

import { L10nMixin } from "../../l10n/mixin.js";

import "../button/element.js";

import { gleanClick } from "../../utils/glean.js";
import { mdnUrl2Breadcrumb } from "../../utils/mdn-url2breadcrumb.js";
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
    this._page = 1;
  }

  _searchTask = new Task(this, {
    args: () => [this._query, this._locales, this._page],
    task: async ([query, locales, page], { signal }) => {
      if (!query) {
        return;
      }

      const params = new URLSearchParams({
        q: query,
        page: page.toString(),
      });

      for (const locale of locales) {
        params.append("locale", locale);
      }

      const res = await fetch(`/api/v1/search?${params}`, { signal });
      if (!res.ok) {
        throw new Error(`${res.status}: ${res.statusText}`);
      }

      const result = /** @type {import("./types.js").SearchResponse} */ (
        await res.json()
      );

      if (result.documents.length === 0 && result.metadata.total.value === 0) {
        gleanClick("site-search: no-results");
      }

      return result;
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
            ?disabled=${!this._inputValue || this._inputValue.trim() === ""}
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
              <mdn-button variant="secondary" href=${previousURL.toString()}
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
  }

  /**
   *
   * @param {import("./types.js").SearchResponse} results
   */
  renderSuggestions(results) {
    if (results.suggestions.length > 0) {
      return html`
        <section class="site-search__suggestions">
          <p class="site-search-suggestions__text">
            ${this.l10n("site-search-suggestions-text")`Did you mean…`}
          </p>
          <ul class="site-search-suggestions__list">
            ${results.suggestions.map((suggestion) => {
              const url = new URL(location.href);
              url.searchParams.delete("page");
              url.searchParams.set("q", suggestion.text);
              return html`
                <li class="site-search-suggestions__item">
                  <a class="site-search-suggestions__link" href=${url.href}
                    >${suggestion.text}</a
                  >
                  <span class="site-search-suggestions__matches"
                    >${this.l10n.raw({
                      id: "site-search-suggestion-matches",
                      args: {
                        matches: suggestion.total.value,
                        relation: suggestion.total.relation,
                      },
                    })}</span
                  >
                </li>
              `;
            })}
          </ul>
        </section>
      `;
    }
    return nothing;
  }

  render() {
    /** @type {Array<string[]>} */
    const LOCALE_OPTIONS =
      this.locale === "en-US"
        ? []
        : [[this.locale], ["en-US"], [this.locale, "en-US"].sort()];

    return this._searchTask.render({
      pending: () => html`
        ${this.renderInputs()}
        <div class="site-search__searching">${this.l10n`Searching…`}</div>
      `,

      complete: (results) => {
        return results
          ? html`
              ${this.renderInputs()}

                ${this.renderSuggestions(results)}
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
                              return html`<li>
                                <a href=${url.toString()}>${label}</a>
                              </li>`;
                            }
                          })}
                        </ul>`
                    : nothing
                }
              </section>
              <section class="site-search__results">
                <p class="site-search__results-stats">${this.l10n.raw({
                  id: "site-search-search-stats",
                  args: {
                    results: results.metadata.total.value,
                  },
                })}</p>
              <ul class="site-search-results">
                ${results.documents.map(
                  (result, index) =>
                    html`<li class="site-search-results__item">
                      <article>
                        <p class="site-search-results__path">
                          ${mdnUrl2Breadcrumb(result.mdn_url, this.locale)}
                        </p>
                        <h2 class="site-search-results__title">
                          <a
                            href=${result.mdn_url}
                            data-glean-id=${`site-search: results[${1 + index + (results.metadata.page - 1) * results.metadata.size}] -> ${this._query} -> ${result.mdn_url}`}
                          >
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
                          </a>
                        </h2>
                        <p class="site-search-results__description">
                          ${result.highlight.body &&
                          result.highlight.body.length > 0
                            ? result.highlight.body.flatMap((b, i) =>
                                i === 0
                                  ? [unsafeHTML(b)]
                                  : [html` … `, unsafeHTML(b)],
                              )
                            : result.summary}
                        </p>
                      </article>
                    </li>`,
                )}
                </ul>
                </section>
                </section>
                <nav class="site-search__results-pagination">
                  ${this.renderPagination(results.metadata.page, results.metadata.total.value, results.metadata.size)}
                </nav>
              </section>
            `
          : html`${this.renderInputs()}`;
      },
      error: (e) => html`Error: ${e}`,
    });
  }
}

customElements.define("mdn-site-search", MDNSiteSearch);
