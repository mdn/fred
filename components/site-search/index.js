import { Task } from "@lit/task";
import { LitElement, html } from "lit";

import { L10nMixin } from "../../l10n/mixin";

class SiteSearch extends L10nMixin(LitElement) {
  static properties = {
    _query: { state: true },
    _page: { state: true },
  };

  constructor() {
    super();
    /** @type {string | undefined} */
    this._query = undefined;
    this._page = 1;
  }

  _searchTask = new Task(this, {
    args: () => [this._query, this._page],
    task: async ([query, page], { signal }) => {
      if (!query) {
        return;
      }
      const params = new URLSearchParams({
        q: query,
        page: page.toString(),
      });
      const res = await fetch(`/api/v1/search?${params}`, { signal });
      if (!res.ok) {
        throw new Error(`${res.status}: ${res.statusText}`);
      }
      return /** @type {Promise<import("./types").SearchResponse>} */ (
        res.json()
      );
    },
  });

  connectedCallback() {
    super.connectedCallback();
    const params = new URLSearchParams(location.search);
    this._query = params.get("q") || undefined;
    const page = params.get("page");
    if (page) {
      this._page = Number.parseInt(page, 10);
    }
  }

  render() {
    return this._searchTask.render({
      complete: (results) =>
        results
          ? html`<h1>
                ${this.l10n.raw({
                  id: "search_title",
                  args: {
                    query: this._query,
                  },
                })}
              </h1>
              ${this.l10n.raw({
                id: "search_stats",
                args: {
                  results: results.metadata.total.value,
                  time: results.metadata.took_ms,
                },
              })}
              <ul>
                ${results.documents.map(
                  (result) =>
                    html`<li>
                      <article>
                        <h2><a href=${result.mdn_url}>${result.title}</a></h2>
                        <p>${result.summary}</p>
                      </article>
                    </li>`,
                )}
              </ul>`
          : "No results!",
      error: (e) => html`Error: ${e}`,
    });
  }
}

customElements.define("mdn-site-search", SiteSearch);
