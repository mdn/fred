import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

import { HeadingAnchor } from "../heading-anchor/server.js";
import { ServerComponent } from "../server/index.js";
import { SpecificationsList } from "../specifications-list/index.js";

export class ContentSection extends ServerComponent {
  /**
   * @param {import("@fred").Context} context
   * @param {import("@rari").Section} section
   * @returns {import("@lit").TemplateResult}
   */
  render(context, { type, value }) {
    switch (type) {
      case "browser_compatibility": {
        return BCD(value);
      }
      case "specifications": {
        return SpecificationsSection(context, value);
      }
      default: {
        return Prose(value);
      }
    }
  }
}

/**
 * @param {import("@rari").Prose} section
 * @returns {import("@lit").TemplateResult}
 */
function Prose({ id, title, content, isH3 }) {
  const level = isH3 ? 3 : 2;
  // @ts-nocheck
  return html`<section
    class="content-section"
    aria-labelledby=${ifDefined(id ?? undefined)}
  >
    ${HeadingAnchor.render(level, id ? String(id) : null, String(title))}
    ${unsafeHTML(content)}
  </section>`;
}

/**
 * @param {import("@rari").Compat} section
 * @returns {import("@lit").TemplateResult}
 */
function BCD({ id, title, query, isH3 }) {
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
 * @param {import("@fred").Context} context
 * @param {import("@rari").SpecificationSection} section
 */
function SpecificationsSection(context, { id, title, specifications, isH3 }) {
  const level = isH3 ? 3 : 2;
  return html`<section
    class="content-section"
    aria-labelledby=${ifDefined(id ?? undefined)}
  >
    ${HeadingAnchor.render(level, id ? String(id) : null, String(title))}
    ${SpecificationsList(context, specifications)}
  </section>`;
}
