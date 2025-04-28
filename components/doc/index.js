import { PageLayout } from "../../components/page-layout/index.js";
import { ReferenceLayout } from "../../components/reference-layout/index.js";
import { ServerComponent } from "../server.js";

export class Doc extends ServerComponent {
  /**
   * @param {Fred.Context<Rari.DocPage>} context
   */ render(context) {
    context.pageTitle = context.doc.title;
    return PageLayout.render(context, ReferenceLayout.render(context));
  }
}
