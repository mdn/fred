import { html } from "lit";

import "./index.css";

// Elements
import "./elements/tabs.css";
import "./elements/panel.css";
import "./elements/content.css";

/**
 * @param {Fred.Context} _context
 */
export function Menu(_context) {
  return html`<nav class="menu">
    <div class="menu__tabs">
      <button
        class="menu__tabs-button dropdown"
        type="button"
        aria-expanded="false"
        aria-controls="menu__html"
      >
        HTML
        <svg
          class="menu__tabs-arrow"
          width="16"
          height="16"
          viewBox="0 0 320 512"
          aria-hidden="true"
        >
          <path
            d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z"
          />
        </svg>
      </button>
      <button
        class="menu__tabs-button dropdown"
        type="button"
        aria-expanded="false"
        aria-controls="menu__css"
      >
        CSS
        <svg
          class="menu__tabs-arrow"
          width="16"
          height="16"
          viewBox="0 0 320 512"
          aria-hidden="true"
        >
          <path
            d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z"
          />
        </svg>
      </button>
      <button
        class="menu__tabs-button dropdown"
        type="button"
        aria-expanded="false"
        aria-controls="menu__javascript"
      >
        JavaScript
        <svg
          class="menu__tabs-arrow"
          width="16"
          height="16"
          viewBox="0 0 320 512"
          aria-hidden="true"
        >
          <path
            d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z"
          />
        </svg>
      </button>
      <button
        class="menu__tabs-button dropdown"
        type="button"
        aria-expanded="false"
        aria-controls="menu__apis"
      >
        Web APIs
        <svg
          class="menu__tabs-arrow"
          width="16"
          height="16"
          viewBox="0 0 320 512"
          aria-hidden="true"
        >
          <path
            d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z"
          />
        </svg>
      </button>
      <button
        class="menu__tabs-button dropdown"
        type="button"
        aria-expanded="false"
        aria-controls="menu__all"
      >
        All
        <svg
          class="menu__tabs-arrow"
          width="16"
          height="16"
          viewBox="0 0 320 512"
          aria-hidden="true"
        >
          <path
            d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z"
          />
        </svg>
      </button>
      <button
        class="menu__tabs-button menu__tabs-button--learn dropdown"
        type="button"
        aria-expanded="false"
        aria-controls="menu__learn"
      >
        <svg
          class="menu__tabs-icon"
          width="16"
          height="16"
          viewBox="0 0 640 512"
          aria-hidden="true"
        >
          <path
            d="M320 32c-8.1 0-16.1 1.4-23.7 4.1L15.8 137.4C6.3 140.9 0 149.9 0 160s6.3 19.1 15.8 22.6l57.9 20.9C57.3 229.3 48 259.8 48 291.9l0 28.1c0 28.4-10.8 57.7-22.3 80.8c-6.5 13-13.9 25.8-22.5 37.6C0 442.7-.9 448.3 .9 453.4s6 8.9 11.2 10.2l64 16c4.2 1.1 8.7 .3 12.4-2s6.3-6.1 7.1-10.4c8.6-42.8 4.3-81.2-2.1-108.7C90.3 344.3 86 329.8 80 316.5l0-24.6c0-30.2 10.2-58.7 27.9-81.5c12.9-15.5 29.6-28 49.2-35.7l157-61.7c8.2-3.2 17.5 .8 20.7 9s-.8 17.5-9 20.7l-157 61.7c-12.4 4.9-23.3 12.4-32.2 21.6l159.6 57.6c7.6 2.7 15.6 4.1 23.7 4.1s16.1-1.4 23.7-4.1L624.2 182.6c9.5-3.4 15.8-12.5 15.8-22.6s-6.3-19.1-15.8-22.6L343.7 36.1C336.1 33.4 328.1 32 320 32zM128 408c0 35.3 86 72 192 72s192-36.7 192-72L496.7 262.6 354.5 314c-11.1 4-22.8 6-34.5 6s-23.5-2-34.5-6L143.3 262.6 128 408z"
          />
        </svg>
        Learn
        <svg
          class="menu__tabs-arrow"
          width="16"
          height="16"
          viewBox="0 0 320 512"
          aria-hidden="true"
        >
          <path
            d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z"
          />
        </svg>
      </button>
      <button
        class="menu__tabs-button menu__tabs-button--tools dropdown"
        type="button"
        aria-expanded="false"
        aria-controls="menu__tools"
      >
        <svg
          class="menu__tabs-icon"
          width="16"
          height="16"
          viewBox="0 0 512 512"
          aria-hidden="true"
        >
          <path
            d="M352 320c88.4 0 160-71.6 160-160c0-15.3-2.2-30.1-6.2-44.2c-3.1-10.8-16.4-13.2-24.3-5.3l-76.8 76.8c-3 3-7.1 4.7-11.3 4.7L336 192c-8.8 0-16-7.2-16-16l0-57.4c0-4.2 1.7-8.3 4.7-11.3l76.8-76.8c7.9-7.9 5.4-21.2-5.3-24.3C382.1 2.2 367.3 0 352 0C263.6 0 192 71.6 192 160c0 19.1 3.4 37.5 9.5 54.5L19.9 396.1C7.2 408.8 0 426.1 0 444.1C0 481.6 30.4 512 67.9 512c18 0 35.3-7.2 48-19.9L297.5 310.5c17 6.2 35.4 9.5 54.5 9.5zM80 408a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"
          />
        </svg>
        Tools
        <svg
          class="menu__tabs-arrow"
          width="16"
          height="16"
          viewBox="0 0 320 512"
          aria-hidden="true"
        >
          <path
            d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z"
          />
        </svg>
      </button>
      <button
        class="menu__tabs-button menu__tabs-button--about dropdown"
        type="button"
        aria-expanded="false"
        aria-controls="menu__about"
      >
        About
        <svg
          class="menu__tabs-arrow"
          width="16"
          height="16"
          viewBox="0 0 320 512"
          aria-hidden="true"
        >
          <path
            d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z"
          />
        </svg>
      </button>
      <a class="menu__tabs-link" href="">Blog</a>
    </div>
    <section class="menu__panel menu__panel--html" id="menu__html" hidden>
      <h4 class="menu__panel-title">
        <a href="">HTML: Markup language</a>
      </h4>
      <div class="menu__content">
        <div class="menu__content-primary">
          <dl class="menu__content-list">
            <dt>HTML References</dt>
            <dd>
              <ul>
                <li><a href="">Elements</a></li>
                <li><a href="">Global attributes</a></li>
                <li><a href="">Attributes</a></li>
                <li>
                  <a href="" aria-label="See all HTML references">See all…</a>
                </li>
              </ul>
            </dd>
          </dl>
          <dl class="menu__content-list">
            <dt>Markup languages</dt>
            <dd>
              <ul>
                <li><a href="">SVG</a></li>
                <li><a href="">MathML</a></li>
                <li><a href="">XML</a></li>
              </ul>
            </dd>
          </dl>
        </div>
        <div class="menu__content-secondary">
          <dl class="menu__content-list">
            <dt>HTML Guides</dt>
            <dd>
              <ul>
                <li><a href="">Responsive images</a></li>
                <li><a href="">Video & audio content</a></li>
                <li><a href="">Date & time formats</a></li>
                <li>
                  <a href="" aria-label="See all HTML guides">See all…</a>
                </li>
              </ul>
            </dd>
          </dl>
        </div>
      </div>
    </section>
    <section class="menu__panel menu__panel--css" id="menu__css" hidden>
      <h4 class="menu__panel-title">
        <a href="">CSS: Styling language</a>
      </h4>
      <div class="menu__content">
        <div class="menu__content-primary">
          <dl class="menu__content-list">
            <dt>References</dt>
            <dd>
              <ul>
                <li><a href="">Modules</a></li>
                <li><a href="">Properties</a></li>
                <li><a href="">Selectors</a></li>
                <li><a href="">At-rules</a></li>
                <li><a href="">Functions</a></li>
                <li><a href="">See all…</a></li>
              </ul>
            </dd>
          </dl>
        </div>
        <div class="menu__content-secondary">
          <dl class="menu__content-list">
            <dt>Guides</dt>
            <dd>
              <ul>
                <li><a href="">Box model</a></li>
                <li><a href="">Animations</a></li>
                <li><a href="">Flexbox</a></li>
                <li><a href="">Colors</a></li>
                <li><a href="">See all…</a></li>
              </ul>
            </dd>
          </dl>
          <dl class="menu__content-list">
            <dt>Tools</dt>
            <dd>
              <ul>
                <li><a href="">Color picker</a></li>
                <li><a href="">Box-shadow generator</a></li>
                <li><a href="">Border-image generator</a></li>
                <li><a href="">Border-radius generator</a></li>
              </ul>
            </dd>
          </dl>
        </div>
      </div>
    </section>
    <section
      class="menu__panel menu__panel--javascript"
      id="menu__javascript"
      hidden
    >
      <h4 class="menu__panel-title">
        <a href="">JavaScript. Scripting language</a>
      </h4>
      <div class="menu__content">
        <div class="menu__content-primary">
          <dl class="menu__content-list">
            <dt>References</dt>
            <dd>
              <ul>
                <li><a href="">Built-in objects</a></li>
                <li><a href="">Expressions & operators</a></li>
                <li><a href="">Statements & declarations</a></li>
                <li><a href="">Functions</a></li>
                <li><a href="">See all…</a></li>
              </ul>
            </dd>
          </dl>
        </div>
        <div class="menu__content-secondary">
          <dl class="menu__content-list">
            <dt>Guides</dt>
            <dd>
              <ul>
                <li><a href="">Complete beginners</a></li>
                <li><a href="">Intermediate</a></li>
                <li><a href="">Advanced</a></li>
                <li><a href="">See all…</a></li>
              </ul>
            </dd>
          </dl>
        </div>
      </div>
    </section>
    <section class="menu__panel menu__panel--apis" id="menu__apis" hidden>
      <h4 class="menu__panel-title">
        <a href="">Web API. Programming interfaces</a>
      </h4>
      <div class="menu__content">
        <div class="menu__content-primary">
          <dl class="menu__content-list">
            <dt>References</dt>
            <dd>
              <ul>
                <li><a href="">Fetch API</a></li>
                <li><a href="">Canvas API</a></li>
                <li><a href="">Geolocation API</a></li>
                <li><a href="">View transitions API</a></li>
                <li><a href="">See all…</a></li>
              </ul>
            </dd>
          </dl>
        </div>
        <div class="menu__content-secondary">
          <dl class="menu__content-list">
            <dt>Guides</dt>
            <dd>
              <ul>
                <li><a href="">Using the web audio API</a></li>
                <li><a href="">Manipulating video with canvas</a></li>
                <li><a href="">Using the web animation API</a></li>
                <li><a href="">See all…</a></li>
              </ul>
            </dd>
          </dl>
        </div>
      </div>
    </section>
    <section class="menu__panel menu__panel--all" id="menu__all" hidden>
      <h4 class="menu__panel-title">
        <a href="">All web technology</a>
      </h4>
      <div class="menu__content">
        <div class="menu__content-primary">
          <dl class="menu__content-list">
            <dt>References</dt>
            <dd>
              <ul>
                <li>
                  <a href="">Accessibility</a>
                </li>
                <li>
                  <a href="">HTTP</a>
                </li>
                <li>
                  <a href="">Web extensions</a>
                </li>
                <li>
                  <a href="">Web assembly</a>
                </li>
                <li>
                  <a href="">WebDriver</a>
                </li>
                <li>
                  <a href="">See all…</a>
                </li>
              </ul>
            </dd>
          </dl>
        </div>
        <div class="menu__content-secondary">
          <dl class="menu__content-list">
            <dt>Topics</dt>
            <dd>
              <ul>
                <li>
                  <a href="">Performance</a>
                </li>
                <li>
                  <a href="">Privacy</a>
                </li>
                <li>
                  <a href="">Security</a>
                </li>
                <li>
                  <a href="">Progressive web apps</a>
                </li>
                <li>
                  <a href="">See all…</a>
                </li>
              </ul>
            </dd>
          </dl>
        </div>
      </div>
    </section>
    <section class="menu__panel menu__panel--learn" id="menu__learn" hidden>
      <h4 class="menu__panel-title">
        <a href="">Learn web development</a>
      </h4>
      <div class="menu__content">
        <div class="menu__content-primary">
          <dl class="menu__content-list">
            <dt>Frontend developer course</dt>
            <dd>
              <ul>
                <li><a href="">Getting started</a></li>
                <li><a href="">Common questions</a></li>
                <li><a href="">Curriculum</a></li>
              </ul>
            </dd>
          </dl>
        </div>
        <div class="menu__content-secondary">
          <dl class="menu__content-list">
            <dt>Learn HTML</dt>
            <dd>
              <ul>
                <li><a href="">Introduction to HTML</a></li>
                <li><a href="">Getting started with HTML</a></li>
              </ul>
            </dd>
          </dl>
          <dl class="menu__content-list">
            <dt>Learn CSS</dt>
            <dd>
              <ul>
                <li><a href="">What is CSS</a></li>
                <li><a href="">Getting started with CSS</a></li>
              </ul>
            </dd>
          </dl>
          <dl class="menu__content-list">
            <dt>Learn JavaScript</dt>
            <dd>
              <ul>
                <li><a href="">How to use data attributes</a></li>
                <li><a href="">How to use JS in a webpage</a></li>
              </ul>
            </dd>
          </dl>
        </div>
      </div>
    </section>
    <section class="menu__panel menu__panel--tools" id="menu__tools" hidden>
      <h4 class="menu__panel-title">Discover MDN's unique tools</h4>
      <div class="menu__content">
        <div class="menu__content-full">
          <ul class="menu__content-featured">
            <li>
              <a href="">
                <svg width="24" height="24" viewBox="0 0 384 512">
                  <path
                    d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80L0 432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"
                  />
                </svg>
                Playground
              </a>
            </li>
            <li>
              <a href="">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 34 34"
                  aria-hidden="true"
                >
                  <path
                    d="M25.333 33.6666V30.3333H30.333V25.3333H33.6663V31.1666C33.6663 31.8166 33.3997 32.3999 32.8997 32.8999C32.3997 33.3999 31.8163 33.6666 31.1663 33.6666H25.333ZM8.66634 33.6666H2.83301C2.18301 33.6666 1.59967 33.3999 1.09967 32.8999C0.599675 32.3999 0.333008 31.8166 0.333008 31.1666V25.3333H3.66634V30.3333H8.66634V33.6666ZM25.333 0.333252H31.1663C31.8163 0.333252 32.3997 0.599919 32.8997 1.09992C33.3997 1.59992 33.6663 2.18325 33.6663 2.83325V8.66658H30.333V3.66659H25.333V0.333252ZM8.66634 0.333252V3.66659H3.66634V8.66658H0.333008V2.83325C0.333008 2.18325 0.599675 1.59992 1.09967 1.09992C1.59967 0.599919 2.18301 0.333252 2.83301 0.333252H8.66634ZM14.4997 6.99992C18.6663 6.99992 21.9997 10.3333 21.9997 14.4999C21.9997 15.9666 21.583 17.3333 20.8497 18.4999L26.283 23.9333L23.933 26.2833L18.4997 20.8499C17.333 21.5833 15.9663 21.9999 14.4997 21.9999C10.333 21.9999 6.99967 18.6666 6.99967 14.4999C6.99967 10.3333 10.333 6.99992 14.4997 6.99992ZM14.4997 10.3333C12.1997 10.3333 10.333 12.1999 10.333 14.4999C10.333 16.7999 12.1997 18.6666 14.4997 18.6666C16.7997 18.6666 18.6663 16.7999 18.6663 14.4999C18.6663 12.1999 16.7997 10.3333 14.4997 10.3333Z"
                  />
                </svg>
                HTTP Observatory
              </a>
            </li>
            <li>
              <a href="">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 25 20"
                  aria-hidden="true"
                >
                  <path
                    d="M12.4998 0C5.99982 0 0.681641 4.23529 0.681641 9.41177C0.681641 11.8824 1.86346 14.2353 3.99073 15.8824C3.99073 16.5882 5.88164 17.2941 3.04528 20C3.04528 20 7.18164 20 8.36346 18.2353C9.66346 18.5882 11.0816 18.8235 12.4998 18.8235C18.9998 18.8235 24.318 14.5882 24.318 9.41177C24.318 4.23529 18.9998 0 12.4998 0ZM13.6816 14.1176H11.318V11.7647H13.6816V14.1176ZM15.8089 8.23529C15.4544 8.70588 14.9816 8.94118 14.5089 9.17647C14.1544 9.41177 14.0362 9.52941 13.918 9.76471C13.6816 10 13.6816 10.2353 13.6816 10.5882H11.318C11.318 10 11.4362 9.64706 11.6726 9.29412C11.9089 9.05882 12.3816 8.70588 12.9725 8.35294C13.3271 8.23529 13.5635 8 13.6816 7.76471C13.7998 7.52941 13.918 7.17647 13.918 6.94118C13.918 6.58823 13.7998 6.35294 13.5635 6.11765C13.3271 5.88235 12.9726 5.76471 12.618 5.76471C12.2635 5.76471 12.0271 5.88235 11.7907 6C11.5544 6.11765 11.4362 6.35294 11.4362 6.70588H9.07255C9.19073 5.88235 9.54528 5.17647 10.1362 4.70588C10.7271 4.23529 11.5544 4.11765 12.618 4.11765C13.6816 4.11765 14.6271 4.35294 15.218 4.82353C15.8089 5.29412 16.1635 6 16.1635 6.82353C16.2816 7.29412 16.1635 7.76471 15.8089 8.23529Z"
                  />
                </svg>
                AI Help
              </a>
            </li>
            <li>
              <a href="">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 448 512"
                  aria-hidden="true"
                >
                  <path
                    d="M159.3 5.4c7.8-7.3 19.9-7.2 27.7 .1c27.6 25.9 53.5 53.8 77.7 84c11-14.4 23.5-30.1 37-42.9c7.9-7.4 20.1-7.4 28 .1c34.6 33 63.9 76.6 84.5 118c20.3 40.8 33.8 82.5 33.8 111.9C448 404.2 348.2 512 224 512C98.4 512 0 404.1 0 276.5c0-38.4 17.8-85.3 45.4-131.7C73.3 97.7 112.7 48.6 159.3 5.4zM225.7 416c25.3 0 47.7-7 68.8-21c42.1-29.4 53.4-88.2 28.1-134.4c-4.5-9-16-9.6-22.5-2l-25.2 29.3c-6.6 7.6-18.5 7.4-24.7-.5c-16.5-21-46-58.5-62.8-79.8c-6.3-8-18.3-8.1-24.7-.1c-33.8 42.5-50.8 69.3-50.8 99.4C112 375.4 162.6 416 225.7 416z"
                  />
                </svg>
                Browser release dashboard
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
    <section class="menu__panel menu__panel--about" id="menu__about" hidden>
      <h4 class="menu__panel-title">About: Get to know MDN better</h4>
      <div class="menu__content">
        <div class="menu__content-full">
          <ul class="menu__content-featured">
            <li>
              <a href="">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 23"
                  aria-hidden="true"
                >
                  <path
                    d="M7.36676 0.000758094C7.46304 0.000507923 7.55932 0.000257752 7.65852 0C7.7637 0.000142071 7.86887 0.000304851 7.97404 0.000486827C8.08193 0.000433357 8.18982 0.000356325 8.2977 0.000256734C8.52381 0.000139732 8.74992 0.000309784 8.97602 0.000680589C9.26556 0.00113232 9.55509 0.000872656 9.84462 0.00039706C10.0674 0.000109951 10.2903 0.000201711 10.5131 0.000407203C10.6198 0.000460078 10.7265 0.000395415 10.8333 0.000210413C10.9826 8.38729e-06 11.132 0.000371013 11.2814 0.000758094C11.3663 0.000821236 11.4512 0.000884379 11.5388 0.000949434C11.7594 0.0110275 11.7594 0.0110275 12.073 0.0903924C12.0989 6.95229 12.1247 13.8142 12.1514 20.884C13.0791 17.9158 13.0791 17.9158 13.9545 14.9316C14.2409 14.0063 14.2409 14.0063 14.3423 13.6886C14.4854 13.2392 14.6278 12.7894 14.7697 12.3396C14.7937 12.2634 14.8177 12.1873 14.8425 12.1089C15.0888 11.3261 15.3255 10.5404 15.5609 9.75411C15.792 8.98228 16.0301 8.21338 16.277 7.44653C16.5507 6.59505 16.8004 5.73818 17.0434 4.87725C17.3265 3.8794 17.6356 2.8902 17.947 1.9011C17.9663 1.83974 17.9856 1.77839 18.0055 1.71517C18.0428 1.59672 18.0802 1.4783 18.1177 1.35992C18.2368 0.982954 18.3482 0.604528 18.4502 0.222403C18.5015 0.0903924 18.5015 0.0903924 18.6583 0.0110275C18.7938 0.00342685 18.9296 0.000872317 19.0654 0.000758094C19.1505 0.000507923 19.2356 0.000257752 19.3233 0C19.462 0.000240979 19.462 0.000240979 19.6036 0.000486827C19.6988 0.000410897 19.794 0.000334966 19.892 0.000256734C20.0941 0.000202609 20.2963 0.000349872 20.4984 0.000680589C20.8055 0.00110174 21.1126 0.000686716 21.4197 0.000176808C21.6163 0.000229315 21.8128 0.000331127 22.0094 0.000486827C22.1005 0.000326174 22.1916 0.000165521 22.2854 0C22.8314 0.00156432 23.368 0.0297634 23.9108 0.0903924C23.9778 0.325782 23.999 0.534805 23.9991 0.779446C23.9994 0.891652 23.9994 0.891652 23.9997 1.00612C23.9994 1.12902 23.9994 1.12902 23.9991 1.25439C23.9993 1.34162 23.9994 1.42884 23.9995 1.51872C23.9998 1.81202 23.9996 2.10533 23.9993 2.39864C23.9994 2.60851 23.9996 2.81837 23.9998 3.02824C24.0001 3.5397 24 4.05117 23.9998 4.56263C23.9996 4.97825 23.9996 5.39387 23.9997 5.80949C23.9997 5.8686 23.9997 5.92772 23.9997 5.98863C23.9997 6.10872 23.9998 6.22881 23.9998 6.3489C24 7.4754 23.9998 8.60189 23.9993 9.72839C23.999 10.6953 23.999 11.6622 23.9994 12.6292C23.9998 13.7516 24 14.874 23.9998 15.9964C23.9997 16.1161 23.9997 16.2357 23.9997 16.3554C23.9997 16.4143 23.9997 16.4731 23.9996 16.5338C23.9996 16.949 23.9997 17.3642 23.9999 17.7794C24.0001 18.2853 24 18.7911 23.9996 19.297C23.9994 19.5552 23.9994 19.8134 23.9996 20.0716C23.9998 20.3512 23.9995 20.6308 23.9991 20.9105C23.9993 20.9924 23.9995 21.0743 23.9997 21.1587C23.9995 21.2336 23.9993 21.3084 23.9991 21.3854C23.999 21.45 23.999 21.5145 23.999 21.5811C23.9892 21.757 23.9892 21.757 23.9108 22.0745C23.0571 22.1007 22.2033 22.1269 21.3237 22.1538C21.2324 21.969 21.2351 21.8617 21.2345 21.6558C21.234 21.5842 21.2336 21.5125 21.2332 21.4387C21.233 21.3199 21.233 21.3199 21.2329 21.1987C21.2325 21.1149 21.2322 21.0312 21.2318 20.9449C21.2305 20.6624 21.2299 20.3799 21.2292 20.0974C21.2285 19.8957 21.2277 19.6939 21.2269 19.4922C21.2252 19.0569 21.2238 18.6216 21.2225 18.1862C21.2207 17.5568 21.2185 16.9274 21.2162 16.298C21.2125 15.277 21.2091 14.2559 21.2059 13.2348C21.2028 12.2427 21.1996 11.2507 21.1961 10.2586C21.1959 10.1975 21.1957 10.1364 21.1955 10.0734C21.1944 9.76677 21.1933 9.46016 21.1923 9.15354C21.1833 6.60868 21.1749 4.06382 21.1669 1.51896C21.1336 1.62708 21.1336 1.62708 21.0996 1.73738C21.0158 2.00929 20.932 2.28118 20.8481 2.55308C20.8121 2.66991 20.7761 2.78675 20.7401 2.9036C20.5259 3.59875 20.3098 4.29317 20.089 4.98622C19.9249 5.50492 19.771 6.02501 19.6266 6.54964C19.3453 7.55727 19.0305 8.5538 18.716 9.5512C18.634 9.81148 18.5524 10.0719 18.4707 10.3322C18.4373 10.4387 18.4039 10.5452 18.3706 10.6516C18.354 10.7045 18.3374 10.7574 18.3203 10.8119C18.27 10.9724 18.2196 11.1328 18.1692 11.2933C17.8442 12.3287 17.5201 13.3645 17.1981 14.4009C17.1719 14.4852 17.1458 14.5695 17.1188 14.6563C16.7908 15.7136 16.4738 16.7728 16.1744 17.8387C15.9203 18.7364 15.644 19.6267 15.3656 20.5169C15.3427 20.5904 15.3198 20.6639 15.2962 20.7397C15.2315 20.9472 15.1663 21.1547 15.101 21.3621C15.0814 21.425 15.0617 21.4879 15.0415 21.5528C14.9043 21.9859 14.9043 21.9859 14.8169 22.0745C14.6485 22.082 14.4799 22.0838 14.3114 22.0835C14.2322 22.0835 14.2322 22.0835 14.1515 22.0835C13.9763 22.0835 13.8011 22.0829 13.6259 22.0822C13.5047 22.0821 13.3836 22.082 13.2624 22.0819C12.9429 22.0816 12.6234 22.0808 12.3039 22.0799C11.9209 22.079 11.5378 22.0786 11.1548 22.0781C10.5724 22.0774 9.98996 22.0759 9.40753 22.0745C9.40766 21.9513 9.40766 21.9513 9.4078 21.8257C9.41008 19.5072 9.40293 17.1887 9.3917 14.8702C9.38944 14.401 9.38728 13.9319 9.3851 13.4628C9.381 12.5806 9.37682 11.6984 9.37261 10.8162C9.36781 9.80929 9.3631 8.80234 9.35839 7.79539C9.34874 5.7297 9.33897 3.66402 9.32913 1.59833C9.14632 2.05102 8.9727 2.50269 8.82562 2.96884C8.80912 3.02087 8.79262 3.0729 8.77562 3.1265C8.7219 3.29617 8.66859 3.46596 8.6153 3.63577C8.57703 3.75706 8.53874 3.87833 8.50043 3.99961C8.4202 4.25383 8.34016 4.50812 8.26027 4.76246C8.1603 5.08073 8.05989 5.39886 7.95935 5.71694C7.48511 7.21783 7.02588 8.72222 6.58208 10.2326C6.39832 10.8546 6.20738 11.4744 6.0169 12.0943C5.97394 12.2344 5.931 12.3745 5.88807 12.5146C5.82158 12.7315 5.75509 12.9484 5.68855 13.1653C5.53117 13.6784 5.37441 14.1916 5.21793 14.705C4.745 16.2562 4.26648 17.8051 3.77381 19.35C3.55804 20.0279 3.34418 20.7018 3.18606 21.3965C3.12898 21.6259 3.05294 21.8501 2.97905 22.0745C1.99596 22.0745 1.01288 22.0745 0 22.0745C0.0984651 21.5761 0.198248 21.0995 0.33992 20.6152C0.358036 20.5525 0.376152 20.4898 0.394816 20.4251C0.455486 20.2158 0.516777 20.0068 0.578171 19.7977C0.599695 19.724 0.62122 19.6504 0.643396 19.5745C1.14549 17.8587 1.68402 16.1547 2.22127 14.4501C2.27144 14.2909 2.32162 14.1316 2.37179 13.9724C2.38814 13.9206 2.40449 13.8687 2.42134 13.8152C2.70323 12.9206 2.98126 12.0248 3.25344 11.1271C3.27189 11.0662 3.29035 11.0054 3.30936 10.9427C3.50931 10.2825 3.70632 9.62155 3.90082 8.95973C4.37073 7.36135 4.85463 5.76803 5.35053 4.17769C5.38002 4.08297 5.40951 3.98824 5.4399 3.89065C5.60925 3.34714 5.77991 2.80407 5.95219 2.2615C6.00966 2.07991 6.06677 1.89821 6.12356 1.7164C6.20756 1.44774 6.29276 1.1795 6.37825 0.911323C6.40355 0.829546 6.42885 0.747768 6.45491 0.663512C6.47891 0.589119 6.5029 0.514726 6.52762 0.438079C6.5483 0.372587 6.56897 0.307095 6.59028 0.239618C6.61449 0.190374 6.63871 0.141129 6.66366 0.0903924C6.91702 0.00489552 7.1003 0.000956317 7.36676 0.000758094Z"
                  />
                </svg>
                About MDN
              </a>
            </li>
            <li>
              <a href="">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 15"
                  aria-hidden="true"
                >
                  <path
                    d="M12 0.5C12.9283 0.5 13.8185 0.868749 14.4749 1.52513C15.1313 2.1815 15.5 3.07174 15.5 4C15.5 4.92826 15.1313 5.8185 14.4749 6.47487C13.8185 7.13125 12.9283 7.5 12 7.5C11.0717 7.5 10.1815 7.13125 9.52513 6.47487C8.86875 5.8185 8.5 4.92826 8.5 4C8.5 3.07174 8.86875 2.1815 9.52513 1.52513C10.1815 0.868749 11.0717 0.5 12 0.5ZM5 3C5.56 3 6.08 3.15 6.53 3.42C6.38 4.85 6.8 6.27 7.66 7.38C7.16 8.34 6.16 9 5 9C4.20435 9 3.44129 8.68393 2.87868 8.12132C2.31607 7.55871 2 6.79565 2 6C2 5.20435 2.31607 4.44129 2.87868 3.87868C3.44129 3.31607 4.20435 3 5 3ZM19 3C19.7956 3 20.5587 3.31607 21.1213 3.87868C21.6839 4.44129 22 5.20435 22 6C22 6.79565 21.6839 7.55871 21.1213 8.12132C20.5587 8.68393 19.7956 9 19 9C17.84 9 16.84 8.34 16.34 7.38C17.2 6.27 17.62 4.85 17.47 3.42C17.92 3.15 18.44 3 19 3ZM5.5 13.25C5.5 11.18 8.41 9.5 12 9.5C15.59 9.5 18.5 11.18 18.5 13.25V15H5.5V13.25ZM0 15V13.5C0 12.11 1.89 10.94 4.45 10.6C3.86 11.28 3.5 12.22 3.5 13.25V15H0ZM24 15H20.5V13.25C20.5 12.22 20.14 11.28 19.55 10.6C22.11 10.94 24 12.11 24 13.5V15Z"
                  />
                </svg>
                Community
              </a>
            </li>
            <li>
              <a href="">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 23 10"
                  aria-hidden="true"
                >
                  <path
                    d="M18.5 0C17.4 0 16.5 0.9 16.5 2V4C16.5 5.1 17.4 6 18.5 6H20.5V8H16.5V10H20.5C21.6 10 22.5 9.1 22.5 8V6C22.5 4.9 21.6 4 20.5 4H18.5V2H22.5V0H18.5ZM8.5 0V10H12.5C13.6 10 14.5 9.1 14.5 8V2C14.5 0.9 13.6 0 12.5 0H8.5ZM10.5 2H12.5V8H10.5V2ZM2.5 0C1.4 0 0.5 0.9 0.5 2V10H2.5V6H4.5V10H6.5V2C6.5 0.9 5.6 0 4.5 0H2.5ZM2.5 2H4.5V4H2.5V2Z"
                  />
                </svg>
                Advertise with us
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  </nav> `;
}
