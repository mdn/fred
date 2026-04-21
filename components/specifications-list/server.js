import { html } from "@lit-labs/ssr";
import { join } from "lit/directives/join.js";

import { ServerComponent } from "../server/index.js";

export class SpecificationsList extends ServerComponent {
  /**
   * @param {import("@fred").Context} context
   * @param {import("@rari").Specification[]} specifications
   */
  render(context, specifications) {
    if (specifications.length === 0) {
      return html`${context.l10n(
        "specifications-list-this-feature-does-not-appear-to",
      )`This feature does not appear to be defined in any specification.`}`;
    }

    /** @type {Map<string, string[]>} */
    const urlsByTitle = new Map();
    for (const { title, bcdSpecificationURL: url } of specifications) {
      const urls = urlsByTitle.get(title) ?? [];
      urls.push(url);
      urlsByTitle.set(title, urls);
    }
    const links = urlsByTitle
      .entries()
      .flatMap(([title, urls]) =>
        urls.map((url) => this.renderLink(url, title)),
      );

    return this.simplifiedMode
      ? html`<ul>
          ${links.map((link) => html`<li>${link}</li>`)}
        </ul>`
      : html`<table>
          <thead>
            <tr>
              <th scope="col">
                ${context.l10n(
                  "specifications-list-specification",
                )`Specification`}
              </th>
            </tr>
          </thead>
          <tbody>
            ${links.map(
              (link) =>
                html`<tr>
                  <td>${link}</td>
                </tr>`,
            )}
          </tbody>
        </table>`;
  }

  /**
   * @param {string} url
   * @param {string} [title]
   */
  renderLink(url, title) {
    const hash = url.split("#")[1];

    const label = [
      title && html`${title}`,
      title && hash && html`<br />`,
      hash && html`# ${hash}`,
    ].filter(Boolean);

    return html`<a class="external" href=${url} rel="noopener" target="_blank"
      >${join(label, "")}</a
    >`;
  }
}
