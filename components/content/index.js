import { html } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

import { Heading } from "../heading-anchor/index.js";
import { SpecificationsList } from "../specifications-list/index.js";

import "./index.css";

/**
 * @param {Fred.Context<Rari.DocPage>} context
 */
export function Content(context) {
  return html`<div class="content">
    <h1>${context?.doc?.title}</h1>
    ${context?.doc?.body.map((section) => Section(section))}
  </div>`;
}

/**
 * @param {import("@mdn/rari").Section} section
 */
export function Section({ type, value }) {
  switch (type) {
    case "browser_compatibility": {
      return BCD(value);
    }
    case "specifications": {
      return SpecificationsSection(value);
    }
    default: {
      return Prose(value);
    }
  }
}

/**
 * @param {import("@mdn/rari").Prose} section
 */
function Prose({ id, title, content, isH3 }) {
  const level = isH3 ? 3 : 2;
  // @ts-nocheck
  return html`<section aria-labelledby=${id}>
    ${Heading(level, id ? String(id) : null, String(title))}
    ${unsafeHTML(content)}
  </section>`;
}

/**
 * @param {import("@mdn/rari").Compat} section
 */
function BCD({ id, title, query, isH3 }) {
  const level = isH3 ? 3 : 2;
  return html`<section aria-labelledby=${id}>
    ${Heading(level, id ? String(id) : null, String(title))}
    <lazy-compat-table locale="en-US" query=${query}></lazy-compat-table>
  </section>`;
}

/**
 * @param {import("@mdn/rari").SpecificationSection} section
 */
function SpecificationsSection({ id, title, specifications, isH3 }) {
  const level = isH3 ? 3 : 2;
  return html`<section aria-labelledby=${id}>
    ${Heading(level, id ? String(id) : null, String(title))}
    ${SpecificationsList(specifications)}
  </section>`;
}
