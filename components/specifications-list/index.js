import { html } from "lit";

/**
 * @param {Fred.Context} context
 * @param {Rari.Specification[]} specifications
 */
export function SpecificationsList(context, specifications) {
  if (specifications.length === 0) {
    return html`${context.l10n`This feature does not appear to be defined in any specification.`}`;
  }

  return html`${context.l10n`This feature is defined in the following specifications`}:
    <ul>
      ${specifications.map(
        (spec) =>
          html`<li>
            <a
              class="external"
              href=${spec.bcdSpecificationURL}
              rel="noopener"
              target="_blank"
              >${spec.title}<br />
              <small># ${spec.bcdSpecificationURL.split("#")[1]}</small></a
            >
          </li>`,
      )}
    </ul>`;
}
