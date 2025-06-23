import { html, nothing } from "lit";

import { ServerComponent } from "../server/index.js";

export class GenericSidebar extends ServerComponent {
  /**
   * @param {import("@fred").Context<import("@rari").GenericPage>} context
   */
  render(context) {
    if (context.path.startsWith("/en-US/observatory/docs")) {
      return this.renderObservatorySidebar(context);
    }
    if (context.path.startsWith("/en-US/plus/docs")) {
      return this.renderPlusDocsSidebar(context);
    }
    return nothing;
  }

  /**
   * @param {import("@fred").Context<import("@rari").GenericPage>} context
   */
  renderObservatorySidebar(context) {
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
      <section class="generic-sidebar__content">
        <header>
          <h4>HTTP Observatory</h4>
        </header>
        <ol>
          ${items}
        </ol>
      </section>
    </nav>`;
  }

  /**
   * @param {import("@fred").Context<import("@rari").GenericPage>} context
   */
  renderPlusDocsSidebar(context) {
    const links = [
      { href: "/en-US/plus/docs/features/overview", title: "Overview" },
      { href: "/en-US/plus/docs/features/ai-help", title: "AI Help" },
      { href: "/en-US/plus/docs/features/playground", title: "Playground" },
      { href: "/en-US/plus/docs/features/updates", title: "Updates" },
      { href: "/en-US/plus/docs/features/collections", title: "Collections" },
      { href: "/en-US/plus/docs/features/offline", title: "MDN Offline" },
      { href: "/en-US/plus#subscribe", title: "Try MDN Plus" },
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
      <section class="generic-sidebar__content">
        <header>
          <h4>MDN Plus</h4>
        </header>
        <ol>
          ${items}
        </ol>
      </section>
    </nav>`;
  }
}
