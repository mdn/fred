import { html, svg } from "lit";

import assessmentSvg from "../assets/assessment.svg?lit";
import landingSvg from "../assets/landing-illustration.svg?lit";
import mdnSvg from "../assets/mdn.svg?lit";
import scanningSvg from "../assets/scanning.svg?lit";
import securitySvg from "../assets/security.svg?lit";
import { OBSERVATORY_TITLE } from "../constants.js";
import { FAQ } from "../faq.js";
import { Feedback } from "../feedback.js";

import "./form.js";
import "../index.css";

/**
 * @param {Fred.Context<Rari.SpaPage>} context
 * @returns {Lit.TemplateResult}
 */
export function Landing(context) {
  return html`
    <section class="obs-landing-top">
      <section class="obs-landing-top__form">
        <h1>
          <span class="accent">${OBSERVATORY_TITLE}</span>
        </h1>
        <p>
          Launched in 2016, the HTTP Observatory enhances web security by
          analyzing compliance with best security practices. It has provided
          insights to over 6.9 million websites through 47 million scans.
        </p>
        <mdn-observatory-form></mdn-observatory-form>
      </section>
      <section class="obs-landing-top__illustration">
        ${landingSvg}
      </section>
    </section>
    <section class="obs-landing-about">
      <section class="obs-landing-about__content">
        <h2>About the HTTP Observatory</h2>
        <div class="about-copy">
          <figure class="assessment">
            ${assessmentSvg}
            <figcaption>
              <p>
                Developed by Mozilla, the HTTP Observatory performs an in-depth
                assessment of a site’s HTTP headers and other key security
                configurations.
              </p>
            </figcaption>
          </figure>
          <!-- lines-svg class="lines assessment" role="none"></lines-svg -->
          ${LinesSVG({ className: "lines assessment" })}
          <figure class="scanning">
            ${scanningSvg}
            <figcaption>
              <p>
                Its automated scanning process provides developers and website
                administrators with detailed, actionable feedback, focusing on
                identifying and addressing potential security vulnerabilities.
              </p>
            </figcaption>
          </figure>
          <!-- lines-svg class="lines scanning" role="none"></lines-svg -->
          ${LinesSVG({ className: "lines scanning" })}
          <figure class="security">
            ${securitySvg}
            <figcaption>
              <p>
                The tool is instrumental in helping developers and website
                administrators strengthen their sites against common security
                threats in a constantly advancing digital environment.
              </p>
            </figcaption>
          </figure>
          <!-- lines-svg class="lines security" role="none"></lines-svg -->
          ${LinesSVG({ className: "lines security" })}
          <figure class="mdn">
            ${mdnSvg}
            <figcaption>
              <p>
                The HTTP Observatory provides effective security insights,
                guided by Mozilla's expertise and commitment to a safer and more
                secure internet and based on well-established trends and
                guidelines.
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
  </section>`;
}

/**
 *
 * @param {{className: string}} props
 * @returns {Lit.TemplateResult}
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
