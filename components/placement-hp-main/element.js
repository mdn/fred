import { LitElement, html, nothing } from "lit";
import { ref } from "lit/directives/ref.js";
import { styleMap } from "lit/directives/style-map.js";

import "../placement-note/element.js";
import "../placement-no/element.js";

import { clickLink, imgLink } from "../placement-utils/links.js";
import { PlacementMixin } from "../placement-utils/mixin.js";

import styles from "./element.css?lit";

export class MDNPlacementHpMain extends PlacementMixin(LitElement) {
  static styles = styles;

  /**
   *
   * @param {Placements.PlacementContextData} placementContext
   * @returns
   */
  renderComplete(placementContext) {
    super.renderComplete(placementContext);
    const { hpMain: data } = placementContext;
    if (!data) {
      return nothing;
    }
    const { status, click, view, image, alt, colors, version } = data;
    if (status !== "success") {
      return nothing;
    }
    if (!this.viewedUrl) {
      this.viewedUrl = view;
      this.version = version;
    }
    const { backgroundColor, textColor } = colors || {};
    const styles = Object.fromEntries(
      [
        ["--hp-main-background", backgroundColor],
        ["--hp-main-color", textColor],
      ].filter(([_, v]) => Boolean(v)),
    );

    return html`<div
      ${ref(this._placementRef)}
      class="hp-main-placement"
      style=${styleMap(styles)}
    >
      <section class="placement-container">
        <a
          class="placement-link"
          data-glean="pong: pong-&gt;click top-banner"
          data-href=${clickLink(click, version)}
          target="_blank"
          rel="sponsored noreferrer"
        >
          <img
            src=${imgLink(image)}
            aria-hidden=${!alt}
            alt=${alt || ""}
            width="970"
            height="250"
          />
        </a>
        <mdn-placement-note></mdn-placement-note>
      </section>
    </div>`;
  }
}

customElements.define("mdn-placement-hp-main", MDNPlacementHpMain);
