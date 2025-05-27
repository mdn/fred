import { html, nothing } from "lit";

import { ifDefined } from "lit/directives/if-defined.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

import landingStairwaySVG1 from "../curriculum/assets/curriculum-landing-stairway-1.svg?lit";
import landingStairwaySVG2Small from "../curriculum/assets/curriculum-landing-stairway-2-small.svg?lit";
import landingStairwaySVG2 from "../curriculum/assets/curriculum-landing-stairway-2.svg?lit";
import landingSVG from "../curriculum/assets/curriculum-landing-top.svg?lit";
import partnerBannerDark from "../curriculum/assets/curriculum-partner-banner-illustration-large-dark.svg";
import partnerBannerLight from "../curriculum/assets/curriculum-partner-banner-illustration-large-light.svg";
import practicesSVG from "../curriculum/assets/curriculum-topic-practices.svg?lit";
import scriptingSVG from "../curriculum/assets/curriculum-topic-scripting.svg?lit";
import standardsSVG from "../curriculum/assets/curriculum-topic-standards.svg?lit";
import stylingSVG from "../curriculum/assets/curriculum-topic-styling.svg?lit";
import toolingSVG from "../curriculum/assets/curriculum-topic-tooling.svg?lit";
import scrimBg from "../curriculum/assets/landing-scrim.png?url";
import { HeadingAnchor } from "../heading-anchor/server.js";
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
   * @param {import("@fred").Context<import("@rari").CurriculumPage>} context
   * @returns {import("@lit").TemplateResult}
   */
  render(context) {
    const doc = context.doc;

    /** @type {(import("@lit").TemplateResult | nothing)[]} */
    const content = [];
    for (const [i, section] of doc.body.entries()) {
      if (i === 0) {
        // Render the header section
        content.push(this.renderHeader(context, section));
      } else if (section.value.id === "about_the_curriculum") {
        // Render the about section
        content.push(this.renderAbout(context, section));
      } else if (section.value.id === "modules") {
        // Render the modules and stairway sections
        content.push(this.renderModules(context, section));
      } else {
        // Use the default Section renderer for other sections
        content.push(this.renderSection(context, section));
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
   * @param {import("@fred").Context<import("@rari").CurriculumPage>} context
   * @param {import("@rari").Section} section - The section object containing header data.
   * @returns {import("@lit").TemplateResult} The Lit HTML template for the header.
   */
  renderHeader(context, section) {
    const doc = context.doc;
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
   * @param {import("@fred").Context<import("@rari").CurriculumPage>} _context
   * @param {import("@rari").Section} section - The section object containing about data.
   * @returns {import("@lit").TemplateResult | nothing} The Lit HTML template for the about section.
   */
  renderSection(_context, section) {
    const { id, title, content, isH3 } = section.value;
    switch (section.type) {
      case "browser_compatibility": {
        return nothing;
      }
      case "specifications": {
        return nothing;
      }
      default: {
        const level = isH3 ? 3 : 2;
        return html`
          <section aria-labelledby=${ifDefined(id ?? undefined)}>
            ${HeadingAnchor.render(
              level,
              id ? String(id) : null,
              String(title),
            )}
            <div class="section-content">${unsafeHTML(content)}</div>
          </section>
        `;
      }
    }
  }

  /**
   * Renders the About the Curriculum section.
   * @param {import("@fred").Context<import("@rari").CurriculumPage>} _context
   * @param {import("@rari").Section} section - The section object containing about data.
   * @returns {import("@lit").TemplateResult} The Lit HTML template for the about section.
   */
  renderAbout(_context, section) {
    const { title, content, id } = section.value;
    // content is already the HTML content
    const contentHtml = content;
    // Path needs to be correct relative to the server rendering context
    // const scrimBg = "../curriculum/assets/landing-scrim.png"; // Assuming root-relative path

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
   * @param {import("@fred").Context<import("@rari").CurriculumPage>} context
   * @param {import("@rari").Section} section - The section object containing modules data.
   * @returns {import("@lit").TemplateResult} The Lit HTML template for the modules section.
   */
  renderModules(context, section) {
    const doc = context.doc;
    const { title, id } = section.value;
    const modules = doc?.modules;

    return html`
      <section id=${id} class="modules">
        ${title && html`<h2 id=${id}><a href=${`#${id}`}>${title}</a></h2>`}
        ${this.renderModulesListList(context, modules)}
      </section>

      ${this.renderPartnerBanner(context)}

      <section class="landing-stairway">
        <div>
          <div id="stairway1-container">
            ${landingStairwaySVG1}
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
            ${addAttrs(landingStairwaySVG2, { id: "stairway2large" })}
            ${addAttrs(landingStairwaySVG2Small, { id: "stairway2small" })}
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
   * @param {import("@fred").Context<import("@rari").CurriculumPage>} context
   * @param {import("@rari").CurriculumIndexEntry[]} modules - Array of module list groups (e.g., Started, Core, Extensions).
   * @returns {import("@lit").TemplateResult | import("@lit").nothing} The Lit HTML template for the module list list, or undefined if no modules.
   */
  renderModulesListList(context, modules) {
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
                ? html`${this.renderModulesList(context, modulesList.children)}
                    <a
                      href=${modulesList.children[0]?.url || "#"}
                      target="_self"
                      class="button lets-begin"
                      data-variant="primary"
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
                  ?checked=${isChecked}
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
   * @param {import("@fred").Context<import("@rari").CurriculumPage>} context
   * @param {import("@rari").CurriculumIndexEntry[]} modules - Array of module entries within a group.
   * @returns {import("@lit").TemplateResult | import("@lit").nothing} The Lit HTML template for the module list.
   */
  renderModulesList(context, modules) {
    if (!modules || modules.length === 0) {
      return nothing;
    }
    return html`
      <ol class="modules-list">
        ${modules.map(
          (module, j) => html`
            <li
              key="ml-${j}"
              class="module-list-item topic-${this.topic2css(module.topic)}"
            >
              <a href=${module.url}>
                <header>
                  ${module.topic
                    ? this.renderTopicIcon(context, module.topic)
                    : nothing}
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
   * @param {import("@fred").Context<import("@rari").CurriculumPage>} _context
   * @returns {import("@lit").TemplateResult} The Lit HTML template for the partner banner.
   */
  renderPartnerBanner(_context) {
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
   * @param {import("@fred").Context<import("@rari").CurriculumPage>} _context
   * @param {string} topic - The topic string.
   * @returns {import("@lit").TemplateResult | nothing} The Lit HTML template for the topic icon SVG.
   */
  renderTopicIcon(_context, topic) {
    const className = `topic-icon topic-${this.topic2css(topic)}`;
    // Simplified placeholder SVG content, using currentColor for fill where CSS vars apply.
    switch (topic) {
      case "Web Standards & Semantics":
        return addAttrs(standardsSVG, {
          role: "none",
          class: className,
        });
      case "Styling":
        return addAttrs(stylingSVG, {
          role: "none",
          class: className,
        });
      case "Scripting":
        return addAttrs(scriptingSVG, {
          role: "none",
          class: className,
        });
      case "Tooling":
        return addAttrs(toolingSVG, {
          role: "none",
          class: className,
        });
      case "Best Practices":
        return addAttrs(practicesSVG, {
          role: "none",
          class: className,
        });
      default:
        return nothing;
    }
  }

  /**
   * Maps a topic enum value to a CSS class string.
   * @param {Topic | undefined} topic
   * @returns {string} The corresponding CSS class name.
   */
  topic2css(topic) {
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

/**
 *
 * @param {import("@lit").SVGTemplateResult} original
 * @param {{[key: string]: string}} attrs
 * @returns {import("@lit").SVGTemplateResult}
 */

function addAttrs(original, attrs) {
  // turn { role: 'img', 'aria-label': 'Foo' } into: role="img" aria-label="Foo"
  const attrString = Object.entries(attrs)
    .map(([k, v]) => `${k}="${v}"`)
    .join(" ");
  const [head, ...restStrings] = original.strings;
  if (!head) {
    return original;
  }
  const newHead = head.replace(/<svg([\s\S]*?)>/, `<svg$1 ${attrString}>`);
  const newStrings = [newHead, ...restStrings];
  // @ts-expect-error
  newStrings.raw = [newHead, ...restStrings];
  // @ts-expect-error
  original.strings = newStrings;
  return original;
}
