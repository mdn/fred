import { Task } from "@lit/task";
import { LitElement, html } from "lit";

import { L10nMixin } from "../../l10n/mixin.js";

import styles from "./element.css?lit";

export class MDNNotFound extends L10nMixin(LitElement) {
  static ssr = false;

  static styles = styles;

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
      <p>Sorry, the page <code>${url}</code> could not be found.</p>

      ${this._fallback.render({
        complete: (doc) => {
          if (doc) {
            return html`<div class="notecard tip">
              <p>
                <strong>Good news:</strong> The page you requested exists in
                <em>English</em>.
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
            const locale = location.pathname.split("/").at(1);
            const locationParts = location.pathname
              .split("/")
              .filter((part) => part && ![locale, "docs"].includes(part));
            const normalizedLocationParts = locationParts
              .map((part) => part.replaceAll("_", " "))
              .reverse();

            return html`<div class="notecard note">
              <p>The page you requested doesn't exist, but you could try a site search
              for:
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
              </ul></p>
            </div>`;
          }
        },
      })}

      <p>
        <a href="/">Go back to the home page</a>
      </p>
    `;
  }
}
customElements.define("mdn-not-found", MDNNotFound);
