import { LitElement, html, nothing } from "lit";
import { ref } from "lit/directives/ref.js";
import { styleMap } from "lit/directives/style-map.js";

import "../placement-note/element.js";
import "../placement-no/element.js";

import { PlacementMixin } from "../placement/mixin.js";

import styles from "./element.css?lit";

/**
 * @import * as Placements from "../placement/types.js";
 * @import { TemplateResult } from "lit";
 */

export class MDNPlacementTop extends PlacementMixin(LitElement) {
  static styles = styles;

  /**
   *
   * @returns {TemplateResult | symbol}
   */
  renderInitial() {
    return html`<div class="top-placement"></div>`;
  }

  /**
   *
   * @param {Placements.PlacementContextData} placementContext
   * @returns
   */
  renderComplete(placementContext) {
    super.renderComplete(placementContext);
    const data = placementContext?.hpTop || placementContext?.top;
    if (!data) {
      return nothing;
    }
    const { status, click, view, copy, image, alt, cta, colors, version } =
      data;
    if (status !== "success") {
      return nothing;
    }
    if (!this._viewedUrl) {
      this._viewedUrl = view;
      this._version = version;
    }
    const {
      textColor,
      backgroundColor,
      ctaTextColor,
      ctaBackgroundColor,
      textColorDark,
      backgroundColorDark,
      ctaTextColorDark,
      ctaBackgroundColorDark,
    } = colors || {};
    const styles = Object.fromEntries(
      [
        ["--place-top-background-light", backgroundColor],
        ["--place-top-color-light", textColor],
        ["--place-top-cta-background-light", ctaBackgroundColor],
        ["--place-top-cta-color-light", ctaTextColor],
        ["--place-top-background-dark", backgroundColorDark || backgroundColor],
        ["--place-top-color-dark", textColorDark || textColor],
        [
          "--place-top-cta-background-dark",
          ctaBackgroundColorDark || ctaBackgroundColor,
        ],
        ["--place-top-cta-color-dark", ctaTextColorDark || ctaBackgroundColor],
      ].filter(([_, v]) => Boolean(v)),
    );

    return html`<div
      ${ref(this._placementRef)}
      class="top-placement"
      style=${styleMap(styles)}
    >
      <section class="placement-container">
        <div class="placement-inner">
          <a
            class="placement-link"
            data-glean="pong: pong-&gt;click top-banner"
            href=${this.clickLink(click, version)}
            target="_blank"
            rel="sponsored noreferrer"
            ><div class="placement-content">
              <img
                src=${this.imgLink(image)}
                aria-hidden=${!alt}
                alt=${alt || ""}
                height="50"
              /><span>${copy}</span>
            </div>
            <span class="placement-cta">${cta}</span></a
          >
          <mdn-placement-note></mdn-placement-note>
        </div>
        <mdn-placement-no></mdn-placement-no>
      </section>
    </div>`;
  }
}

customElements.define("mdn-placement-top", MDNPlacementTop);
