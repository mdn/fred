import { html } from "lit";
import { join } from "lit/directives/join.js";

/**
 * @param {import("@fred").Context} context
 * @param {import("@rari").Specification[]} specifications
 */
export function SpecificationsList(context, specifications) {
  if (specifications.length === 0) {
    return html`${context.l10n`This feature does not appear to be defined in any specification.`}`;
  }

  /** @type {Map<string, string[]>} */
  const urlsByTitle = new Map();
  for (const { title, bcdSpecificationURL: url } of specifications) {
    const urls = urlsByTitle.get(title) ?? [];
    urls.push(url);
    urlsByTitle.set(title, urls);
  }

  return html`<p>
      ${context.l10n`This feature is defined in the following specifications`}:
    </p>
    <ul class="specifications-list">
      ${urlsByTitle.entries().map(([title, urls]) =>
        urls.length > 1
          ? html`<li>
              <details
                class="specifications-list"
                ?open=${specifications.length <= 3}
              >
                <summary>${title}</summary>
                <ul>
                  ${urls.map((url) => html`<li>${SpecificationLink(url)}</li>`)}
                </ul>
              </details>
            </li>`
          : urls.map((url) => html`<li>${SpecificationLink(url, title)}</li>`),
      )}
    </ul>`;
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
