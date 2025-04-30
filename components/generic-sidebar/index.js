import { html, nothing } from "lit";

import { ServerComponent } from "../server/index.js";

export class GenericSidebar extends ServerComponent {
  /**
   * @param {Fred.Context<Rari.GenericPage>} context
   */
  render(context) {
    if (context.path.startsWith("/en-US/observatory/docs")) {
      const links = [
        {
          href: "/en-US/observatory/docs/tests_and_scoring",
          title: "Scoring Methodology",
        },
        { href: "/en-US/observatory/docs/faq", title: "FAQ" },
      ];

      const items = links.map(
        ({ href, title }) => html`
          <li class="section">
            ${context.path === href
              ? html`<em><a href=${href}>${title}</a></em>`
              : html`<a href=${href}>${title}</a>`}
          </li>
        `,
      );

      return html`<nav class="generic-sidebar">
        <section class="generic-sidebar--content">
          <header>
            <h4>HTTP Observatory</h4>
          </header>
          <ol>
            ${items}
          </ol>
        </section>
      </nav>`;
    }
    return nothing;
  }
}
