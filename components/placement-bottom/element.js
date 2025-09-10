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

export class MDNPlacementBottom extends PlacementMixin(LitElement) {
  static styles = styles;

  /**
   *
   * @param {Placements.PlacementContextData} placementContext
   * @returns
   */
  renderComplete(placementContext) {
    const data = placementContext?.hpFooter || placementContext?.bottom;
    if (!data) {
      return nothing;
    }
    const { status, click, view, image, alt, colors, version } = data;
    if (status !== "success") {
      return nothing;
    }
    if (!this._viewedUrl) {
      this._viewedUrl = view;
      this._version = version;
    }
    const { backgroundColor, textColor } = colors || {};
    const styles = Object.fromEntries(
      [
        ["--bottom-background", backgroundColor],
        ["--bottom-color", textColor],
      ].filter(([_, v]) => Boolean(v)),
    );

    return html`<div
      ${ref(this._placementRef)}
      class="bottom-placement"
      style=${styleMap(styles)}
    >
      <section class="placement-container">
        <a
          class="placement-link"
          data-glean-id="pong: pong-&gt;click top-banner"
          href=${this.clickLink(click, version)}
          target="_blank"
          rel="sponsored noreferrer"
        >
          <img
            src=${this.imgLink(image)}
            aria-hidden=${!alt}
            alt=${alt || ""}
            width="728"
            height="90"
          />
        </a>
        <mdn-placement-note></mdn-placement-note>
      </section>
    </div>`;
  }
}

customElements.define("mdn-placement-bottom", MDNPlacementBottom);
