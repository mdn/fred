import { nothing } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { html as hh, unsafeStatic } from "lit/static-html.js";

import { ServerComponent } from "../server/index.js";

export class HeadingAnchor extends ServerComponent {
  /**
   * @param {number} level
   * @param {string?} id
   * @param {string} title
   */
  render(level, id, title) {
    // remove leading numbers, dots, underscores, and commas to form a valid element id
    id = id ? id.replace(/^[0-9._,]+/, "") : id;
    return id
      ? hh`<${unsafeStatic("h" + level)} id=${ifDefined(id)} class="heading"><a class="heading-anchor" href="#${id}">${unsafeStatic(title)}</a></${unsafeStatic("h" + level)}>`
      : nothing;
  }
}
