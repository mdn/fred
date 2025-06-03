import { Task } from "@lit/task";
import { LitElement, html, nothing } from "lit";

import { L10nMixin } from "../../l10n/mixin.js";
import bookmarkSvg from "../icon/bookmark.svg?lit";
import { globalUser } from "../user/context.js";

import styles from "./element.css?lit";

export class MDNCollectionSaveButton extends L10nMixin(LitElement) {
  static styles = styles;

  _user = new Task(this, {
    task: async () => {
      return await globalUser();
    },
  });

  render() {
    return this._user.render({
      initial: () => nothing,
      complete: (user) =>
        user.isAuthenticated
          ? html`<button
              class="collection-save-button"
              title=${this.l10n`Save in Collection`}
            >
              ${bookmarkSvg} <span>${this.l10n`Save`}</span>
            </button>`
          : nothing,
    });
  }
}

customElements.define("mdn-collection-save-button", MDNCollectionSaveButton);
