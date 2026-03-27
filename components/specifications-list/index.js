import { html } from "lit";
import { join } from "lit/directives/join.js";

/**
 * @param {import("@fred").Context} context
 * @param {import("@rari").Specification[]} specifications
 */
export function SpecificationsList(context, specifications) {
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

  return html`<table>
    <thead>
      <tr>
        <th scope="col">
          ${context.l10n("specifications-list-specification")`Specification`}
        </th>
      </tr>
    </thead>
    <tbody>
      ${urlsByTitle.entries().map(([title, urls]) =>
        urls.map(
          (url) =>
            html`<tr>
              <td>${SpecificationLink(url, title)}</td>
            </tr>`,
        ),
      )}
    </tbody>
  </table>`;
}

/**
 * @param {string} url
 * @param {string} [title]
 */
function SpecificationLink(url, title) {
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
