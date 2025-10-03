import { html } from "@lit-labs/ssr";

import { ifDefined } from "lit/directives/if-defined.js";

import { ServerComponent } from "../server/index.js";

import { MISSING_DOCS } from "./constants.js";

export class Menu extends ServerComponent {
  /**
   * @param {import("@fred").Context} context
   */
  render(context) {
    /**
     * Holds the id of the tab being rendered.
     *
     * @type {string|null}
     */
    let currentTab = null;

    /**
     * Generates a Glean ID for menu/submenu links.
     *
     * @param {string} href - The href of the link.
     * @param {object} [options]
     * @param {boolean} [options.primary] - Whether this is the primary link (in the panel title).
     * @returns {string} the Glean ID.
     */
    const gleanId = (href, { primary = false } = {}) =>
      `${primary ? "menu_click_menu" : "menu_click_submenu"}: ${currentTab ?? "?"} -> ${href}`;

    /**
     * Renders a link to a page.
     *
     * @param {string} slug - The link slug (the part after `/en-US/docs/`!).
     * @param {string} text - The link text.
     * @param {object} [options]
     * @param {string} [options.label] - The title and aria-label of the link.
     * @param {boolean} [options.primary] - Whether this is the primary link (in the panel title).
     */
    const link =
      (slug, text, { label, primary = false } = {}) =>
      () => {
        const locale =
          context.locale in MISSING_DOCS &&
          MISSING_DOCS[context.locale]?.includes(slug)
            ? "en-US"
            : context.locale;

        const href = `/${locale}/docs/${slug}`;

        return html`<a
          class=${ifDefined(
            locale === context.locale ? undefined : "only-in-en-us",
          )}
          href=${href}
          aria-label=${ifDefined(label)}
          title=${ifDefined(label)}
          data-glean-id=${gleanId(href, { primary })}
          >${text}</a
        >`;
      };

    const tabs = [
      {
        id: "html",
        buttonText: "HTML",
        panelTitle: {
          slug: "Web/HTML",
          text: "HTML: Markup language",
        },
        panelGroups: [
          {
            title: "HTML reference",
            items: [
              link("Web/HTML/Reference/Elements", "Elements"),
              link("Web/HTML/Reference/Global_attributes", "Global attributes"),
              link("Web/HTML/Reference/Attributes", "Attributes"),
              link("Web/HTML/Reference", "See all…", {
                label: "See all HTML references",
              }),
            ],
          },
          {
            title: "HTML guides",
            items: [
              link("Web/HTML/Guides/Responsive_images", "Responsive images"),
              link("Web/HTML/Guides/Cheatsheet", "HTML cheatsheet"),
              link(
                "Web/HTML/Guides/Date_and_time_formats",
                "Date & time formats",
              ),
              link("Web/HTML/Guides", "See all…", {
                label: "See all HTML guides",
              }),
            ],
          },
          {
            title: "Markup languages",
            items: [
              link("Web/SVG", "SVG"),
              link("Web/MathML", "MathML"),
              link("Web/XML", "XML"),
            ],
          },
        ],
      },
      {
        id: "css",
        buttonText: "CSS",
        panelTitle: {
          slug: "Web/CSS",
          text: "CSS: Styling language",
        },
        panelGroups: [
          {
            title: "CSS reference",
            items: [
              link("Web/CSS/Properties", "Properties"),
              link("Web/CSS/CSS_selectors", "Selectors"),
              link("Web/CSS/CSS_syntax/At-rule", "At-rules"),
              link("Web/CSS/CSS_values_and_units", "Values & units"),
              link("Web/CSS/Reference", "See all…", {
                label: "See all CSS references",
              }),
            ],
          },
          {
            title: "CSS guides",
            items: [
              link(
                "Web/CSS/CSS_box_model/Introduction_to_the_CSS_box_model",
                "Box model",
              ),
              link("Web/CSS/CSS_animations/Using_CSS_animations", "Animations"),
              link(
                "Web/CSS/CSS_flexible_box_layout/Basic_concepts_of_flexbox",
                "Flexbox",
              ),
              link("Web/CSS/CSS_colors", "Colors"),
              link("Web/CSS/Guides", "See all…", {
                label: "See all CSS guides",
              }),
            ],
          },
          {
            title: "Layout cookbook",
            items: [
              link("Web/CSS/Layout_cookbook/Column_layouts", "Column layouts"),
              link(
                "Web/CSS/Layout_cookbook/Center_an_element",
                "Centering an element",
              ),
              link("Web/CSS/Layout_cookbook/Card", "Card component"),
              link("Web/CSS/Layout_cookbook", "See all…"),
            ],
          },
        ],
      },
      {
        id: "javascript",
        buttonText: {
          long: "JavaScript",
          short: "JS",
        },
        panelTitle: {
          slug: "Web/JavaScript",
          text: "JavaScript: Scripting language",
        },
        panelGroups: [
          {
            title: "JS reference",
            items: [
              link(
                "Web/JavaScript/Reference/Global_Objects",
                "Standard built-in objects",
              ),
              link(
                "Web/JavaScript/Reference/Operators",
                "Expressions & operators",
              ),
              link(
                "Web/JavaScript/Reference/Statements",
                "Statements & declarations",
              ),
              link("Web/JavaScript/Reference/Functions", "Functions"),
              link("Web/JavaScript/Reference", "See all…", {
                label: "See all JavaScript references",
              }),
            ],
          },
          {
            title: "JS guides",
            items: [
              link(
                "Web/JavaScript/Guide/Control_flow_and_error_handling",
                "Control flow & error handing",
              ),
              link(
                "Web/JavaScript/Guide/Loops_and_iteration",
                "Loops and iteration",
              ),
              link(
                "Web/JavaScript/Guide/Working_with_objects",
                "Working with objects",
              ),
              link("Web/JavaScript/Guide/Using_classes", "Using classes"),
              link("Web/JavaScript/Guide", "See all…", {
                label: "See all JavaScript guides",
              }),
            ],
          },
        ],
      },
      {
        id: "webapis",
        buttonText: "Web APIs",
        panelTitle: {
          slug: "Web/API",
          text: "Web APIs: Programming interfaces",
        },
        panelGroups: [
          {
            title: "Web API reference",
            items: [
              link("Web/API/File_System_API", "File system API"),
              link("Web/API/Fetch_API", "Fetch API"),
              link("Web/API/Geolocation_API", "Geolocation API"),
              link("Web/API/HTML_DOM_API", "HTML DOM API"),
              link("Web/API/Push_API", "Push API"),
              link("Web/API/Service_Worker_API", "Service worker API"),
              link("Web/API", "See all…", {
                label: "See all Web API guides",
              }),
            ],
          },
          {
            title: "Web API guides",
            items: [
              link(
                "Web/API/Web_Animations_API/Using_the_Web_Animations_API",
                "Using the Web animation API",
              ),
              link("Web/API/Fetch_API/Using_Fetch", "Using the Fetch API"),
              link(
                "Web/API/History_API/Working_with_the_History_API",
                "Working with the History API",
              ),
              link(
                "Web/API/Web_Speech_API/Using_the_Web_Speech_API",
                "Using the Web speech API",
              ),
              link(
                "Web/API/Web_Workers_API/Using_web_workers",
                "Using web workers",
              ),
            ],
          },
        ],
      },
      {
        id: "all",
        buttonText: "All",
        panelTitle: {
          slug: "Web",
          text: "All web technology",
        },
        panelGroups: [
          {
            title: "Technologies",
            items: [
              link("Web/Accessibility", "Accessibility"),
              link("Web/HTTP", "HTTP"),
              link("Web/URI", "URI"),
              link("Mozilla/Add-ons/WebExtensions", "Web extensions"),
              link("WebAssembly", "WebAssembly"),
              link("Web/WebDriver", "WebDriver"),
              link("Web", "See all…", {
                label: "See all web technology references",
              }),
            ],
          },
          {
            title: "Topics",
            items: [
              link("Web/Media", "Media"),
              link("Web/API/Performance", "Performance"),
              link("Web/Privacy", "Privacy"),
              link("Web/Security", "Security"),
              link("Web/Progressive_web_apps", "Progressive web apps"),
            ],
          },
        ],
      },
      {
        id: "learn",
        buttonText: "Learn",
        panelTitle: {
          slug: "Learn_web_development",
          text: "Learn web development",
        },
        panelGroups: [
          {
            title: "Frontend developer course",
            items: [
              link("Learn_web_development/Getting_started", "Getting started"),
              link("Learn_web_development/Howto", "Common questions"),
              () =>
                html`<a
                  class=${ifDefined(
                    context.locale === "en-US" ? undefined : "only-in-en-us",
                  )}
                  href="/en-US/curriculum/"
                  data-glean-id=${gleanId("/en-US/curriculum/")}
                  >Curriculum</a
                >`,
            ],
          },
          {
            title: "Learn HTML",
            items: [
              link(
                "Learn_web_development/Core/Structuring_content",
                "Introduction to HTML",
              ),
              link(
                "Learn_web_development/Core/Structuring_content/Basic_HTML_syntax",
                "Getting started with HTML",
              ),
            ],
          },
          {
            title: "Learn CSS",
            items: [
              link(
                "Learn_web_development/Core/Styling_basics/What_is_CSS",
                "What is CSS",
              ),
              link(
                "Learn_web_development/Core/Styling_basics/Getting_started",
                "Getting started with CSS",
              ),
            ],
          },
          {
            title: "Learn JavaScript",
            items: [
              link(
                "Web/HTML/How_to/Use_data_attributes",
                "How to use data attributes",
              ),
              link(
                "Web/HTML/How_to/Add_JavaScript_to_your_web_page",
                "Add JavaScript to your web page",
              ),
            ],
          },
        ],
      },
      {
        id: "tools",
        buttonText: "Tools",
        panelTitle: {
          text: "Discover our tools",
        },
        panelGroups: [
          {
            items: [
              () =>
                html`<a
                  class="menu__panel-icon"
                  data-icon="circle-play"
                  href=${`/en-US/play`}
                  data-glean-id=${gleanId("/en-US/play/")}
                >
                  Playground
                </a>`,
              () =>
                html`<a
                  class="menu__panel-icon"
                  data-icon="shield-check"
                  href=${`/en-US/observatory`}
                  data-glean-id=${gleanId("/en-US/observatory/")}
                >
                  HTTP Observatory
                </a>`,
            ],
          },
          {
            items: [
              link(
                "Web/CSS/CSS_backgrounds_and_borders/Border-image_generator",
                "Border-image generator",
              ),
              link(
                "Web/CSS/CSS_backgrounds_and_borders/Border-radius_generator",
                "Border-radius generator",
              ),
              link(
                "Web/CSS/CSS_backgrounds_and_borders/Box-shadow_generator",
                "Box-shadow generator",
              ),
              link(
                "Web/CSS/CSS_colors/Color_format_converter",
                "Color format converter",
              ),
              link("Web/CSS/CSS_colors/Color_mixer", "Color mixer"),
              link("Web/CSS/CSS_shapes/Shape_generator", "Shape generator"),
            ],
          },
        ],
      },
      {
        id: "about",
        buttonText: "About",
        panelTitle: {
          text: "Get to know MDN better",
        },
        panelGroups: [
          {
            items: [
              () =>
                html`<a
                  class="menu__panel-icon"
                  data-icon="mdn-m"
                  href=${`/en-US/about`}
                  data-glean-id=${gleanId("/en-US/about")}
                >
                  About MDN
                </a>`,
              () =>
                html`<a
                  class="menu__panel-icon"
                  data-icon="chart-no-axes-combined"
                  href=${`/en-US/advertising`}
                  data-glean-id=${gleanId("/en-US/advertising")}
                >
                  Advertise with us
                </a>`,
            ],
          },
          {
            items: [
              () =>
                html`<a
                  class="menu__panel-icon"
                  data-icon="users"
                  href=${`/en-US/community`}
                  data-glean-id=${gleanId("/en-US/community")}
                >
                  Community
                </a>`,
              () =>
                html`<a
                  class="menu__panel-icon"
                  data-icon="github"
                  href="https://github.com/mdn"
                  data-glean-id=${gleanId("https://github.com/mdn")}
                >
                  MDN on GitHub
                </a>`,
            ],
          },
        ],
      },
      {
        id: "blog",
        render: () =>
          html`<a
            class="menu__tab-link"
            href=${`/en-US/blog/`}
            data-glean-id=${`menu_click_link: top-level -> /en-US/blog/`}
            >Blog</a
          >`,
      },
    ];

    return html`
      <nav class="menu">
        ${tabs.map((tab) => {
          currentTab = tab.id;
          const result = html`<div class="menu__tab" data-section=${tab.id}>
            ${typeof tab.render == "function"
              ? tab.render()
              : html`<mdn-dropdown>
                  <button class="menu__tab-button" type="button" slot="button">
                    ${typeof tab.buttonText === "string"
                      ? html`<span class="menu__tab-label"
                          >${tab.buttonText}</span
                        >`
                      : html`<span class="menu__tab-label" data-type="long"
                            >${tab.buttonText.long}</span
                          ><span class="menu__tab-label" data-type="short"
                            >${tab.buttonText.short}</span
                          >`}
                  </button>
                  <div class="menu__panel" slot="dropdown">
                    <p class="menu__panel-title">
                      ${tab.panelTitle.slug
                        ? link(tab.panelTitle.slug, tab.panelTitle.text, {
                            primary: true,
                          })()
                        : tab.panelTitle.text}
                    </p>
                    <div class="menu__panel-content">
                      ${tab.panelGroups === undefined
                        ? ""
                        : tab.panelGroups.map((group) => {
                            const items = html`<ul>
                              ${group.items.map(
                                (render) => html`<li>${render()}</li>`,
                              )}
                            </ul>`;

                            return "title" in group
                              ? html`<dl>
                                  <dt>${group.title}</dt>
                                  <dd>${items}</dd>
                                </dl>`
                              : items;
                          })}
                    </div>
                  </div>
                </mdn-dropdown>`}
          </div>`;
          currentTab = null;
          return result;
        })}
      </nav>
    `;
  }
}
