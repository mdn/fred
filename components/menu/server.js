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
                          Built-in objects
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
                <ul class="menu__panel-featured">
                  <li>
                    <a href=${`/en-US/play`}>
                      <svg viewBox="0 -960 960 960" width="24" height="24">
                        <path
                          d="m426-334 191.5-122.5q13-8.45 13-23.48 0-15.02-13-23.52L426-626q-14-9-28.5-1.25T383-602.5v245q0 17 14.5 24.75T426-334Zm54 244q-80.91 0-152.07-30.76-71.15-30.77-123.79-83.5Q151.5-257 120.75-328.09 90-399.17 90-480q0-80.91 30.76-152.07 30.77-71.15 83.5-123.79Q257-808.5 328.09-839.25 399.17-870 480-870q80.91 0 152.07 30.76 71.15 30.77 123.79 83.5Q808.5-703 839.25-631.91 870-560.83 870-480q0 80.91-30.76 152.07-30.77 71.15-83.5 123.79Q703-151.5 631.91-120.75 560.83-90 480-90Zm0-75q131.5 0 223.25-91.75T795-480q0-131.5-91.75-223.25T480-795q-131.5 0-223.25 91.75T165-480q0 131.5 91.75 223.25T480-165Zm0-315Z"
                        />
                      </svg>
                      Playground
                    </a>
                  </li>
                  <li>
                    <a href=${`/en-US/observatory`}>
                      <svg viewBox="0 -960 960 960" width="24" height="24">
                        <path
                          d="m439-450-57.5-57.5Q370.18-519 355.09-519t-26.59 11.5Q317-496 317-480.75T328.5-454l84 84.5q11.32 11.5 26.41 11.5t26.59-11.5l167-167Q644-548 644-563.25T632.5-590q-11.5-11.5-26.75-11.5T579-590L439-450Zm41 356q-6.58 0-12.22-1-5.64-1-11.28-3-132-44.5-209.75-162.75T169-516.23V-701.5q0-23.48 13.52-42.26 13.53-18.79 34.98-27.24l236-89q13.25-5 26.5-5t26.5 5l236 89q21.45 8.45 34.98 27.24Q791-724.98 791-701.5v185.27q0 137.23-77.75 255.48T503.5-98q-5.64 2-11.28 3T480-94Zm0-74.5q102.5-33 169.25-130.6Q716-396.71 716-516v-185.61L480-790l-236 88.39V-516q0 119.29 66.75 216.9Q377.5-201.5 480-168.5Zm0-311Z"
                        />
                      </svg>
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
                <ul class="menu__panel-featured">
                  <li>
                    <a href=${`/en-US/about`}>
                      <svg width="24" height="24" viewBox="0 0 24 24">
                        <path
                          d="M9.4 0 2.81 21.17H.12L6.69 0H9.4Zm2.38 0v21.17H9.4V0h2.4Zm9.27 0-6.56 21.17H11.8L18.36 0h2.69Zm2.39 0v21.17h-2.4V0h2.4Z"
                        />
                      </svg>
                      About MDN
                    </a>
                  </li>
                  <li>
                    <a href=${`/en-US/advertising`}>
                      <svg viewBox="0 -960 960 960" width="24" height="24">
                        <path
                          d="M160-122.5q-15.5 0-26.5-11t-11-26.5v-39q0-15.5 11-26.5t26.5-11q15.5 0 26.5 11t11 26.5v39q0 15.5-11 26.5t-26.5 11Zm160 0q-15.5 0-26.5-11t-11-26.5v-219q0-15.5 11-26.5t26.5-11q15.5 0 26.5 11t11 26.5v219q0 15.5-11 26.5t-26.5 11Zm160 0q-15.5 0-26.5-11t-11-26.5v-139q0-15.5 11-26.25T480-336q15.5 0 26.5 10.75t11 26.25v139q0 15.5-11 26.5t-26.5 11Zm160 0q-15.5 0-26.5-11t-11-26.5v-199q0-15.5 11-26.5t26.5-11q15.5 0 26.5 11t11 26.5v199q0 15.5-11 26.5t-26.5 11Zm160 0q-15.5 0-26.5-11t-11-26.5v-359q0-15.5 11-26.5t26.5-11q15.5 0 26.5 11t11 26.5v359q0 15.5-11 26.5t-26.5 11ZM560-482q-15 0-28.25-5.5t-24.75-16l-107-107L186.5-397q-11.5 11.5-26.75 11T133-398q-10.5-11.5-10.25-26.5T133.5-450L347-663.5q11.5-11.5 24.75-16.5t28.25-5q15 0 28.75 5T453-663.5l107 107L773.5-770q11.5-11.5 26.75-11T827-769q10.5 11.5 10.25 26.5T826.5-717L613-503.5q-10.5 10.5-24.25 16T560-482Z"
                        />
                      </svg>
                      Advertise with us
                    </a>
                  </li>
                </ul>
                <ul class="menu__panel-featured">
                  <li>
                    <a href=${`/en-US/community`}>
                      <svg viewBox="0 -960 960 960" width="24" height="24">
                        <path
                          d="M54.5-279.03q0-32.97 16.75-60.22t45.27-41.76Q177.5-411 240-426.25q62.5-15.25 126-15.25t125.75 15.25Q554-411 614.98-381.01q28.52 14.51 45.27 41.76Q677-312 677-279.03V-248q0 30.94-22.03 52.97Q632.94-173 602-173H129.5q-30.94 0-52.97-22.03Q54.5-217.06 54.5-248v-31.03ZM830.5-173h-99q10-17 15.25-36t5.25-39v-35q0-43.65-22.5-83.82Q707-407 663-434.5q48.5 6 91.25 19.75t80.25 34.25Q869-362 887.25-338t18.25 52v37.81q0 31.19-22.03 53.19-22.03 22-52.97 22ZM366-479q-64 0-109-45t-45-109q0-64 45-109t109-45q64 0 109 45t45 109q0 64-45 109t-109 45Zm382-154.5q0 63.53-45 108.76-45 45.24-109 45.24-9.5 0-25.18-2.34-15.68-2.35-25.82-5.16 26.52-30.69 40.76-68.1Q598-592.5 598-633.25q0-40.75-14.25-78.5T543-780q12.5-4.5 25.5-5.75T594-787q64 0 109 45.09t45 108.41ZM129.5-248H602v-31q0-11.19-5.5-20.34-5.5-9.16-15-14.16Q528-340 474.33-353.25 420.65-366.5 366-366.5q-54.82 0-108.66 13.25Q203.5-340 150-313.5q-9.5 5-15 14.16-5.5 9.15-5.5 20.34v31Zm236.44-306q32.56 0 55.81-23.19T445-632.94q0-32.56-23.19-55.81T366.06-712q-32.56 0-55.81 23.19T287-633.06q0 32.56 23.19 55.81T365.94-554Zm.06 306Zm0-385Z"
                        />
                      </svg>
                      Community
                    </a>
                  </li>
                  <li>
                    <a class="external" href="https://github.com/mdn">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M11.98 1.86a10.33 10.33 0 0 1 2.8 20.28.8.8 0 0 1-.24-.56v-2.86a2.7 2.7 0 0 0-.72-1.92c2.28-.27 4.67-1.13 4.67-5.12a4 4 0 0 0-1.06-2.77 3.8 3.8 0 0 0-.1-2.76s-.86-.27-2.81 1.07a9.59 9.59 0 0 0-5.13 0c-1.94-1.34-2.8-1.07-2.82-1.07a3.78 3.78 0 0 0-.1 2.77 4.1 4.1 0 0 0-1.08 2.79c0 3.97 2.43 4.86 4.67 5.12-.37.37-.6.87-.64 1.39-.59.27-2.08.72-2.99-.87a2.13 2.13 0 0 0-1.56-1.1s-1 0-.07.65c0 0 .67.33 1.14 1.52 0 0 .6 1.84 3.44 1.22v1.93a.8.8 0 0 1-.23.57 10.34 10.34 0 0 1 2.83-20.28Z"
                        />
                      </svg>
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
