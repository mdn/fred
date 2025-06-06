import { html, nothing } from "lit";

import { Button } from "../button/server.js";
import NextIcon from "../curriculum/assets/curriculum-next.svg?lit";
import PrevIcon from "../curriculum/assets/curriculum-prev.svg?lit";
import {
  addAttrs,
  renderCurriculumBody,
  renderSidebar,
  renderToc,
  renderTopicIcon,
  topic2css,
} from "../curriculum/utils.js";
import { PageLayout } from "../page-layout/server.js";
import { ServerComponent } from "../server/index.js";

export class CurriculumModule extends ServerComponent {
  /**
   * @param {import("@fred").Context<import("@rari").CurriculumPage>} context
   */
  render(context) {
    const doc = context.doc;
    const topicCssClass = doc.topic ? topic2css(doc.topic) : "";

    const sidebar = renderSidebar(context, doc);
    const toc =
      doc.toc && doc.toc.length > 0
        ? renderToc(context, doc.toc, "In this module")
        : nothing;

    return PageLayout.render(
      context,
      html`
        <main
          id="content"
          class="curriculum-content-container container with-sidebar
          main-wrapper curriculum-module topic-${topicCssClass}"
        >
          ${sidebar}
          <article id="content" class="curriculum-content" lang=${doc.locale}>
            <header>
              ${doc?.topic ? renderTopicIcon(context, doc.topic) : nothing}
              <h1>${doc?.title}</h1>
              ${doc?.topic
                ? html`<p class="module-topic">${doc.topic}</p>`
                : nothing}
              ${doc?.group
                ? html`<p class="module-group">${doc.group}</p>`
                : nothing}
            </header>
            ${renderCurriculumBody(context, doc)}
            ${this.renderPrevNext(context, doc)}
          </article>
          <div class="toc-container">
            <aside class="toc">
              <nav>${toc}</nav>
            </aside>
            <mdn-placement-sidebar></mdn-placement-sidebar>
          </div>
        </main>
      `,
    );
  }

  /**
   * @param {import("@fred").Context<import("@rari").CurriculumPage>} context
   * @param {import("@rari").CurriculumDoc} doc
   * @returns {import("lit").TemplateResult | import("lit").nothing}
   */
  renderPrevNext(context, doc) {
    const { prev, next } = doc.prevNext || {};

    if (!prev && !next) return nothing;

    return html`
      <section class="curriculum-prev-next">
        ${prev
          ? Button.render(context, {
              label: `Previous: ${prev.title}`,
              icon: addAttrs(PrevIcon, { width: "16px", height: "16px" }),
              href: prev.url,
            })
          : nothing}
        ${next
          ? Button.render(context, {
              label: `Next: ${next.title}`,
              icon: addAttrs(NextIcon, { width: "16px", height: "16px" }),
              href: next.url,
            })
          : nothing}
      </section>
    `;
  }
}
