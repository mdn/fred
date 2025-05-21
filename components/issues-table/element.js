import { LitElement, html, nothing } from "lit";

import styles from "./element.css?lit";

export class MDNIssuesTable extends LitElement {
  static styles = styles;

  static properties = {
    _issues: { state: true },
    _isLoading: { state: true },
    _error: { state: true },
  };

  constructor() {
    super();
    /** @type {import("types/github.js").Issues} */
    this._issues = [];
    /** @type {boolean} */
    this._isLoading = true; // Start in loading state
    /** @type {string | null} */
    this._error = null;
    /** @constant {string[]} */
    this.LABELS = ["good first issue", "accepting PR"];
  }

  connectedCallback() {
    super.connectedCallback();
    // Fetch issues when component is connected to the DOM.
    // static ssr = false ensures this runs client-side.
    this._fetchIssues();
  }

  async _fetchIssues() {
    this._isLoading = true;
    this._error = null;
    const query =
      'is:open is:issue repo:mdn/content repo:mdn/translated-content repo:mdn/yari label:"good first issue","accepting PR" sort:created-desc no:assignee is:public';
    const url = new URL("https://api.github.com/search/issues");
    url.searchParams.append("per_page", "5");
    url.searchParams.append("q", query);

    try {
      const res = await fetch(url.toString());
      if (!res.ok) {
        throw new Error(`GitHub API Error: ${res.status} ${res.statusText}`);
      }
      const data = await res.json();
      this._issues = data.items;
    } catch (error) {
      console.error("Failed to fetch GitHub issues:", error);
      // @ts-expect-error
      this._error = error.toString();
      this._issues = []; // Set to empty array on error to prevent issues with map
    } finally {
      this._isLoading = false;
    }
  }

  render() {
    if (this._isLoading) {
      return html`loading issues…`;
    }
    if (this._error) {
      return html`${this._error}`;
    }
    if (this._issues.length === 0) {
      return nothing;
    }

    return html`
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Repository</th>
          </tr>
        </thead>
        <tbody>
          ${this._issues.map(
            (issue) => html`
              <tr>
                <td>
                  <div>
                    <a href=${issue.html_url} target="_blank" rel="noreferrer">
                      ${issue.title}
                    </a>
                    ${issue.labels.map((label) => {
                      const labelName =
                        typeof label === "object" && label !== null
                          ? label.name
                          : label;
                      this.LABELS.includes(labelName)
                        ? html`<span class="label">${labelName}</span>`
                        : null;
                    })}
                  </div>
                </td>
                <td>
                  <a
                    href=${issue.repository_url.replace(
                      "https://api.github.com/repos/",
                      "https://github.com/",
                    )}
                    target="_blank"
                    rel="noreferrer"
                  >
                    ${issue.repository_url.replace(
                      "https://api.github.com/repos/",
                      "",
                    )}
                  </a>
                </td>
              </tr>
            `,
          )}
        </tbody>
      </table>
    `;
  }
}

customElements.define("mdn-issues-table", MDNIssuesTable);
