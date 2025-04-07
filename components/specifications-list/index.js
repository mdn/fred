import { html } from "lit";

/**
 * @param {import("@mdn/rari").Specification[]} specifications
 */
export function SpecificationsList(specifications) {
  if (specifications.length === 0) {
    return html`This feature does not appear to be defined in any specification.`;
  }

  return html`This feature is defined in the following
    <a href="/en-US/docs/Glossary/Specification">specifications</a>:
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
