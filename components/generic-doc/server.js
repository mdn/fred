import { GenericLayout } from "../generic-layout/server.js";
import { PageLayout } from "../page-layout/server.js";
import { ServerComponent } from "../server/index.js";

export class GenericDoc extends ServerComponent {
  /**
   * @param {Fred.Context<Rari.GenericPage>} context
   */
  render(context) {
    return PageLayout.render(context, GenericLayout.render(context));
  }
}
