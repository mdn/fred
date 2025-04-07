import { html } from "lit";

import { PageLayout } from "../../components/page-layout/index.js";

/**
 * @param {Fred.Context} context
 */
export function NotFound(context) {
  return PageLayout(context, html` <h1>${context.l10n`Page not found`}</h1> `);
}
