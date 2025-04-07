import { nothing } from "lit";
import { html as hh, unsafeStatic } from "lit/static-html.js";

import "./index.css";

/**
 * @param {number} level
 * @param {string?} id
 * @param {string} title
 */
export function Heading(level, id, title) {
  return id
    ? hh`<${unsafeStatic("h" + level)} id=${id} class="heading"><a class="heading-anchor" href="#${id}">${title}</a></${unsafeStatic("h" + level)}>`
    : nothing;
}
