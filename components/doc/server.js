import { PageLayout } from "../page-layout/server.js";
import { ReferenceLayout } from "../reference-layout/server.js";
import { ServerComponent } from "../server/index.js";

export class Doc extends ServerComponent {
  /**
   * @param {import("types/fred.js").Context<import("types/rari.js").DocPage>} context
   */ render(context) {
    context.pageTitle = context.doc.title;
    return PageLayout.render(context, ReferenceLayout.render(context));
  }
}
