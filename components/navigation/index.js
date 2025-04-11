import { html } from "lit";

import { Logo } from "../logo/index.js";
import { Menu } from "../menu/index.js";

import "./index.css";

/**
 * @param {Fred.Context} context
 */
export function Navigation(context) {
  const colorScheme = context.renderer === "Homepage" ? "dark" : "";

  return html`
    <nav class="navigation" data-scheme=${colorScheme}>
      <div class="navigation__logo">${Logo(context)}</div>
      <button
        class="navigation__button"
        type="button"
        aria-expanded="true"
        aria-controls="navigation__popup"
      >
        <svg
          class="navigation__button-icon"
          data-type="open"
          viewBox="0 -960 960 960"
          width="24"
          height="24"
        >
          <path
            d="M167.5-248q-15.5 0-26.5-11t-11-26.5q0-15.5 11-26.5t26.5-11h625q15.5 0 26.5 11t11 26.5q0 15.5-11 26.5t-26.5 11h-625Zm0-195q-15.5 0-26.5-11t-11-26.5q0-15.5 11-26.5t26.5-11h625q15.5 0 26.5 11t11 26.5q0 15.5-11 26.5t-26.5 11h-625Zm0-195q-15.5 0-26.5-11t-11-26.5q0-15.5 11-26.5t26.5-11h625q15.5 0 26.5 11t11 26.5q0 15.5-11 26.5t-26.5 11h-625Z"
          />
        </svg>
        <svg
          class="navigation__button-icon"
          data-type="close"
          viewBox="0 -960 960 960"
          width="24"
          height="24"
        >
          <path
            d="M480-427 285.5-232.5q-11 11-26.5 10.75T232.5-233q-10.5-11-10.25-26.25T233-285l194-195-194-195q-10.5-10.5-10.5-25.75T233-727q10.5-11 26-11.25t26.5 10.75L480-533l194.5-194.5q11-11 26.5-10.75T727.5-727q10.5 11 10.25 26.25T727-675L533-480l194 195q10.5 10.5 10.5 25.75T727-233q-10.5 11-26 11.25t-26.5-10.75L480-427Z"
          />
        </svg>
      </button>
      <div class="navigation__popup" data-open="true" id="navigation__popup">
        <div class="navigation__menu">${Menu(context)}</div>
        <div class="navigation__search">
          <mdn-search-modal></mdn-search-modal>
        </div>
      </div>
    </nav>
  `;
}
