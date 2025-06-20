import { html } from "lit";

import { ContentSection } from "../content-section/server.js";
import { ServerComponent } from "../server/index.js";

export class GenericContent extends ServerComponent {
  /**
   * @param {import("@fred").Context<import("@rari").GenericPage>} context
   * @returns {import("@lit").TemplateResult}
   */
  render(context) {
    console.log("CONTEXT", context.hyData.sections);
    const className = [
      "features/ai-help",
      "features/collection",
      "features/offline",
      "features/overview",
      "features/playground",
      "features/updates",
    ].includes(context.id)
      ? "generic-content generic-content__plus-docs-content"
      : "generic-content";

    return html`<main id="content" class=${className}>
      ${context.hyData.sections.map((section) => {
        if (section.type === "prose") {
          // Map assets path to a relative one
          section.value.content = section.value.content.replaceAll(
            '"/assets/',
            '"./assets/',
          );
        }
        return ContentSection.render(context, section);
      })}
    </div>`;
  }
}
