import { html, nothing } from "lit";

import { ServerComponent } from "../server/index.js";

// Some type wrangling to cover parents = context.doc.parents | no parents at all | doc.parents

/**
 * @typedef {import("@rari").Parent} Parent
 */

/**
 * @typedef {object} DocParentsContext
 * @property {string} renderer The renderer to use
 * @property {{parents: Parent[]}} doc The document to render
 */

/**
 * @typedef {object} DirectParentsContext
 * @property {string} renderer The renderer to use
 * @property {Parent[]} parents The parents to render
 */

/**
 * @typedef {DocParentsContext | DirectParentsContext} BreadcrumbContext
 */

/**
 * Type predicate to check if context has doc.parents
 * @param {BreadcrumbContext} context
 * @returns {context is DocParentsContext}
 */
function hasDocParents(context) {
  return "doc" in context && "parents" in context.doc;
}

/**
 * Type predicate to check if context has direct parents
 * @param {BreadcrumbContext} context
 * @returns {context is DirectParentsContext}
 */
function hasDirectParents(context) {
  return "parents" in context;
}

export class Breadcrumbs extends ServerComponent {
  /**
   * @param {BreadcrumbContext} context
   */
  render(context) {
    console.log("CONTEXT", context);
    /** @type {Parent[]} */
    let parents;
    if (hasDocParents(context)) {
      parents = context.doc.parents;
    } else if (hasDirectParents(context)) {
      parents = context.parents;
    } else {
      return nothing;
    }

    return html`
      <ul class="breadcrumbs">
        ${parents.map(
          ({ uri, title }) => html`
            <li>
              <a href=${uri}>${title}</a>
            </li>
          `,
        )}
      </ul>
    `;
  }
}
