import { Task } from "@lit/task";
import { LitElement, html } from "lit";

import { L10nMixin } from "../../l10n/mixin.js";

import styles from "./element.css?lit";
import { pathToLocale } from "./utils.js";

export class MDNNotFound extends L10nMixin(LitElement) {
  // Need location (not available server-side).
  static ssr = false;

  static styles = styles;

  /** @type {Task<?,import("@rari").Doc|null>} */
  _fallback = new Task(this, {
    task: async () => {
      const url = location.pathname;
      if (url && url.includes("/docs/") && !url.includes("/en-US/")) {
        const enUSURL =
          "/en-US/" + url.split("/").slice(2).join("/") + "/index.json";

        const response = await fetch(enUSURL);
        if (response.ok) {
          /** @type {{ doc: import("@rari").Doc}} */
          const { doc } = await response.json();
          return doc;
        }
      }

      return null;
    },
  });

  connectedCallback() {
    super.connectedCallback();
    this._fallback.run();
  }

  render() {
    const url = location.pathname;

    return html`
      <p>
        ${this.l10n.raw({
          id: "not-found-description",
          args: { url },
          elements: { url: { tag: "code" } },
        })}
      </p>

      ${this._fallback.render({
        complete: (doc) => {
          if (doc) {
            return html`<div class="notecard tip">
              <p>
                ${this.l10n.raw({
                  id: "not-found-fallback-english",
                  elements: { strong: { tag: "strong" }, em: { tag: "em" } },
                })}
              </p>
              <p>
                <a href=${doc.mdn_url}>
                  <b>${doc.title}</b>
                  <br />
                  <small>${doc.mdn_url}</small>
                </a>
              </p>
            </div>`;
          } else {
            const locale = pathToLocale(location.pathname);
            const locationParts = location.pathname
              .split("/")
              .filter((part) => part && ![locale, "docs"].includes(part));
            const normalizedLocationParts = locationParts
              .map((part) => part.replaceAll("_", " "))
              .reverse();

            return html`<div class="notecard note">
              <p>${this.l10n("not-found-fallback-search")}</p>
              <ul>
                ${normalizedLocationParts.map(
                  (part) =>
                    html`<li>
                      <a
                        href=${`/${locale}/search?q=${encodeURIComponent(part)}`}
                      >
                        <code>${part}</code>
                      </a>
                    </li>`,
                )}
              </ul>
            </div>`;
          }
        },
      })}
    `;
  }
}
customElements.define("mdn-not-found", MDNNotFound);
