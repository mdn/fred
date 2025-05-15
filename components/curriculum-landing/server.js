import { html } from "lit";

import { unsafeHTML } from "lit/directives/unsafe-html.js";

import { Section } from "../content/server.js";
import { PageLayout } from "../page-layout/server.js";
import { ServerComponent } from "../server/index.js";

const SCRIM_URL = "https://v2.scrimba.com/s06icdv?via=mdn";

/** @enum {string} */
const Topic = {
  WebStandards: "Web Standards & Semantics",
  Styling: "Styling",
  Scripting: "Scripting",
  BestPractices: "Best Practices",
  Tooling: "Tooling",
  None: "",
};

/**
 * Maps a topic enum value to a CSS class string.
 * @param {Topic | undefined} topic
 * @returns {string} The corresponding CSS class name.
 */
function _topic2css(topic) {
  switch (topic) {
    case Topic.WebStandards:
      return "standards";
    case Topic.Styling:
      return "styling";
    case Topic.Scripting:
      return "scripting";
    case Topic.Tooling:
      return "tooling";
    case Topic.BestPractices:
      return "practices";
    default:
      return "none";
  }
}

export class CurriculumLanding extends ServerComponent {
  /**
   * @param {Fred.Context<Rari.CurriculumPage>} context
   * @returns {Lit.TemplateResult}
   */
  render(context) {
    console.log(context);
    const doc = context.doc;

    /** @type {Lit.TemplateResult[]} */
    const content = [];

    for (const [i, section] of doc.body.entries()) {
      if (i === 0) {
        // Render the header section
        content.push(this.renderHeader(doc, section));
      } else if (section.value.id === "about_the_curriculum") {
        // Render the about section
        content.push(this.renderAbout(doc, section));
        // } else if (section.value.id === "modules") {
        //   // Render the modules and stairway sections
        //   content.push(this.renderModules(doc, section));
      } else {
        // Use the default Section renderer for other sections
        content.push(Section(context, section));
      }
    }

    return PageLayout.render(
      context,
      html`
        <main
          id="content"
          class="curriculum-content-container container curriculum-landing"
        >
          <article id="content" class="curriculum-content" lang=${doc.locale}>
            ${content}
          </article>
        </main>
      `,
    );
  }

  /**
   * @param {Rari.CurriculumDoc} doc - The curriculum document data.
   * @param {Rari.Section} section - The section object containing header data.
   * @returns {Lit.TemplateResult} The Lit HTML template for the header.
   */
  renderHeader(doc, section) {
    const h1 = doc?.title;
    const h2 = section.value.title;
    // section.value.content is already the HTML content
    const contentHtml = section.value.content;

    // Placeholder for LandingSVG. In a real implementation, this would embed the SVG content.
    // The classes are added to match the CSS styling.
    const landingSvgPlaceholder = html`<svg
      aria-label="woman in chair"
      role="img"
      class="landing-svg-placeholder"
    ></svg>`;

    return html`
      <header class="landing-header">
        <section>
          <h1>${h1}</h1>
          <h2>${h2}</h2>
          <div>${unsafeHTML(contentHtml)}</div>
        </section>
        ${landingSvgPlaceholder}
      </header>
    `;
  }

  /**
   * Renders the About the Curriculum section.
   * @param {Rari.CurriculumDoc} _doc - The curriculum document data.
   * @param {Rari.Section} section - The section object containing about data.
   * @returns {Lit.TemplateResult} The Lit HTML template for the about section.
   */
  renderAbout(_doc, section) {
    const { title, content, id } = section.value;
    // content is already the HTML content
    const contentHtml = content;
    const scrimTitle = "MDN + Scrimba partnership announcement scrim";
    // Path needs to be correct relative to the server rendering context
    const scrimBg = "./assets/landing-scrim.png"; // Assuming root-relative path

    return html`
      <section id=${id} class="landing-about-container">
        <div class="landing-about">
          <h2 id=${id}>${title}</h2>
          <div class="about-content" .innerHTML=${contentHtml}></div>
          <div class="arrow"></div>
          <section class="scrim-wrapper">
            <div class="scrim-border">
              <!-- Static placeholder for client-side ScrimInline component -->
              <!-- Attributes are added so client-side JS can initialize the custom element -->
              <div
                class="scrim-inline-placeholder"
                data-url=${SCRIM_URL}
                data-img=${scrimBg}
                data-scrim-title=${scrimTitle}
              >
                <!-- Optional static image fallback -->
                <img
                  src=${scrimBg}
                  alt=${scrimTitle}
                  style="display: block; width: 100%; height: auto;"
                />
              </div>
            </div>
            <p>
              Learn our curriculum with Scrimba's interactive
              <a
                href="https://scrimba.com/learn/frontend?via=mdn"
                class="external"
                target="_blank"
                rel="noreferrer"
              >
                Frontend Developer Career Path
              </a>
              .
            </p>
          </section>
        </div>
      </section>
    `;
  }
}
