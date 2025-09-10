import { PageLayout } from "../page-layout/server.js";
import { ReferenceLayout } from "../reference-layout/server.js";
import { ServerComponent } from "../server/index.js";

export class Doc extends ServerComponent {
  /**
   * @param {import("@fred").Context<import("@rari").DocPage>} context
   */ render(context) {
    context.pageTitle = context.doc.pageTitle;
    return PageLayout.render(context, ReferenceLayout.render(context));
  }
}
