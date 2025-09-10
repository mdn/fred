import { html } from "lit";

import { ifDefined } from "lit/directives/if-defined.js";

import { ServerComponent } from "../server/index.js";

import { MISSING_DOCS } from "./constants.js";

export class Menu extends ServerComponent {
  /**
   * @param {import("@fred").Context} context
   */
  render(context) {
    /**
     * Holds the id of the section being rendered.
     * @type {string|null}
     */
    let currentSection = null;

    /**
     * Generates a Glean ID for a submenu click.
     *
     * @param {string} href - The href of the link.
     * @returns {string} the Glean ID.
     */
    const gleanId = (href) =>
      `menu_click_submenu: ${currentSection ?? "?"} -> ${href}`;

    /**
     * Renders a link to a page.
     *
     * @param {string} slug
     * @param {string} text
     * @param {string} [label]
     */
    const link = (slug, text, label) => {
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
        data-glean-id=${gleanId(href)}
        >${text}</a
      >`;
    };

    const sections = [
      {
        id: "html",
        render: () =>
          html`<mdn-dropdown>
            <button class="menu__tab-button" type="button" slot="button">
              <span class="menu__tab-label">HTML</span>
            </button>
            <div class="menu__panel" slot="dropdown">
              <p class="menu__panel-title">
                ${link("Web/HTML", "HTML: Markup language")}
              </p>
              <div class="menu__panel-content">
                <dl>
                  <dt>HTML reference</dt>
                  <dd>
                    <ul>
                      <li>
                        ${link("Web/HTML/Reference/Elements", "Elements")}
                      </li>
                      <li>
                        ${link(
                          "Web/HTML/Reference/Global_attributes",
                          "Global attributes",
                        )}
                      </li>
                      <li>
                        ${link("Web/HTML/Reference/Attributes", "Attributes")}
                      </li>
                      <li>
                        ${link(
                          "Web/HTML/Reference",
                          "See all…",
                          "See all HTML references",
                        )}
                      </li>
                    </ul>
                  </dd>
                </dl>
                <dl>
                  <dt>HTML guides</dt>
                  <dd>
                    <ul>
                      <li>
                        ${link(
                          "Web/HTML/Guides/Responsive_images",
                          "Responsive images",
                        )}
                      </li>
                      <li>
                        ${link("Web/HTML/Guides/Cheatsheet", "HTML cheatsheet")}
                      </li>
                      <li>
                        ${link(
                          "Web/HTML/Guides/Date_and_time_formats",
                          "Date & time formats",
                        )}
                      </li>
                      <li>
                        ${link(
                          "Web/HTML/Guides",
                          "See all…",
                          "See all HTML guides",
                        )}
                      </li>
                    </ul>
                  </dd>
                </dl>
                <dl>
                  <dt>Markup languages</dt>
                  <dd>
                    <ul>
                      <li>${link("Web/SVG", "SVG")}</li>
                      <li>${link("Web/MathML", "MathML")}</li>
                      <li>${link("Web/XML", "XML")}</li>
                    </ul>
                  </dd>
                </dl>
              </div>
            </div>
          </mdn-dropdown>`,
      },
      {
        id: "css",
        render: () =>
          html`<mdn-dropdown>
            <button class="menu__tab-button" type="button" slot="button">
              <span class="menu__tab-label">CSS</span>
            </button>
            <div class="menu__panel" slot="dropdown">
              <p class="menu__panel-title">
                ${link("Web/CSS", "CSS: Styling language")}
              </p>
              <div class="menu__panel-content">
                <dl>
                  <dt>CSS reference</dt>
                  <dd>
                    <ul>
                      <li>${link("Web/CSS/Properties", "Properties")}</li>
                      <li>${link("Web/CSS/CSS_selectors", "Selectors")}</li>
                      <li>${link("Web/CSS/CSS_syntax/At-rule", "At-rules")}</li>
                      <li>
                        ${link(
                          "Web/CSS/CSS_Values_and_Units",
                          "Values & units",
                        )}
                      </li>
                      <li>
                        ${link(
                          "Web/CSS/Reference",
                          "See all…",
                          "See all CSS references",
                        )}
                      </li>
                    </ul>
                  </dd>
                </dl>
                <dl>
                  <dt>CSS guides</dt>
                  <dd>
                    <ul>
                      <li>
                        ${link(
                          "Web/CSS/CSS_box_model/Introduction_to_the_CSS_box_model",
                          "Box model",
                        )}
                      </li>
                      <li>
                        ${link(
                          "Web/CSS/CSS_animations/Using_CSS_animations",
                          "Animations",
                        )}
                      </li>
                      <li>
                        ${link(
                          "Web/CSS/CSS_flexible_box_layout/Basic_concepts_of_flexbox",
                          "Flexbox",
                        )}
                      </li>
                      <li>${link("Web/CSS/CSS_colors", "Colors")}</li>
                      <li>
                        ${link(
                          "Web/CSS/Guides",
                          "See all…",
                          "See all CSS guides",
                        )}
                      </li>
                    </ul>
                  </dd>
                </dl>
                <dl>
                  <dt>Layout cookbook</dt>
                  <dd>
                    <ul>
                      <li>
                        ${link(
                          "Web/CSS/Layout_cookbook/Column_layouts",
                          "Column layouts",
                        )}
                      </li>
                      <li>
                        ${link(
                          "Web/CSS/Layout_cookbook/Center_an_element",
                          "Centering an element",
                        )}
                      </li>
                      <li>
                        ${link(
                          "Web/CSS/Layout_cookbook/Card",
                          "Card component",
                        )}
                      </li>
                      <li>${link("Web/CSS/Layout_cookbook", "See all…")}</li>
                    </ul>
                  </dd>
                </dl>
              </div>
            </div>
          </mdn-dropdown>`,
      },
      {
        id: "javascript",
        render: () =>
          html`<mdn-dropdown>
            <button class="menu__tab-button" type="button" slot="button">
              <span class="menu__tab-label" data-type="long">JavaScript</span>
              <span class="menu__tab-label" data-type="short">JS</span>
            </button>
            <div class="menu__panel" slot="dropdown">
              <p class="menu__panel-title">
                ${link("Web/JavaScript", "JavaScript: Scripting language")}
              </p>
              <div class="menu__panel-content">
                <dl>
                  <dt>JS reference</dt>
                  <dd>
                    <ul>
                      <li>
                        ${link(
                          "Web/JavaScript/Reference/Global_Objects",
                          "Standard built-in objects",
                        )}
                      </li>
                      <li>
                        ${link(
                          "Web/JavaScript/Reference/Operators",
                          "Expressions & operators",
                        )}
                      </li>
                      <li>
                        ${link(
                          "Web/JavaScript/Reference/Statements",
                          "Statements & declarations",
                        )}
                      </li>
                      <li>
                        ${link(
                          "Web/JavaScript/Reference/Functions",
                          "Functions",
                        )}
                      </li>
                      <li>
                        ${link(
                          "Web/JavaScript/Reference",
                          "See all…",
                          "See all JavaScript references",
                        )}
                      </li>
                    </ul>
                  </dd>
                </dl>
                <dl>
                  <dt>JS guides</dt>
                  <dd>
                    <ul>
                      <li>
                        ${link(
                          "Web/JavaScript/Guide/Control_flow_and_error_handling",
                          "Control flow & error handing",
                        )}
                      </li>
                      <li>
                        ${link(
                          "Web/JavaScript/Guide/Loops_and_iteration",
                          "Loops and iteration",
                        )}
                      </li>
                      <li>
                        ${link(
                          "Web/JavaScript/Guide/Working_with_objects",
                          "Working with objects",
                        )}
                      </li>
                      <li>
                        ${link(
                          "Web/JavaScript/Guide/Using_classes",
                          "Using classes",
                        )}
                      </li>
                      <li>
                        ${link(
                          "Web/JavaScript/Guide",
                          "See all…",
                          "See all JavaScript guides",
                        )}
                      </li>
                    </ul>
                  </dd>
                </dl>
              </div>
            </div>
          </mdn-dropdown>`,
      },
      {
        id: "webapis",
        render: () =>
          html`<mdn-dropdown>
            <button class="menu__tab-button" type="button" slot="button">
              <span class="menu__tab-label">Web APIs</span>
            </button>
            <div class="menu__panel" slot="dropdown">
              <p class="menu__panel-title">
                ${link("Web/API", "Web APIs: Programming interfaces")}
              </p>
              <div class="menu__panel-content">
                <dl>
                  <dt>Web API reference</dt>
                  <dd>
                    <ul>
                      <li>
                        ${link("Web/API/File_System_API", "File system API")}
                      </li>
                      <li>${link("Web/API/Fetch_API", "Fetch API")}</li>
                      <li>
                        ${link("Web/API/Geolocation_API", "Geolocation API")}
                      </li>
                      <li>${link("Web/API/HTML_DOM_API", "HTML DOM API")}</li>
                      <li>${link("Web/API/Push_API", "Push API")}</li>
                      <li>
                        ${link(
                          "Web/API/Service_Worker_API",
                          "Service worker API",
                        )}
                      </li>
                      <li>
                        ${link("Web/API", "See all…", "See all Web API guides")}
                      </li>
                    </ul>
                  </dd>
                </dl>
                <dl>
                  <dt>Web API guides</dt>
                  <dd>
                    <ul>
                      <li>
                        ${link(
                          "Web/API/Web_Animations_API/Using_the_Web_Animations_API",
                          "Using the Web animation API",
                        )}
                      </li>
                      <li>
                        ${link(
                          "Web/API/Fetch_API/Using_Fetch",
                          "Using the Fetch API",
                        )}
                      </li>
                      <li>
                        ${link(
                          "Web/API/History_API/Working_with_the_History_API",
                          "Working with the History API",
                        )}
                      </li>
                      <li>
                        ${link(
                          "Web/API/Web_Speech_API/Using_the_Web_Speech_API",
                          "Using the Web speech API",
                        )}
                      </li>
                      <li>
                        ${link(
                          "Web/API/Web_Workers_API/Using_web_workers",
                          "Using web workers",
                        )}
                      </li>
                    </ul>
                  </dd>
                </dl>
              </div>
            </div>
          </mdn-dropdown>`,
      },
      {
        id: "all",
        render: () =>
          html`<mdn-dropdown>
            <button class="menu__tab-button" type="button" slot="button">
              <span class="menu__tab-label">All</span>
            </button>
            <div class="menu__panel" slot="dropdown">
              <p class="menu__panel-title">
                ${link("Web", "All web technology")}
              </p>
              <div class="menu__panel-content">
                <dl>
                  <dt>Technologies</dt>
                  <dd>
                    <ul>
                      <li>${link("Web/Accessibility", "Accessibility")}</li>
                      <li>${link("Web/HTTP", "HTTP")}</li>
                      <li>${link("Web/URI", "URI")}</li>
                      <li>
                        ${link(
                          "Mozilla/Add-ons/WebExtensions",
                          "Web extensions",
                        )}
                      </li>
                      <li>${link("WebAssembly", "WebAssembly")}</li>
                      <li>${link("Web/WebDriver", "WebDriver")}</li>
                      <li>
                        ${link(
                          "Web",
                          "See all…",
                          "See all web technology references",
                        )}
                      </li>
                    </ul>
                  </dd>
                </dl>
                <dl>
                  <dt>Topics</dt>
                  <dd>
                    <ul>
                      <li>${link("Web/Media", "Media")}</li>
                      <li>${link("Web/API/Performance", "Performance")}</li>
                      <li>${link("Web/Privacy", "Privacy")}</li>
                      <li>${link("Web/Security", "Security")}</li>
                      <li>
                        ${link(
                          "Web/Progressive_web_apps",
                          "Progressive web apps",
                        )}
                      </li>
                    </ul>
                  </dd>
                </dl>
              </div>
            </div>
          </mdn-dropdown>`,
      },
      {
        id: "learn",
        render: () =>
          html`<mdn-dropdown>
            <button class="menu__tab-button" type="button" slot="button">
              <span class="menu__tab-label">Learn</span>
            </button>
            <div class="menu__panel" slot="dropdown">
              <p class="menu__panel-title">
                ${link("Learn_web_development", "Learn web development")}
              </p>
              <div class="menu__panel-content">
                <dl>
                  <dt>Frontend developer course</dt>
                  <dd>
                    <ul>
                      <li>
                        ${link(
                          "Learn_web_development/Getting_started",
                          "Getting started",
                        )}
                      </li>
                      <li>
                        ${link(
                          "Learn_web_development/Howto",
                          "Common questions",
                        )}
                      </li>
                      <li>
                        <a
                          class=${ifDefined(
                            context.locale === "en-US"
                              ? undefined
                              : "only-in-en-us",
                          )}
                          href="/en-US/curriculum/"
                          data-glean-id=${gleanId("/en-US/curriculum/")}
                          >Curriculum</a
                        >
                      </li>
                    </ul>
                  </dd>
                </dl>
                <dl>
                  <dt>Learn HTML</dt>
                  <dd>
                    <ul>
                      <li>
                        ${link(
                          "Learn_web_development/Core/Structuring_content",
                          "Introduction to HTML",
                        )}
                      </li>
                      <li>
                        ${link(
                          "Learn_web_development/Core/Structuring_content/Basic_HTML_syntax",
                          "Getting started with HTML",
                        )}
                      </li>
                    </ul>
                  </dd>
                </dl>
                <dl>
                  <dt>Learn CSS</dt>
                  <dd>
                    <ul>
                      <li>
                        ${link(
                          "Learn_web_development/Core/Styling_basics/What_is_CSS",
                          "What is CSS",
                        )}
                      </li>
                      <li>
                        ${link(
                          "Learn_web_development/Core/Styling_basics/Getting_started",
                          "Getting started with CSS",
                        )}
                      </li>
                    </ul>
                  </dd>
                </dl>
                <dl>
                  <dt>Learn JavaScript</dt>
                  <dd>
                    <ul>
                      <li>
                        ${link(
                          "Web/HTML/How_to/Use_data_attributes",
                          "How to use data attributes",
                        )}
                      </li>
                      <li>
                        ${link(
                          "Web/HTML/How_to/Add_JavaScript_to_your_web_page",
                          "Add JavaScript to your web page",
                        )}
                      </li>
                    </ul>
                  </dd>
                </dl>
              </div>
            </div>
          </mdn-dropdown>`,
      },
      {
        id: "tools",
        render: () =>
          html`<mdn-dropdown>
            <button class="menu__tab-button" type="button" slot="button">
              <span class="menu__tab-label">Tools</span>
            </button>
            <div class="menu__panel" slot="dropdown">
              <p class="menu__panel-title">Discover our tools</p>
              <div class="menu__panel-content">
                <ul>
                  <li>
                    <a
                      class="menu__panel-icon"
                      data-icon="circle-play"
                      href=${`/en-US/play`}
                      data-glean-id=${gleanId("/en-US/play/")}
                    >
                      Playground
                    </a>
                  </li>
                  <li>
                    <a
                      class="menu__panel-icon"
                      data-icon="shield-check"
                      href=${`/en-US/observatory`}
                      data-glean-id=${gleanId("/en-US/observatory/")}
                    >
                      HTTP Observatory
                    </a>
                  </li>
                </ul>
                <ul>
                  <li>
                    ${link(
                      "Web/CSS/CSS_colors/Color_picker_tool",
                      "Color picker",
                    )}
                  </li>
                  <li>
                    ${link(
                      "Web/CSS/CSS_backgrounds_and_borders/Box-shadow_generator",
                      "Box-shadow generator",
                    )}
                  </li>
                  <li>
                    ${link(
                      "Web/CSS/CSS_backgrounds_and_borders/Border-image_generator",
                      "Border-image generator",
                    )}
                  </li>
                  <li>
                    ${link(
                      "Web/CSS/CSS_backgrounds_and_borders/Border-radius_generator",
                      "Border-radius generator",
                    )}
                  </li>
                </ul>
              </div>
            </div>
          </mdn-dropdown>`,
      },
      {
        id: "about",
        render: () =>
          html`<mdn-dropdown>
            <button class="menu__tab-button" type="button" slot="button">
              <span class="menu__tab-label">About</span>
            </button>
            <div class="menu__panel" slot="dropdown">
              <p class="menu__panel-title">Get to know MDN better</p>
              <div class="menu__panel-content">
                <ul>
                  <li>
                    <a
                      class="menu__panel-icon"
                      data-icon="mdn-m"
                      href=${`/en-US/about`}
                      data-glean-id=${gleanId("/en-US/about")}
                    >
                      About MDN
                    </a>
                  </li>
                  <li>
                    <a
                      class="menu__panel-icon"
                      data-icon="chart-no-axes-combined"
                      href=${`/en-US/advertising`}
                      data-glean-id=${gleanId("/en-US/advertising")}
                    >
                      Advertise with us
                    </a>
                  </li>
                </ul>
                <ul>
                  <li>
                    <a
                      class="menu__panel-icon"
                      data-icon="users"
                      href=${`/en-US/community`}
                      data-glean-id=${gleanId("/en-US/community")}
                    >
                      Community
                    </a>
                  </li>
                  <li>
                    <a
                      class="menu__panel-icon"
                      data-icon="github"
                      href="https://github.com/mdn"
                      data-glean-id=${gleanId("https://github.com/mdn")}
                    >
                      MDN on GitHub
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </mdn-dropdown>`,
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
        ${sections.map((section) => {
          currentSection = section.id;
          const result = html`<div class="menu__tab" data-section=${section.id}>
            ${section.render()}
          </div>`;
          currentSection = null;
          return result;
        })}
      </nav>
    `;
  }
}
