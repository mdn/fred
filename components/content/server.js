import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

import { ArticleFooter } from "../article-footer/server.js";
import { BaselineIndicator } from "../baseline-indicator/server.js";
import { HeadingAnchor } from "../heading-anchor/server.js";
import { ServerComponent } from "../server/index.js";
import { SpecificationsList } from "../specifications-list/index.js";

export class Content extends ServerComponent {
  /**
   * @param {Fred.Context<Rari.DocPage>} context
   * @returns {Lit.TemplateResult}
   */
  render(context) {
    const { doc } = context;
    return html`<div class="content">
      <h1>${doc.title}</h1>
      ${BaselineIndicator.render(context)}
      ${doc.body.map((section) => Section(context, section))}
      ${ArticleFooter.render(context)}
    </div>`;
  }
}

/**
 * @param {Fred.Context} context
 * @param {Rari.Section} section
 * @returns {Lit.TemplateResult}
 */
export function Section(context, { type, value }) {
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

/**
 * @param {Rari.Prose} section
 * @returns {Lit.TemplateResult}
 */
function Prose({ id, title, content, isH3 }) {
  const level = isH3 ? 3 : 2;
  // @ts-nocheck
  return html`<section aria-labelledby=${ifDefined(id ?? undefined)}>
    ${HeadingAnchor.render(level, id ? String(id) : null, String(title))}
    ${unsafeHTML(content)}
  </section>`;
}

/**
 * @param {Rari.Compat} section
 * @returns {Lit.TemplateResult}
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
 * @param {Fred.Context} context
 * @param {Rari.SpecificationSection} section
 */
function SpecificationsSection(context, { id, title, specifications, isH3 }) {
  const level = isH3 ? 3 : 2;
  return html`<section aria-labelledby=${ifDefined(id ?? undefined)}>
    ${HeadingAnchor.render(level, id ? String(id) : null, String(title))}
    ${SpecificationsList(context, specifications)}
  </section>`;
}
