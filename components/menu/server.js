import { html } from "@lit-labs/ssr";

import { ifDefined } from "lit/directives/if-defined.js";

import { ServerComponent } from "../server/index.js";

import { MISSING_DOCS, TABS } from "./constants.js";

export class Menu extends ServerComponent {
  /**
   * @param {import("@fred").Context} context
   */
  render(context) {
    /**
     * Holds the id of the tab being rendered.
     *
     * @type {string|null}
     */
    let currentTab = null;

    /**
     * Generates a Glean ID for menu/submenu links.
     *
     * @param {string} href - The href of the link.
     * @param {object} [options]
     * @param {boolean} [options.primary] - Whether this is the primary link (in the panel title).
     * @returns {string} the Glean ID.
     */
    const gleanId = (href, { primary = false } = {}) =>
      `${primary ? "menu_click_menu" : "menu_click_submenu"}: ${currentTab ?? "?"} -> ${href}`;

    /**
     * Renders a link to a page.
     *
     * @param {string} slug - The link slug (the part after `/en-US/docs/`!).
     * @param {string} text - The link text.
     * @param {object} [options]
     * @param {string} [options.label] - The title and aria-label of the link.
     * @param {boolean} [options.primary] - Whether this is the primary link (in the panel title).
     */
    const link = (slug, text, { label, primary = false } = {}) => {
      const locale =
        context.locale in MISSING_DOCS &&
        MISSING_DOCS[context.locale]?.includes(slug)
          ? "en-US"
          : context.locale;

      const href = `/${locale}/docs/${slug}`;

      return html`<a
        class=${ifDefined(
          locale === context.locale ? undefined : "only-in-en-us",
        )}
        href=${href}
        aria-label=${ifDefined(label)}
        title=${ifDefined(label)}
        data-glean-id=${gleanId(href, { primary })}
        >${text}</a
      >`;
    };

    return html`
      <nav class="menu">
        ${TABS.map((tab) => {
          currentTab = tab.id;
          const result = html`<div class="menu__tab" data-section=${tab.id}>
            ${"href" in tab
              ? html`<a
                  class="menu__tab-link"
                  href=${tab.href}
                  data-glean-id=${`menu_click_link: top-level -> ${tab.href}`}
                  >${tab.buttonText}</a
                >`
              : html`<mdn-dropdown>
                  <button
                    class="menu__tab-button"
                    type="button"
                    slot="button"
                    data-glean-id=${`menu_click_dropdown: ${tab.id}`}
                  >
                    ${typeof tab.buttonText === "string"
                      ? html`<span class="menu__tab-label"
                          >${tab.buttonText}</span
                        >`
                      : html`<span class="menu__tab-label" data-type="long"
                            >${tab.buttonText.long}</span
                          ><span class="menu__tab-label" data-type="short"
                            >${tab.buttonText.short}</span
                          >`}
                  </button>
                  <div class="menu__panel" slot="dropdown">
                    <p class="menu__panel-title">
                      ${tab.panelTitle.slug
                        ? link(tab.panelTitle.slug, tab.panelTitle.text, {
                            primary: true,
                          })
                        : tab.panelTitle.text}
                    </p>
                    <div class="menu__panel-content">
                      ${tab.panelGroups.map((group) => {
                        const items = html`<ul>
                          ${group.items.map(
                            (item) =>
                              html`<li>
                                ${"render" in item
                                  ? item.render()
                                  : "slug" in item
                                    ? link(item.slug, item.text, {
                                        label: item.label,
                                      })
                                    : html`<a
                                        class=${ifDefined(
                                          [
                                            item.icon && "menu__panel-icon",
                                            (!item.href.startsWith("/") &&
                                              "external") ||
                                              (context.locale !== "en-US" &&
                                                "only-in-en-us"),
                                          ]
                                            .filter(Boolean)
                                            .join(" "),
                                        )}
                                        data-icon=${ifDefined(item.icon)}
                                        href=${item.href}
                                        aria-label=${ifDefined(item.label)}
                                        title=${ifDefined(item.label)}
                                        data-glean-id=${gleanId(item.href)}
                                        >${item.text}</a
                                      >`}
                              </li>`,
                          )}
                        </ul>`;

                        return "title" in group
                          ? html`<dl>
                              <dt>${group.title}</dt>
                              <dd>${items}</dd>
                            </dl>`
                          : items;
                      })}
                    </div>
                  </div>
                </mdn-dropdown>`}
          </div>`;
          currentTab = null;
          return result;
        })}
      </nav>
    `;
  }
}
