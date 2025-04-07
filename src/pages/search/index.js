import { html } from "lit";

import { PageLayout } from "../../components/page-layout/index.js";
import "../../components/site-search/index.js";

/**
 * @param {Fred.Context} context
 */
export function Search(context) {
  return PageLayout(context, html`<mdn-site-search></mdn-site-search>`);
}
