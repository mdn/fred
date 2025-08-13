import { html, svg } from "lit";

import { Button } from "../button/server.js";
import feedbackIcon from "../icon/circle-alert.svg?lit";
import faqIcon from "../icon/circle-help.svg?lit";
import assessmentSvg from "../observatory/assets/assessment.svg?lit";
import landingSvg from "../observatory/assets/landing-illustration.svg?lit";
import mdnSvg from "../observatory/assets/mdn.svg?lit";
import scanningSvg from "../observatory/assets/scanning.svg?lit";
import securitySvg from "../observatory/assets/security.svg?lit";

import { PageLayout } from "../page-layout/server.js";

import { ServerComponent } from "../server/index.js";

export class ObservatoryLanding extends ServerComponent {
  /**
   * @param {import("@fred").Context<import("@rari").SPAPage>} context
   * @returns {import("@lit").TemplateResult}
   */
  render(context) {
    return PageLayout.render(
      context,
      html`
        <main id="content" class="observatory">
          <section class="observatory-top">
            <div class="observatory-top__form">
              <h1 class="observatory-top-form__title">
                ${context.l10n("obs-title")}
              </h1>
              <p class="observatory-top-form__description">
                ${context.l10n("obs-landing-intro")}
              </p>
              <mdn-observatory-form
                class="observatory-top-form__form"
              ></mdn-observatory-form>
            </div>
            <section class="observatory-top__illustration">
              ${landingSvg}
            </section>
          </section>
          <section class="observatory-about-wrapper">
            <div class="observatory-about">
              <h2 class="observatory-about__title">
                ${context.l10n("obs-about-title")`About the HTTP Observatory`}
              </h2>
              <div class="observatory-about__content">
                <figure class="assessment">
                  ${assessmentSvg}
                  <figcaption>
                    <p>${context.l10n("obs-assessment")}</p>
                  </figcaption>
                </figure>
                ${LinesSVG({ className: "lines assessment" })}
                <figure class="scanning">
                  ${scanningSvg}
                  <figcaption>
                    <p>${context.l10n("obs-scanning")}</p>
                  </figcaption>
                </figure>
                ${LinesSVG({ className: "lines scanning" })}
                <figure class="security">
                  ${securitySvg}
                  <figcaption>
                    <p>${context.l10n("obs-security")}</p>
                  </figcaption>
                </figure>
                ${LinesSVG({ className: "lines security" })}
                <figure class="mdn">
                  ${mdnSvg}
                  <figcaption>
                    <p>${context.l10n("obs-mdn")}</p>
                  </figcaption>
                </figure>
              </div>
              <aside class="observatory-about__links">
                ${Button.render(context, {
                  label: context.l10n`Read our FAQ`,
                  variant: "plain",
                  icon: faqIcon,
                  rel: "noopener",
                  target: "_blank",
                  href: "/en-US/observatory/docs/faq",
                })}
                ${Button.render(context, {
                  label: context.l10n`Report Feedback`,
                  variant: "plain",
                  icon: feedbackIcon,
                  rel: "noopener",
                  target: "_blank",
                  href: "https://survey.alchemer.com/s3/7897385/MDN-HTTP-Observatory",
                })}
              </aside>
            </div>
            <section class="observatory-sidebar">
              <mdn-placement-sidebar></mdn-placement-sidebar>
            </section>
          </section>
        </main>
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
  <svg width="75" class="${className}" height="75" viewBox="-25 0 75 75" version="1.1" role="presentation">
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
