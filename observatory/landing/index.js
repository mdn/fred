import { html } from "lit-html";
import "./form.js";
import { OBSERVATORY_TITLE } from "../constants.js";
import { Feedback } from "../feedback.js";
import { Faq } from "../faq.js";

/**
 * @typedef {import("@mdn/rari").SPAPage} SPAPage
 * @typedef {import("lit-html").TemplateResult} TemplateResult
 */

/**
 * @param {Fred.Context<Rari.SPAPage>} context
 * @returns {TemplateResult}
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
        <landing-svg></landing-svg>
      </section>
    </section>
    <section class="main">
      <section class="about">
        <h2>About the HTTP Observatory</h2>
        <div class="about-copy">
          <figure class="assessment">
            <asessment-svg role="none"></asessment-svg>
            <figcaption>
              <p>
                Developed by Mozilla, the HTTP Observatory performs an in-depth
                assessment of a site’s HTTP headers and other key security
                configurations.
              </p>
            </figcaption>
          </figure>
          <lines-svg class="lines assessment" role="none"></lines-svg>
          <figure class="scanning">
            <scannig-svg role="none"></scannig-svg>
            <figcaption>
              <p>
                Its automated scanning process provides developers and website
                administrators with detailed, actionable feedback, focusing on
                identifying and addressing potential security vulnerabilities.
              </p>
            </figcaption>
          </figure>
          <lines-svg class="lines scanning" role="none"></lines-svg>
          <figure class="security">
            <security-svg role="none"></security-svg >
            <figcaption>
              <p>
                The tool is instrumental in helping developers and website
                administrators strengthen their sites against common security
                threats in a constantly advancing digital environment.
              </p>
            </figcaption>
          </figure>
          <lines-svg class="lines security" role="none"></lines-svg>
          <figure class="mdn">
            <mdn-svg role="none"></mdn-svg>
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
      ${Faq(context)}
      ${Feedback(context)}
    </section>
  </section>`;
}
