import { html } from "lit";

import { PageLayout } from "../../components/page-layout/index.js";
import { ServerComponent } from "../server.js";

export class Search extends ServerComponent {
  /**
   * @param {Fred.Context} context
   */
  render(context) {
    return PageLayout.render(
      context,
      html`<mdn-site-search></mdn-site-search>`,
    );
  }
}
