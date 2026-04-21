import { html } from "@lit-labs/ssr";
import { nothing } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";

import { BCD_BASE_URL } from "../env/index.js";
import { HeadingAnchor } from "../heading-anchor/server.js";
import { ServerComponent } from "../server/index.js";

export class BCDSection extends ServerComponent {
  /**
   * @param {import("@fred").Context} _context
   * @param {import("@rari").Compat} section
   */
  render(_context, { id, title, query, isH3 }) {
    const level = isH3 ? 3 : 2;
    return html`<section
      class="content-section"
      aria-labelledby=${ifDefined(id ?? undefined)}
    >
      ${HeadingAnchor.render(level, id ? String(id) : null, String(title))}
      <mdn-compat-table-lazy
        locale="en-US"
        query=${query}
      ></mdn-compat-table-lazy>
    </section>`;
  }

  /**
   * @param {import("@fred").Context} _context
   * @param {import("@rari").Compat} section
   */
  renderSimplified(_context, { id, title, query, isH3 }) {
    return html`<section
      class="content-section"
      aria-labelledby=${ifDefined(id ?? undefined)}
    >
      ${isH3
        ? nothing
        : HeadingAnchor.render(2, id ? String(id) : null, String(title))}
      <a
        href="${BCD_BASE_URL}/bcd/api/v0/current/${query}.json"
        target="_blank"
        rel="noopener"
        ><code>${query}</code></a
      >
    </section>`;
  }
}
