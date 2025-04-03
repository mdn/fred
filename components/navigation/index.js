import { html } from "lit";

import { Logo } from "../logo/index.js";
import "../color-theme/index.js";
import "../quick-search/index.js";
import { Menu } from "../menu/index.js";

import "./index.css";

/**
 * @param {Fred.Context} context
 */
export function Navigation(context) {
  return html`<nav class="navigation">
    <div class="navigation__logo">${Logo(context)}</div>
    <div class="navigation__menu">${Menu(context)}</div>
    <div class="navigation__tools">
      <mdn-color-theme></mdn-color-theme><quick-search></quick-search>
    </div>
  </nav>`;
}
