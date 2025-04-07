import { html } from "lit";

import assessmentSvg from "../assets/assessment.svg?lit";
import landingSvg from "../assets/landing-illustration.svg?lit";
import linesSvg from "../assets/lines.svg?lit";
import mdnSvg from "../assets/mdn.svg?lit";
import scanningSvg from "../assets/scanning.svg?lit";
import securitySvg from "../assets/security.svg?lit";
import { OBSERVATORY_TITLE } from "../constants.js";
import { FAQ } from "../faq.js";
import { Feedback } from "../feedback.js";

import "./form.js";

/**
 * @param {Fred.Context<Rari.SpaPage>} context
 * @returns {Lit.TemplateResult}
 */
export function Landing(context) {
  return html`
    <section class="header">
      <section class="scan-form">
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
      <section class="landing-illustration">
        ${landingSvg}
      </section>
    </section>
    <section class="main">
      <section class="about">
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
          ${linesSvg}
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
          ${linesSvg}
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
          ${linesSvg}
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
      ${FAQ(context)}
      ${Feedback(context)}
    </section>
  </section>`;
}
