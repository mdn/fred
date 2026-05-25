import { Task } from "@lit/task";
import { LitElement, html, nothing } from "lit";

import { L10nMixin } from "../../l10n/mixin.js";
import { globalPlacementContext } from "../placement/context.js";
import { globalUser } from "../user/context.js";

import styles from "./element.css?lit";

/**
 * @import * as Placements from "../placement/types.js";
 * @import * as User from "../user/types.js";
 */

class MDNPlacementNo extends L10nMixin(LitElement) {
  static styles = styles;

  _dataTask = new Task(this, {
    task: async () => {
      return {
        context: await globalPlacementContext(),
        user: await globalUser(),
      };
    },
  });

  connectedCallback() {
    super.connectedCallback();
    this._dataTask.run();
  }
  render() {
    return this._dataTask.render({
      initial: () => nothing,
      pending: () => nothing,

      complete:
        /**
         * @param {{ context: Placements.PlacementContextData, user: User.User}} context
         */
        (context) => {
          const { context: placementContext, user } = context;
          const showNoAds = Boolean(
            user?.isSubscriber || placementContext.plusAvailable,
          );
          return showNoAds
            ? html`<a
                class="placement-no"
                data-glean-id=${"pong: " +
                (user?.isSubscriber ? "pong->settings" : "pong->plus")}
                href=${user?.isSubscriber
                  ? "/en-US/plus/settings?ref=nope"
                  : "/en-US/plus?ref=nope"}
              >
                ${this.l10n("placement-no")}
              </a>`
            : nothing;
        },
    });
  }
}

customElements.define("mdn-placement-no", MDNPlacementNo);
