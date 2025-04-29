import { GenericLayout } from "../generic-layout/index.js";
import { PageLayout } from "../page-layout/index.js";
import { ServerComponent } from "../server/index.js";

export class GenericDoc extends ServerComponent {
  /**
   * @param {Fred.Context<Rari.GenericPage>} context
   */
  render(context) {
    return PageLayout.render(context, GenericLayout.render(context));
  }
}
