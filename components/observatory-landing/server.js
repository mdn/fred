import { html, svg } from "lit";

import assessmentSvg from "../observatory/assets/assessment.svg?lit";
import landingSvg from "../observatory/assets/landing-illustration.svg?lit";
import mdnSvg from "../observatory/assets/mdn.svg?lit";
import scanningSvg from "../observatory/assets/scanning.svg?lit";
import securitySvg from "../observatory/assets/security.svg?lit";

import { PageLayout } from "../page-layout/server.js";

import { ServerComponent } from "../server/index.js";

import { FAQ } from "./faq.js";
import { Feedback } from "./feedback.js";

export class ObservatoryLanding extends ServerComponent {
  /**
   * @param {import("@fred").Context<import("@rari").SpaPage>} context
   * @returns {import("@lit").TemplateResult}
   */
  render(context) {
    return PageLayout.render(
      context,
      html`
    <div class="obs-layout obs-layout--landing">
      <div class="obs-layout__content obs-layout__content--landing">
        <section class="obs-landing-top">
          <section class="obs-landing-top__form">
            <h1>
              <span class="accent">${context.l10n("obs-title")}</span>
            </h1>
            <p>
              ${context.l10n("obs-landing-intro")}
            </p>
            <mdn-observatory-form></mdn-observatory-form>
          </section>
          <section class="obs-landing-top__illustration">
            ${landingSvg}
          </section>
        </section>
        <section class="obs-landing-about">
          <section class="obs-landing-about__content">
            <h2>${context.l10n("obs_about_title")`About the HTTP Observatory`}</h2>
            <div class="about-copy">
              <figure class="assessment">
                ${assessmentSvg}
                <figcaption>
                  <p>
                    ${context.l10n("obs-assessment")}
                  </p>
                </figcaption>
              </figure>
              ${LinesSVG({ className: "lines assessment" })}
              <figure class="scanning">
                ${scanningSvg}
                <figcaption>
                  <p>
                    ${context.l10n("obs-scanning")}
                  </p>
                </figcaption>
              </figure>
              ${LinesSVG({ className: "lines scanning" })}
              <figure class="security">
                ${securitySvg}
                <figcaption>
                  <p>
                    ${context.l10n("obs-security")}
                  </p>
                </figcaption>
              </figure>
              ${LinesSVG({ className: "lines security" })}
              <figure class="mdn">
                ${mdnSvg}
                <figcaption>
                  <p>
                    ${context.l10n("obs-mdn")}
                  </p>
                </figcaption>
              </figure>
            </div>
          </section>
          <section class="obs-landing-about__links">
            ${FAQ(context)}
            ${Feedback(context)}
          </section>
        </section>
        </section>
      </div>
    </div>
  `,
    );
  }
}

/**
 *
 * @param {{className: string}} props
 * @returns {import("@lit").TemplateResult}
 */
function LinesSVG({ className = "" }) {
  return svg`
  <svg width="75" class="${className}" role="none" height="75" viewBox="-25 0 75 75" version="1.1" id="svg1">
   <path d="M 1,0 V 35 H 48 V 75" stroke="url(#gradient)" stroke-width="2" stroke-dasharray="4, 4" fill="none"
      style="stroke-linejoin:miter;stroke-linecap:butt;stroke-width:2;stroke-dasharray:4, 3.992;stroke-dashoffset:0;stroke:url(#gradient)"
      id="path1" />
   <defs id="defs3">
      <linearGradient id="gradient" x1="25.321022" y1="0" x2="48" y2="75" gradientUnits="userSpaceOnUse">
         <stop offset="0.01046867" stop-color="#7171E1" id="stop1" />
         <stop offset="0.57600665" stop-color="#CFCFF5" id="stop2" />
         <stop offset="1" stop-color="#ECECFB" id="stop3" />
      </linearGradient>
   </defs>
</svg>`;
}
