import { html } from "lit";

import { ServerComponent } from "../server/index.js";

export class Menu extends ServerComponent {
  /**
   * @param {import("@fred").Context} context
   */
  render(context) {
    return html`
      <nav class="menu">
        <div class="menu__tab" data-section="html">
          <mdn-dropdown>
            <button class="menu__tab-button" type="button" slot="button">
              <span class="menu__tab-label">HTML</span>
            </button>
            <div class="menu__panel" slot="dropdown">
              <p class="menu__panel-title">
                <a href=${`/${context.locale}/docs/Web/HTML`}
                  >HTML: Markup language</a
                >
              </p>
              <div class="menu__panel-content">
                <dl>
                  <dt>HTML reference</dt>
                  <dd>
                    <ul>
                      <li>
                        <a
                          href=${`/${context.locale}/docs/Web/HTML/Reference/Elements`}
                          >Elements</a
                        >
                      </li>
                      <li>
                        <a
                          href=${`/${context.locale}/docs/Web/HTML/Reference/Global_attributes`}
                        >
                          Global attributes
                        </a>
                      </li>
                      <li>
                        <a
                          href=${`/${context.locale}/docs/Web/HTML/Reference/Attributes`}
                          >Attributes</a
                        >
                      </li>
                      <li>
                        <a
                          href=${`/${context.locale}/docs/Web/HTML/Reference`}
                          aria-label="See all HTML references"
                        >
                          See all…
                        </a>
                      </li>
                    </ul>
                  </dd>
                </dl>
                <dl>
                  <dt>HTML guides</dt>
                  <dd>
                    <ul>
                      <li>
                        <a
                          href=${`/${context.locale}/docs/Web/HTML/Guides/Responsive_images`}
                        >
                          Responsive images
                        </a>
                      </li>
                      <li>
                        <a
                          href=${`/${context.locale}/docs/Learn_web_development/Core/Structuring_content/HTML_video_and_audio`}
                        >
                          Video & audio content
                        </a>
                      </li>
                      <li>
                        <a
                          href=${`/${context.locale}/docs/Web/HTML/Guides/Date_and_time_formats`}
                        >
                          Date & time formats
                        </a>
                      </li>
                      <li>
                        <a
                          href=${`/${context.locale}/docs/Web/HTML#guides`}
                          aria-label="See all HTML guides"
                        >
                          See all…
                        </a>
                      </li>
                    </ul>
                  </dd>
                </dl>
                <dl>
                  <dt>Markup languages</dt>
                  <dd>
                    <ul>
                      <li>
                        <a href=${`/${context.locale}/docs/Web/SVG`}>SVG</a>
                      </li>
                      <li>
                        <a href=${`/${context.locale}/docs/Web/MathML`}
                          >MathML</a
                        >
                      </li>
                      <li>
                        <a href=${`/${context.locale}/docs/Web/XML`}>XML</a>
                      </li>
                    </ul>
                  </dd>
                </dl>
              </div>
            </div>
          </mdn-dropdown>
        </div>
        <div class="menu__tab" data-section="css">
          <mdn-dropdown>
            <button class="menu__tab-button" type="button" slot="button">
              <span class="menu__tab-label">CSS</span>
            </button>
            <div class="menu__panel" slot="dropdown">
              <p class="menu__panel-title">
                <a href=${`/${context.locale}/docs/Web/CSS`}
                  >CSS: Styling language</a
                >
              </p>
              <div class="menu__panel-content">
                <dl>
                  <dt>CSS reference</dt>
                  <dd>
                    <ul>
                      <li>
                        <a href=${`/${context.locale}/docs/Web/CSS/Properties`}
                          >Properties</a
                        >
                      </li>
                      <li>
                        <a
                          href=${`/${context.locale}/docs/Web/CSS/CSS_selectors`}
                          >Selectors</a
                        >
                      </li>
                      <li>
                        <a
                          href=${`/${context.locale}/docs/Web/CSS/CSS_syntax/At-rule`}
                          >At-rules</a
                        >
                      </li>
                      <li>
                        <a
                          href=${`/${context.locale}/docs/Web/CSS/CSS_Values_and_Units`}
                          >Values & units</a
                        >
                      </li>
                      <li>
                        <a
                          href=${`/${context.locale}/docs/Web/CSS/Reference`}
                          aria-label="See all CSS references"
                          >See all…</a
                        >
                      </li>
                    </ul>
                  </dd>
                </dl>
                <dl>
                  <dt>CSS guides</dt>
                  <dd>
                    <ul>
                      <li>
                        <a
                          href=${`/${context.locale}/docs/Learn_web_development/Core/Styling_basics/Box_model`}
                        >
                          Box model
                        </a>
                      </li>
                      <li>
                        <a
                          href=${`/${context.locale}/docs/Web/CSS/CSS_animations/Using_CSS_animations`}
                        >
                          Animations
                        </a>
                      </li>
                      <li>
                        <a
                          href=${`/${context.locale}/docs/Learn_web_development/Core/CSS_layout/Flexbox`}
                        >
                          Flexbox
                        </a>
                      </li>
                      <li>
                        <a href=${`/${context.locale}/docs/Web/CSS/CSS_colors`}
                          >Colors</a
                        >
                      </li>
                      <li>
                        <a
                          href=${`/${context.locale}/docs/Web/CSS/Guides`}
                          aria-label="See all CSS guides"
                        >
                          See all…
                        </a>
                      </li>
                    </ul>
                  </dd>
                </dl>
                <dl>
                  <dt>Layout cookbook</dt>
                  <dd>
                    <ul>
                      <li>
                        <a
                          href=${`/${context.locale}/docs/Web/CSS/Layout_cookbook/Column_layouts`}
                        >
                          Column layouts
                        </a>
                      </li>
                      <li>
                        <a
                          href=${`/${context.locale}/docs/Web/CSS/Layout_cookbook/Center_an_element`}
                        >
                          Centering an element
                        </a>
                      </li>
                      <li>
                        <a
                          href=${`/${context.locale}/docs/Web/CSS/Layout_cookbook/Card`}
                        >
                          Card component
                        </a>
                      </li>
                      <li>
                        <a
                          href=${`/${context.locale}/docs/Web/CSS/Layout_cookbook`}
                        >
                          See all…
                        </a>
                      </li>
                    </ul>
                  </dd>
                </dl>
              </div>
            </div>
          </mdn-dropdown>
        </div>
        <div class="menu__tab" data-section="javascript">
          <mdn-dropdown>
            <button class="menu__tab-button" type="button" slot="button">
              <span class="menu__tab-label" data-type="long">JavaScript</span>
              <span class="menu__tab-label" data-type="short">JS</span>
            </button>
            <div class="menu__panel" slot="dropdown">
              <p class="menu__panel-title">
                <a href=${`/${context.locale}/docs/Web/JavaScript`}>
                  JavaScript: Scripting language
                </a>
              </p>
              <div class="menu__panel-content">
                <dl>
                  <dt>JS reference</dt>
                  <dd>
                    <ul>
                      <li>
                        <a
                          href=${`/${context.locale}/docs/Web/JavaScript/Reference/Global_Objects`}
                        >
                          Standard built-in objects
                        </a>
                      </li>
                      <li>
                        <a
                          href=${`/${context.locale}/docs/Web/JavaScript/Reference/Operators`}
                        >
                          Expressions & operators
                        </a>
                      </li>
                      <li>
                        <a
                          href=${`/${context.locale}/docs/Web/JavaScript/Reference/Statements`}
                        >
                          Statements & declarations
                        </a>
                      </li>
                      <li>
                        <a
                          href=${`/${context.locale}/docs/Web/JavaScript/Reference/Functions`}
                        >
                          Functions
                        </a>
                      </li>
                      <li>
                        <a
                          href=${`/${context.locale}/docs/Web/JavaScript/Reference`}
                          aria-label="See all JavaScript references"
                        >
                          See all…
                        </a>
                      </li>
                    </ul>
                  </dd>
                </dl>
                <dl>
                  <dt>JS guides</dt>
                  <dd>
                    <ul>
                      <li>
                        <a
                          href=${`/${context.locale}/docs/Web/JavaScript/Guide/Control_flow_and_error_handling`}
                        >
                          Control flow & error handing
                        </a>
                      </li>
                      <li>
                        <a
                          href=${`/${context.locale}/docs/Web/JavaScript/Guide/Loops_and_iteration`}
                        >
                          Loops and iteration
                        </a>
                      </li>
                      <li>
                        <a
                          href=${`/${context.locale}/docs/Web/JavaScript/Guide/Working_with_objects`}
                        >
                          Working with objects
                        </a>
                      </li>
                      <li>
                        <a
                          href=${`/${context.locale}/docs/Web/JavaScript/Guide/Using_classes`}
                        >
                          Using classes
                        </a>
                      </li>
                      <li>
                        <a
                          href=${`/${context.locale}/docs/Web/JavaScript/Guide`}
                          aria-label="See all JavaScript guides"
                        >
                          See all…
                        </a>
                      </li>
                    </ul>
                  </dd>
                </dl>
              </div>
            </div>
          </mdn-dropdown>
        </div>
        <div class="menu__tab" data-section="webapis">
          <mdn-dropdown>
            <button class="menu__tab-button" type="button" slot="button">
              <span class="menu__tab-label">Web APIs</span>
            </button>
            <div class="menu__panel" slot="dropdown">
              <p class="menu__panel-title">
                <a href=${`/${context.locale}/docs/Web/API`}
                  >Web APIs: Programming interfaces</a
                >
              </p>
              <div class="menu__panel-content">
                <dl>
                  <dt>Web API reference</dt>
                  <dd>
                    <ul>
                      <li>
                        <a
                          href=${`/${context.locale}/docs/Web/API/File_System_API`}
                          >File system API</a
                        >
                      </li>
                      <li>
                        <a href=${`/${context.locale}/docs/Web/API/Fetch_API`}
                          >Fetch API</a
                        >
                      </li>
                      <li>
                        <a
                          href=${`/${context.locale}/docs/Web/API/Geolocation_API`}
                        >
                          Geolocation API
                        </a>
                      </li>
                      <li>
                        <a
                          href=${`/${context.locale}/docs/Web/API/HTML_DOM_API`}
                        >
                          HTML DOM API
                        </a>
                      </li>
                      <li>
                        <a href=${`/${context.locale}/docs/Web/API/Push_API`}>
                          Push API
                        </a>
                      </li>
                      <li>
                        <a
                          href=${`/${context.locale}/docs/Web/API/Service_Worker_API`}
                        >
                          Service worker API
                        </a>
                      </li>
                      <li>
                        <a
                          href=${`/${context.locale}/docs/Web/API`}
                          aria-label="See all Web API references"
                        >
                          See all…
                        </a>
                      </li>
                    </ul>
                  </dd>
                </dl>
                <dl>
                  <dt>Web API guides</dt>
                  <dd>
                    <ul>
                      <li>
                        <a
                          href=${`/${context.locale}/docs/Web/API/Web_Animations_API/Using_the_Web_Animations_API`}
                        >
                          Using the Web animation API
                        </a>
                      </li>
                      <li>
                        <a
                          href=${`/${context.locale}/docs/Web/API/Fetch_API/Using_Fetch`}
                        >
                          Using the Fetch API
                        </a>
                      </li>
                      <li>
                        <a
                          href=${`/${context.locale}/docs/Web/API/History_API/Working_with_the_History_API`}
                        >
                          Working with the History API
                        </a>
                      </li>
                      <li>
                        <a
                          href=${`/${context.locale}/docs/Web/API/Web_Speech_API/Using_the_Web_Speech_API`}
                        >
                          Using the Web speech API
                        </a>
                      </li>
                      <li>
                        <a
                          href=${`/${context.locale}/docs/Web/API/Web_Workers_API/Using_web_workers`}
                        >
                          Using web workers
                        </a>
                      </li>
                    </ul>
                  </dd>
                </dl>
              </div>
            </div>
          </mdn-dropdown>
        </div>
        <div class="menu__tab" data-section="all">
          <mdn-dropdown>
            <button class="menu__tab-button" type="button" slot="button">
              <span class="menu__tab-label">All</span>
            </button>
            <div class="menu__panel" slot="dropdown">
              <p class="menu__panel-title">
                <a href=${`/${context.locale}/docs/Web`}>All web technology</a>
              </p>
              <div class="menu__panel-content">
                <dl>
                  <dt>Technologies</dt>
                  <dd>
                    <ul>
                      <li>
                        <a href=${`/${context.locale}/docs/Web/Accessibility`}
                          >Accessibility</a
                        >
                      </li>
                      <li>
                        <a href=${`/${context.locale}/docs/Web/HTTP`}>HTTP</a>
                      </li>
                      <li>
                        <a href=${`/${context.locale}/docs/Web/URI`}>URI</a>
                      </li>
                      <li>
                        <a
                          href=${`/${context.locale}/docs/Mozilla/Add-ons/WebExtensions`}
                        >
                          Web extensions
                        </a>
                      </li>
                      <li>
                        <a href=${`/${context.locale}/docs/WebAssembly`}
                          >WebAssembly</a
                        >
                      </li>
                      <li>
                        <a href=${`/${context.locale}/docs/Web/WebDriver`}
                          >WebDriver</a
                        >
                      </li>
                      <li>
                        <a
                          href=${`/${context.locale}/docs/Web`}
                          aria-label="See all web technology references"
                        >
                          See all…
                        </a>
                      </li>
                    </ul>
                  </dd>
                </dl>
                <dl>
                  <dt>Topics</dt>
                  <dd>
                    <ul>
                      <li>
                        <a href=${`/${context.locale}/docs/Web/Media`}>Media</a>
                      </li>
                      <li>
                        <a href=${`/${context.locale}/docs/Web/API/Performance`}
                          >Performance</a
                        >
                      </li>
                      <li>
                        <a href=${`/${context.locale}/docs/Web/Privacy`}
                          >Privacy</a
                        >
                      </li>
                      <li>
                        <a href=${`/${context.locale}/docs/Web/Security`}
                          >Security</a
                        >
                      </li>
                      <li>
                        <a
                          href=${`/${context.locale}/docs/Web/Progressive_web_apps`}
                        >
                          Progressive web apps
                        </a>
                      </li>
                    </ul>
                  </dd>
                </dl>
              </div>
            </div>
          </mdn-dropdown>
        </div>
        <div class="menu__tab" data-section="learn">
          <mdn-dropdown>
            <button class="menu__tab-button" type="button" slot="button">
              <span class="menu__tab-label">Learn</span>
            </button>
            <div class="menu__panel" slot="dropdown">
              <p class="menu__panel-title">
                <a href=${`/${context.locale}/docs/Learn_web_development`}>
                  Learn web development
                </a>
              </p>
              <div class="menu__panel-content">
                <dl>
                  <dt>Frontend developer course</dt>
                  <dd>
                    <ul>
                      <li>
                        <a
                          href=${`/${context.locale}/docs/Learn_web_development/Getting_started`}
                        >
                          Getting started
                        </a>
                      </li>
                      <li>
                        <a
                          href=${`/${context.locale}/docs/Learn_web_development/Howto`}
                        >
                          Common questions
                        </a>
                      </li>
                      <li>
                        <a href=${`/${context.locale}/curriculum/`}
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
                        <a
                          href=${`/${context.locale}/docs/Learn_web_development/Core/Structuring_content`}
                        >
                          Introduction to HTML
                        </a>
                      </li>
                      <li>
                        <a
                          href=${`/${context.locale}/docs/Learn_web_development/Core/Structuring_content/Basic_HTML_syntax`}
                        >
                          Getting started with HTML
                        </a>
                      </li>
                    </ul>
                  </dd>
                </dl>
                <dl>
                  <dt>Learn CSS</dt>
                  <dd>
                    <ul>
                      <li>
                        <a
                          href=${`/${context.locale}/docs/Learn_web_development/Core/Styling_basics/What_is_CSS`}
                        >
                          What is CSS
                        </a>
                      </li>
                      <li>
                        <a
                          href=${`/${context.locale}/docs/Learn_web_development/Core/Styling_basics/Getting_started`}
                        >
                          Getting started with CSS
                        </a>
                      </li>
                    </ul>
                  </dd>
                </dl>
                <dl>
                  <dt>Learn JavaScript</dt>
                  <dd>
                    <ul>
                      <li>
                        <a
                          href=${`/${context.locale}/docs/Web/HTML/How_to/Use_data_attributes`}
                        >
                          How to use data attributes
                        </a>
                      </li>
                      <li>
                        <a
                          href=${`/${context.locale}/docs/Web/HTML/How_to/Add_JavaScript_to_your_web_page`}
                        >
                          Add JavaScript to your web page
                        </a>
                      </li>
                    </ul>
                  </dd>
                </dl>
              </div>
            </div>
          </mdn-dropdown>
        </div>
        <div class="menu__tab" data-section="tools">
          <mdn-dropdown>
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
                    >
                      Playground
                    </a>
                  </li>
                  <li>
                    <a
                      class="menu__panel-icon"
                      data-icon="shield-check"
                      href=${`/en-US/observatory`}
                    >
                      HTTP Observatory
                    </a>
                  </li>
                </ul>
                <ul>
                  <li>
                    <a
                      href=${`/${context.locale}/docs/Web/CSS/CSS_colors/Color_picker_tool`}
                    >
                      Color picker
                    </a>
                  </li>
                  <li>
                    <a
                      href=${`/${context.locale}/docs/Web/CSS/CSS_backgrounds_and_borders/Box-shadow_generator`}
                    >
                      Box-shadow generator
                    </a>
                  </li>
                  <li>
                    <a
                      href=${`/${context.locale}/docs/Web/CSS/CSS_backgrounds_and_borders/Border-image_generator`}
                    >
                      Border-image generator
                    </a>
                  </li>
                  <li>
                    <a
                      href=${`/${context.locale}/docs/Web/CSS/CSS_backgrounds_and_borders/Border-radius_generator`}
                    >
                      Border-radius generator
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </mdn-dropdown>
        </div>
        <div class="menu__tab" data-section="about">
          <mdn-dropdown>
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
                    >
                      About MDN
                    </a>
                  </li>
                  <li>
                    <a
                      class="menu__panel-icon"
                      data-icon="chart-no-axes-combined"
                      href=${`/en-US/advertising`}
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
                    >
                      Community
                    </a>
                  </li>
                  <li>
                    <a
                      class="menu__panel-icon"
                      data-icon="github"
                      href="https://github.com/mdn"
                    >
                      MDN on GitHub
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </mdn-dropdown>
        </div>
        <div class="menu__tab" data-section="blog">
          <a class="menu__tab-link" href=${`/en-US/blog/`}>Blog</a>
        </div>
      </nav>
    `;
  }
}
