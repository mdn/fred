import { html, nothing } from "lit";

import { ServerComponent } from "../server/index.js";

const sidebarData = {
  observatory: {
    title: "HTTP Observatory",
    items: [
      {
        href: "/en-US/observatory/docs/tests_and_scoring",
        title: "Scoring Methodology",
      },
      { href: "/en-US/observatory/docs/faq", title: "FAQ" },
    ],
    styleVariant: "observatory",
  },
  mdnPlus: {
    title: "MDN Plus",
    items: [
      { href: "/en-US/plus/docs/features/overview", title: "Overview" },
      { href: "/en-US/plus/docs/features/ai-help", title: "AI Help" },
      { href: "/en-US/plus/docs/features/playground", title: "Playground" },
      { href: "/en-US/plus/docs/features/updates", title: "Updates" },
      { href: "/en-US/plus/docs/features/collections", title: "Collections" },
      { href: "/en-US/plus/docs/features/offline", title: "MDN Offline" },
      { href: "/en-US/plus#subscribe", title: "Try MDN Plus" },
    ],
    styleVariant: "plus",
  },
};

export class GenericSidebar extends ServerComponent {
  /**
   * @param {import("@fred").Context<import("@rari").GenericPage>} context
   */
  render(context) {
    if (context.path.startsWith("/en-US/observatory/docs")) {
      return this.renderSidebar(context, sidebarData.observatory);
    } else if (context.path.startsWith("/en-US/plus/docs")) {
      return this.renderSidebar(context, sidebarData.mdnPlus);
    }
    return nothing;
  }

  /**
   * @param {import("@fred").Context<import("@rari").GenericPage>} context
   * @param {{ items: { href: string; title: string; }[]; styleVariant: string; title: string; }} data
   */
  renderSidebar(context, data) {
    const items = data.items.map(
      ({ href, title }) => html`
        <li class="generic-sidebar__item">
          ${context.path === href
            ? html`<a
                class="generic-sidebar__link"
                aria-current="true"
                href=${href}
                >${title}</a
              >`
            : html`<a class="generic-sidebar__link" href=${href}>${title}</a>`}
        </li>
      `,
    );

    return html`<nav
      class="generic-sidebar generic-sidebar--${data.styleVariant}"
    >
      <section class="generic-sidebar__content">
        <header class="generic-sidebar__header">
          <h2>${data.title}</h2>
        </header>
        <ol class="generic-sidebar__list">
          ${items}
        </ol>
      </section>
    </nav>`;
  }
}
