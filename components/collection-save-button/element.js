import { Task } from "@lit/task";
import { LitElement, html, nothing } from "lit";

import { L10nMixin } from "../../l10n/mixin.js";
import bookmarkCheckSvg from "../icon/bookmark-check.svg?lit";
import bookmarkSvg from "../icon/bookmark.svg?lit";
import { globalUser } from "../user/context.js";

import styles from "./element.css?lit";

import "../modal/element.js";
import "../button/element.js";

const ADD_VALUE = "add";

export class MDNCollectionSaveButton extends L10nMixin(LitElement) {
  static ssr = false;
  static styles = styles;

  static properties = {
    docUrl: { type: String, attribute: "doc-url" },
    docTitle: { type: String, attribute: "doc-title" },
    _item: { state: true },
    _pending: { state: true },
    _lastAction: { state: true },
  };

  constructor() {
    super();
    this.docUrl = "";
    this.docTitle = "";
    /** @type {Partial<import("./types.js").NewItem> | undefined} */
    this._item = undefined;
    this._pending = false;
    /** @type {string | undefined} */
    this._lastAction = undefined;
  }

  _user = new Task(this, {
    task: async () => {
      const user = await globalUser();
      if (user.isAuthenticated) {
        this._bookmarks.run();
      }
      return user;
    },
  });

  _collections = new Task(this, {
    task: async () => {
      const res = await fetch("/api/v2/collections/");
      if (!res.ok) {
        throw new Error(`${res.status}: ${res.statusText}`);
      }
      return /** @type {import("./rust-types.js").MultipleCollectionInfo[]} */ (
        await res.json()
      );
    },
  });

  _bookmarks = new Task(this, {
    autoRun: false,
    args: () => [this.docUrl],
    task: async ([docUrl]) => {
      const res = await fetch(
        `/api/v2/collections/lookup/?url=${encodeURIComponent(docUrl)}`,
      );
      if (!res.ok) {
        throw new Error(`${res.status}: ${res.statusText}`);
      }
      const data =
        /** @type {import("./rust-types.js").MultipleCollectionLookupQueryResponse} */ (
          await res.json()
        );
      const entries = data?.results;
      const bookmarks =
        entries &&
        entries.map((entry) => {
          return { ...entry.item, collection_id: entry.collection_id };
        });
      if (bookmarks[0]) {
        const { collection_id, title, notes } = bookmarks[0];
        this._item = {
          collection_id,
          title,
          notes,
        };
      }
      return bookmarks;
    },
  });

  _open() {
    this._bookmarks.run();
    this._collections.run();
    this.shadowRoot?.querySelector("mdn-modal")?.showModal();
  }

  /** @param {Event} event */
  _selectChange({ target }) {
    if (target instanceof HTMLSelectElement) {
      const { value } = target;
      if (value === ADD_VALUE) {
        this.shadowRoot?.querySelector("mdn-modal")?.close();
        open("/en-US/plus/collections");
      } else {
        const item = this._bookmarks.value?.find(
          (item) => item.collection_id === value,
        );
        this._item = item || {
          collection_id: value,
        };
      }
    }
  }

  _cancel() {
    this.shadowRoot?.querySelector("mdn-modal")?.close();
  }

  async _delete() {
    const collectionId = this.shadowRoot?.querySelector("select")?.value;
    const item = this._bookmarks.value?.find(
      (item) => item.collection_id === collectionId,
    );
    if (collectionId && item) {
      this._pending = true;
      this._lastAction = "delete";

      const res = await fetch(
        `/api/v2/collections/${collectionId}/items/${item.id}/`,
        { method: "DELETE" },
      );
      if (!res.ok) {
        console.error(`${res.status}: ${res.statusText}`);
      }

      this.shadowRoot?.querySelector("mdn-modal")?.close();
      this._pending = false;
      this._bookmarks.run();
    }
  }

