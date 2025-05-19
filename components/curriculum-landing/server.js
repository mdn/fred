import { html, nothing, svg } from "lit";

import { unsafeHTML } from "lit/directives/unsafe-html.js";

import { Section } from "../content/server.js";
import _landingStairwaySVG1 from "../curriculum/assets/curriculum-landing-stairway-1.svg?lit";
import _landingStairwaySVG2Small from "../curriculum/assets/curriculum-landing-stairway-2-small.svg?lit";
import _landingStairwaySVG2 from "../curriculum/assets/curriculum-landing-stairway-2.svg?lit";
import landingSVG from "../curriculum/assets/curriculum-landing-top.svg?lit";
import partnerBannerDark from "../curriculum/assets/curriculum-partner-banner-illustration-large-dark.svg";
import partnerBannerLight from "../curriculum/assets/curriculum-partner-banner-illustration-large-light.svg";
import { PageLayout } from "../page-layout/server.js";
import { ServerComponent } from "../server/index.js";

const SCRIM_URL = "https://v2.scrimba.com/s06icdv?via=mdn";
const SCRIM_TITLE = "MDN + Scrimba partnership announcement scrim";

/** @enum {string} */
const Topic = {
  WebStandards: "Web Standards & Semantics",
  Styling: "Styling",
  Scripting: "Scripting",
  BestPractices: "Best Practices",
  Tooling: "Tooling",
  None: "",
};

