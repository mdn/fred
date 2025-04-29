import { html, nothing } from "lit";

import { ServerComponent } from "../server.js";

export class GenericSidebar extends ServerComponent {
  /**
   * @param {Fred.Context<Rari.GenericPage>} context
   */
  render(context) {
    console.log("PATH", context.path);
    if (context.path.startsWith("/en-US/observatory/docs")) {
      return html`<nav class="generic-sidebar">
        <section class="generic-sidebar--content">
          <header>
            <h2>HTTP Observatory</h2>
          </header>
          <ol>
            <li class="section">
              ${context.path === "/en-US/observatory/docs/tests_and_scoring"
                ? html`<em>
                    <a href="/en-US/observatory/docs/tests_and_scoring"
                      >Scoring Methodology</a
                    >
                  </em>`
                : html`
                    <a href="/en-US/observatory/docs/tests_and_scoring"
                      >Scoring Methodology</a
                    >
                  `}
            </li>
            <li>
              ${context.path === "/en-US/observatory/docs/faq"
                ? html`<em>
                    <a href="/en-US/observatory/docs/faq">FAQ</a>
                  </em>`
                : html` <a href="/en-US/observatory/docs/faq">FAQ</a> `}
            </li>
          </ol>
        </section>
      </nav>`;
    }
    return nothing;
  }
}