  async _submit() {
    const collectionId = this.shadowRoot?.querySelector("select")?.value;
    const item = this._bookmarks.value?.find(
      (item) => item.collection_id === collectionId,
    );
    if (collectionId) {
      this._pending = true;
      this._lastAction = "save";

      const url = `/api/v2/collections/${collectionId}/items/${item ? `${item.id}/` : ""}`;
      const res = await fetch(url, {
        body: JSON.stringify({
          url: this.docUrl,
          title: this.shadowRoot?.querySelector("input")?.value,
          notes: this.shadowRoot?.querySelector("textarea")?.value,
        }),
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
      });
      if (!res.ok) {
        console.error(`${res.status}: ${res.statusText}`);
      }

      this.shadowRoot?.querySelector("mdn-modal")?.close();
      this._pending = false;
      this._bookmarks.run();
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this._user.run();
  }

  /**
   * @param {import("lit").PropertyValues<this>} changedProperties
   */
  willUpdate(changedProperties) {
    if (changedProperties.has("docUrl") || changedProperties.has("docTitle")) {
      this._item = {
        url: this.docUrl,
        title: this.docTitle,
      };
    }
  }

  render() {
    const isCurrentInCollection =
      this._bookmarks.value?.some(
        (item) => item.collection_id === this._item?.collection_id,
      ) || false;
    return this._user.render({
      complete: (user) =>
        user.isAuthenticated
          ? html`
              <button
                class="collection-save-button"
                title=${this.l10n`Save in Collection`}
                @click=${this._open}
              >
                ${this._bookmarks.value?.length
                  ? bookmarkCheckSvg
                  : bookmarkSvg} <span>${this.l10n`Save`}</span>
              </button>
              <mdn-modal modal-title="Add to collection">
                ${this._bookmarks.render({
                  initial: () => html`<progress></progress>`,
                  pending: () => html`<progress></progress>`,
                  complete: (bookmarks) =>
                    this._collections.render({
                      initial: () => html`<progress></progress>`,
                      pending: () => html`<progress></progress>`,
                      complete: (collections) => html`
                        <label>
                          Collection:
                          <select
                            .value=${this._item?.collection_id}
                            @change=${this._selectChange}
                          >
                            ${collections.map(
                              (collection) => html`
                                <option
                                  value=${collection.id}
                                  ?selected=${collection.id ===
                                  this._item?.collection_id}
                                >
                                  ${bookmarks.some(
                                    (item) =>
                                      item.collection_id === collection.id,
                                  )
                                    ? "★"
                                    : "☆"}
                                  ${collection.name === "Default"
                                    ? "Saved Articles"
                                    : collection.name}
                                </option>
                              `,
                            )}
                            <option disabled role="separator">
                              ——————————
                            </option>
                            <option value=${ADD_VALUE}>+ New Collection</option>
                          </select>
                        </label>
                        <label>
                          Name:
                          <input .value=${this._item?.title || this.docTitle} />
                        </label>
                        <label>
                          Note:
                          <textarea
                            .value=${this._item?.notes || ""}
                          ></textarea>
                        </label>
                        <mdn-button @click=${this._submit}>
                          ${this._pending && this._lastAction === "save"
                            ? "Saving..."
                            : "Save"}
                        </mdn-button>
                        <mdn-button
                          @click=${this._cancel}
                          ?disabled=${this._pending}
                          variant="secondary"
                        >
                          Cancel
                        </mdn-button>
                        ${bookmarks?.length
                          ? html`<mdn-button
                              @click=${this._delete}
                              variant="invisible"
                              id="bookmark-delete"
                              ?disabled=${this._pending ||
                              !isCurrentInCollection}
                            >
                              ${this._pending && this._lastAction === "delete"
                                ? "Deleting..."
                                : "Delete"}
                            </mdn-button>`
                          : nothing}
                      `,
                    }),
                })}
              </mdn-modal>
            `
          : nothing,
    });
  }
}

customElements.define("mdn-collection-save-button", MDNCollectionSaveButton);
