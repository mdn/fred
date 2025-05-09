import { LitElement, html, nothing } from "lit";
import { ref } from "lit/directives/ref.js";
import { styleMap } from "lit/directives/style-map.js";

import "../placement-note/element.js";
import "../placement-no/element.js";

import { PlacementMixin } from "../placement/mixin.js";

import styles from "./element.css?lit";

/**
 * @import * as Placements from "../placement/types.js";
 */

export class MDNPlacementSidebar extends PlacementMixin(LitElement) {
  static styles = styles;

  /**
   *
   * @param {Placements.PlacementContextData} placementContext
   * @returns
   */
  renderComplete(placementContext) {
    super.renderComplete(placementContext);
    const { side: data } = placementContext;
    if (!data) {
      return nothing;
    }
    const {
      status,
      click,
      view,
      copy,
      image,
      alt,
      cta,
      colors,
      version,
      heading,
    } = data;
    if (status !== "success") {
      return nothing;
    }
    if (!this._viewedUrl) {
      this._viewedUrl = view;
      this._version = version;
    }
    const { textColor, backgroundColor, textColorDark, backgroundColorDark } =
      colors || {};
    const styles = Object.fromEntries(
      [
        ["--side-background-light", backgroundColor],
        ["--side-color-light", textColor],
        ["--side-background-dark", backgroundColorDark || backgroundColor],
        ["--side-color-dark", textColorDark || textColor],
      ].filter(([_, v]) => Boolean(v)),
    );

    return html`<section class="sidebar-placement">
      <div
        ${ref(this._placementRef)}
        class="placement-container"
        style=${styleMap(styles)}
      >
        <a
          class="placement-link"
          data-glean="pong: pong-&gt;click side"
          href=${this.clickLink(click, version)}
          target="_blank"
          rel="sponsored noreferrer"
          ><img
            src=${this.imgLink(image)}
            aria-hidden=${!alt}
            alt=${alt || ""}
            width="125px"
            height="125px"
          />
          <div class="placement-content">
            <strong class="placement-heading">${heading}</strong>
            <span class="placement-copy">${copy}</span>
            <span class="placement-cta external">${cta}</span>
          </div>
        </a>
        <mdn-placement-note></mdn-placement-note>
      </div>
      <mdn-placement-no></mdn-placement-no>
    </section>`;
  }
}

customElements.define("mdn-placement-sidebar", MDNPlacementSidebar);
