import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

import { HeadingAnchor } from "../heading-anchor/server.js";
import { ServerComponent } from "../server/index.js";
import { SpecificationsList } from "../specifications-list/index.js";

export class Section extends ServerComponent {
  /**
   * @param {import("types/fred.js").Context} context
   * @param {import("types/rari.js").Section} section
   * @returns {import("types/lit.js").TemplateResult}
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
 * @param {import("types/rari.js").Prose} section
 * @returns {import("types/lit.js").TemplateResult}
 */
function Prose({ id, title, content, isH3 }) {
  const level = isH3 ? 3 : 2;
  // @ts-nocheck
  return html`<section
    class="section__prose"
    aria-labelledby=${ifDefined(id ?? undefined)}
  >
    ${HeadingAnchor.render(level, id ? String(id) : null, String(title))}
    ${unsafeHTML(content)}
  </section>`;
}

/**
 * @param {import("types/rari.js").Compat} section
 * @returns {import("types/lit.js").TemplateResult}
 */
function BCD({ id, title, query, isH3 }) {
  const level = isH3 ? 3 : 2;
  return html`<section aria-labelledby=${ifDefined(id ?? undefined)}>
    ${HeadingAnchor.render(level, id ? String(id) : null, String(title))}
    <mdn-compat-table-lazy
      locale="en-US"
      query=${query}
    ></mdn-compat-table-lazy>
  </section>`;
}

/**
 * @param {import("types/fred.js").Context} context
 * @param {import("types/rari.js").SpecificationSection} section
 */
function SpecificationsSection(context, { id, title, specifications, isH3 }) {
  const level = isH3 ? 3 : 2;
  return html`<section aria-labelledby=${ifDefined(id ?? undefined)}>
    ${HeadingAnchor.render(level, id ? String(id) : null, String(title))}
    ${SpecificationsList(context, specifications)}
  </section>`;
}
