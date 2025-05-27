import { html, nothing } from "lit";

/**
 * @param {import("@fred").Context} context
 * @param {import("@rari").Specification[]} specifications
 */
export function SpecificationsList(context, specifications) {
  if (specifications.length === 0) {
    return html`${context.l10n`This feature does not appear to be defined in any specification.`}`;
  }

  return html`${context.l10n`This feature is defined in the following specifications`}:
    <ul>
      ${specifications.map(({ title, bcdSpecificationURL: url }) => {
        return html`<li>
          <a class="external" href=${url} rel="noopener" target="_blank"
            >${title}${url.includes("#")
              ? html`<br />
                  <small># ${url.split("#")[1]}</small>`
              : nothing}</a
          >
        </li>`;
      })}
    </ul>`;
}