export class CurriculumLanding extends ServerComponent {
  /**
   * @param {Fred.Context<Rari.CurriculumPage>} context
   * @returns {Lit.TemplateResult}
   */
  render(context) {
    // console.log(context);
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
      } else if (section.value.id === "modules") {
        // Render the modules and stairway sections
        content.push(this.renderModules(doc, section));
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

    return html`
      <header class="landing-header">
        <section>
          <h1>${h1}</h1>
          <h2>${h2}</h2>
          <div>${unsafeHTML(contentHtml)}</div>
        </section>
        ${landingSVG}
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
    // Path needs to be correct relative to the server rendering context
    const scrimBg = "../curriculum/assets/landing-scrim.png"; // Assuming root-relative path

    return html`
      <section id=${id} class="landing-about-container">
        <div class="landing-about">
          <h2 id=${id}>${title}</h2>
          <div class="about-content">${unsafeHTML(contentHtml)}</div>
          <div class="arrow"></div>
          <section class="scrim-wrapper">
            <div class="scrim-border">
              <mdn-scrim-inline
                url=${SCRIM_URL}
                scrimtitle=${SCRIM_TITLE}
                img=${scrimBg}
              ></mdn-scrim-inline>
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

  /**
   * Renders the Modules section, including the modules list, partner banner, and stairway.
   * @param {Rari.CurriculumDoc} doc - The curriculum document data.
   * @param {Rari.Section} section - The section object containing modules data.
   * @returns {Lit.TemplateResult} The Lit HTML template for the modules section.
   */
  renderModules(doc, section) {
    const { title, id } = section.value;
    const modules = doc?.modules;

    // console.log("modules", modules);

    // Placeholder SVGs for the stairway section.
    // The classes and IDs match the React component structure for CSS styling.
    const stairwaySvg1Placeholder = html`<svg
      aria-label="woman presenting the following text"
      role="img"
      class="stairway-svg-placeholder-1"
    ></svg>`;
    const stairwaySvg2LargePlaceholder = html`<svg
      aria-label="woman on top of a stairway with a flag"
      role="img"
      id="stairway2large"
      class="stairway-svg-placeholder-2large"
    ></svg>`;
    const stairwaySvg2SmallPlaceholder = html`<svg
      aria-label="woman on top of a stairway with a flag"
      role="img"
      id="stairway2small"
      class="stairway-svg-placeholder-2small"
    ></svg>`;

    return html`
      <section id=${id} class="modules">
        ${title && html`<h2 id=${id}><a href=${`#${id}`}>${title}</a></h2>`}
        ${this.renderModulesListList(modules)}
      </section>

      ${this.renderPartnerBanner()}

      <section class="landing-stairway">
        <div>
          <div id="stairway1-container">
            ${stairwaySvg1Placeholder}
            <p id="stairway1">
              <span id="stairway1_how_can">How can you</span>
              <span id="stairway1_boost" class="color"
                >boost your employability
              </span>
              <span id="stairway1_with">with the MDN</span>
              <span id="stairway1_cur">Curriculum?</span>
            </p>
          </div>
          <div id="stairway2-container">
            ${stairwaySvg2LargePlaceholder} ${stairwaySvg2SmallPlaceholder}
            <p id="stairway2">
              <span id="stair-1"
                >Learn about research collaboration and other essential soft
                skills.</span
              >
              <span id="stair-2"
                >Balance between modern tooling and long-term best
                practices.</span
              >
              <span id="stair-3"
                >Get access to high-quality recommended resources.</span
              >
              <span id="stair-4">Get guidance from trusted voices.</span>
            </p>
          </div>
        </div>
      </section>
    `;
  }

  /**
   * Renders the ModulesListList structure, including the tab labels and the selected modules list.
   * On the server, this defaults to rendering the 'Core modules' list (index 1) content.
   * Client-side JS would be needed to enable interactive tab switching.
   * @param {Rari.CurriculumIndexEntry[]} modules - Array of module list groups (e.g., Started, Core, Extensions).
   * @returns {Lit.TemplateResult | Lit.nothing} The Lit HTML template for the module list list, or undefined if no modules.
   */
  renderModulesListList(modules) {
    if (!modules || modules.length === 0) {
      return nothing;
    }

    return html`
      <mdn-curriculum-tabs>
        <ol class="modules-list-list">
          ${modules.map((modulesList, i) => {
            const listItemId = `modules-${i}`;
            const radioId = `module-${i}`;
            const isChecked = i === 1;

            // Recursively render children if they exist
            const nestedChildrenHtml =
              modulesList.children && modulesList.children.length > 0
                ? html`${this.renderModulesList(modulesList.children)}
                    <a
                      href=${modulesList.children[0]?.url || "#"}
                      target="_self"
                      class="lets-begin"
                    >
                      Let's begin
                    </a> `
                : nothing;

            return html`
              <li
                id=${listItemId}
                class="modules-list-list-item"
                key="mll-${i}"
              >
                <input
                  class="visually-hidden"
                  id=${radioId}
                  name="selected"
                  type="radio"
                  ${isChecked ? "checked" : ""}
                  data-index=${i}
                />
                <label for=${radioId}>
                  ${modulesList.title.replace(/ modules$/, "")}
                </label>
                ${nestedChildrenHtml}
              </li>
            `;
          })}
        </ol>
      </mdn-curriculum-tabs>
    `;
  }

  /**
   * Renders a single list of modules.
   * Corresponds to the inner ModulesList component in the React version.
   * @param {Rari.CurriculumIndexEntry[]} modules - Array of module entries within a group.
   * @returns {Lit.TemplateResult | Lit.nothing} The Lit HTML template for the module list.
   */
  renderModulesList(modules) {
    // console.log("modules", modules);
    if (!modules || modules.length === 0) {
      return nothing;
    }
    return html`
      <ol class="modules-list">
        ${modules.map(
          (module, j) => html`
            <li
              key="ml-${j}"
              class="module-list-item topic-${this._topic2css(module.topic)}"
            >
              <a href=${module.url}>
                <header>
                  ${module.topic && this.renderTopicIcon(module.topic)}
                  <span>${module.title}</span>
                </header>
                <section>
                  <p>${module.summary}</p>
                  <p>${module.topic}</p>
                </section>
              </a>
            </li>
          `,
        )}
      </ol>
    `;
  }

  /**
   * Renders the PartnerBanner structure.
   * Corresponds to the PartnerBanner component in the React version.
   * @returns {Lit.TemplateResult} The Lit HTML template for the partner banner.
   */
  renderPartnerBanner() {
    // Paths need to be correct relative to the server rendering context
    const bannerDark = partnerBannerDark;
    const bannerLight = partnerBannerLight;

    return html`
      <section class="curriculum-partner-banner-container">
        <div class="partner-banner">
          <section>
            <h2>Learn the curriculum with Scrimba and become job ready</h2>
            <p>
              <a
                href="https://scrimba.com/learn/frontend?via=mdn"
                target="_blank"
                rel="origin noreferrer"
                class="external"
              >
                Scrimba's Frontend Developer Career Path
              </a>
              teaches the MDN Curriculum Core with fun interactive lessons and
              challenges, knowledgeable teachers, and a supportive community. Go
              from zero to landing your first front-end job!
            </p>
            <a
              href="https://scrimba.com/learn/frontend?via=mdn"
              target="_blank"
              rel="origin noreferrer"
              class="external"
            >
              Find out more
            </a>
          </section>

          <mdn-themed-image
            src-light=${bannerLight}
            src-dark=${bannerDark}
            alt="MDN partner illustration"
          >
            <img src=${bannerLight} alt="MDN partner illustration" />
          </mdn-themed-image>
        </div>
      </section>
    `;
  }

  /**
   * Renders a placeholder SVG structure for the TopicIcon.
   * In a real server-rendering setup, the SVG content would ideally be embedded or referenced correctly.
   * This placeholder includes basic circle and path elements styled by CSS.
   * @param {string} topic - The topic string.
   * @returns {Lit.TemplateResult} The Lit HTML template for the topic icon SVG.
   */
  renderTopicIcon(topic) {
    const className = `topic-icon ${this._topic2css(topic)}`;
    // Simplified placeholder SVG content, using currentColor for fill where CSS vars apply.
    let svgContent = svg``;
    switch (topic) {
      case "Web Standards & Semantics":
        svgContent = svg`<circle
            cx="32"
            cy="32"
            r="30"
            fill="currentColor"
          /><path d="M16 32L32 48L48 32L32 16L16 32Z" fill="white" />`;
        break;
      case "Styling":
        svgContent = svg`<circle
            cx="32"
            cy="32"
            r="30"
            fill="currentColor"
          /><path d="M16 32L32 48L48 32L32 16L16 32Z" fill="white" />`;
        break;
      case "Scripting":
        svgContent = svg`<circle
            cx="32"
            cy="32"
            r="30"
            fill="currentColor"
          /><path d="M16 32L32 48L48 32L32 16L16 32Z" fill="white" />`;
        break;
      case "Tooling":
        svgContent = svg`<circle
            cx="32"
            cy="32"
            r="30"
            fill="currentColor"
          /><path d="M16 32L32 48L48 32L32 16L16 32Z" fill="white" />`;
        break;
      case "Best Practices":
        svgContent = svg`<circle
            cx="32"
            cy="32"
            r="30"
            fill="currentColor"
          /><path d="M16 32L32 48L48 32L32 16L16 32Z" fill="white" />`;
        break;
      default:
        return svg``; // Render nothing for unknown topics
    }

    return html`
      <svg role="none" class=${className} viewBox="0 0 64 64">
        ${svgContent}
      </svg>
    `;
  }

  /**
   * Maps a topic enum value to a CSS class string.
   * @param {Topic | undefined} topic
   * @returns {string} The corresponding CSS class name.
   */
  _topic2css(topic) {
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
}
