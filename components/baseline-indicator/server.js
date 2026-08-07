import { html } from "@lit-labs/ssr";
import { nothing } from "lit";

import { ServerComponent } from "../server/index.js";

import inlineScript from "./inline.js?source&csp=true";

/**
 * @type {{ name: string, browsers: import("./types.js").BrowserGroup[] }[]}
 */
const ENGINES = [
  {
    name: "Blink",
    browsers: [
      { name: "Chrome", ids: ["chrome", "chrome_android"] },
      { name: "Edge", ids: ["edge"] },
    ],
  },
  {
    name: "Gecko",
    browsers: [{ name: "Firefox", ids: ["firefox", "firefox_android"] }],
  },
  {
    name: "WebKit",
    browsers: [{ name: "Safari", ids: ["safari", "safari_ios"] }],
  },
];

const DEFAULT_LOCALE = "en-US";

/**
 * @type {Record<string, string>}
 */
const LOCALIZED_BCD_IDS = {
  de: "browser-kompatibilität",
  "en-US": "browser_compatibility",
  es: "compatibilidad_con_navegadores",
  fr: "compatibilité_des_navigateurs",
  ja: "ブラウザーの互換性",
  ko: "브라우저_호환성",
  "pt-BR": "compatibilidade_com_navegadores",
  ru: "совместимость_с_браузерами",
  "zh-CN": "浏览器兼容性",
  "zh-TW": "瀏覽器相容性",
};

export class BaselineIndicator extends ServerComponent {
  static inlineScript = inlineScript;

  /**
   * @param {string | null | undefined} date
   */
  parseDate(date) {
    const lowDateRange = date?.match(/^([^0-9])/)?.[0];
    return date ? new Date(date.slice(lowDateRange ? 1 : 0)) : undefined;
  }

  /**
   * @param {import("@fred").Context<import("@rari").DocPage>} context
   * @param {boolean} [simple]
   */
  normalizeData(context, simple = false) {
    const { doc } = context;

    if (!doc) {
      return;
    }

    const status = doc.status?.baseline;
    const baseline = doc.baseline;

    if (!status || !baseline) {
      return;
    }

    if (status === "discouraged" || status === "removing") {
      return;
    }

    const { baseline_low_date, asterisk, feature, support } = baseline;
    const lowDate = this.parseDate(baseline_low_date);
    const signalsLink = simple ? undefined : feature.developer_signals?.url;

    const titleText =
      status === "limited"
        ? context.l10n(
            "baseline-indicator-limited-availability",
          )`Limited availability`
        : context.l10n("baseline-indicator-baseline")`Baseline`;

    const statusText =
      status === "high"
        ? context.l10n("baseline-indicator-widely-available")`Widely available`
        : status === "low"
          ? context.l10n("baseline-indicator-newly-available")`Newly available`
          : undefined;

    const extraText = [];

    if (lowDate) {
      if (status === "high") {
        extraText.push(
          context.l10n.raw({
            id: "baseline-high-extra",
            args: {
              date: lowDate.toLocaleDateString(context.locale, {
                year: "numeric",
                month: "long",
              }),
            },
          }),
        );
      } else if (status === "low") {
        extraText.push(
          context.l10n.raw({
            id: "baseline-low-extra",
            args: {
              date: lowDate.toLocaleDateString(context.locale, {
                year: "numeric",
                month: "long",
              }),
            },
          }),
        );
      }
    }
    if (status === "limited") {
      extraText.push(context.l10n("baseline-not-extra"));
    }

    if (signalsLink) {
      extraText.push(
        context.l10n.raw({
          id: "baseline-signals",
          elements: {
            link: {
              tag: "a",
              href: signalsLink,
              target: "_blank",
              rel: "noopener",
              "data-glean-id": "baseline_link_signals",
            },
          },
        }),
      );
    }

    return {
      status,
      lowDate,
      asterisk,
      support,
      signalsLink,
      extraText,
      titleText,
      statusText,
    };
  }

  /**
   * @param {import("@fred").Context<import("@rari").DocPage>} context
   */
  render(context) {
    const data = this.normalizeData(context);

    if (!data) {
      return nothing;
    }

    const {
      status,
      lowDate,
      asterisk,
      support,
      signalsLink,
      extraText,
      titleText,
      statusText,
    } = data;

    const bcdLink = `#${
      LOCALIZED_BCD_IDS[context.locale] || LOCALIZED_BCD_IDS[DEFAULT_LOCALE]
    }`;

    const isBrowserSupported =
      /** @param {import("./types.js").BrowserGroup} browser */ (browser) => {
        return browser.ids.map((id) => support?.[id]).every(Boolean);
      };

    const engineTitle =
      /** @param {import("./types.js").BrowserGroup[]} browsers */ (
        browsers,
      ) => {
        const supported = [];
        const unsupported = [];

        for (const browser of browsers) {
          if (isBrowserSupported(browser)) {
            supported.push(browser.name);
          } else {
            unsupported.push(browser.name);
          }
        }

        const formatter =
          supported.length > 1 || unsupported.length > 1
            ? new Intl.ListFormat(context.locale)
            : { format: /** @param {string[]} list */ (list) => list.at(0) };

        if (supported.length > 0 && unsupported.length > 0) {
          return context.l10n.raw({
            id: "baseline-supported-and-unsupported-in",
            args: {
              supported: formatter.format(supported),
              unsupported: formatter.format(unsupported),
            },
          });
        } else if (supported.length > 0) {
          return context.l10n.raw({
            id: "baseline-supported-in",
            args: { browsers: formatter.format(supported) },
          });
        } else if (unsupported.length > 0) {
          return context.l10n.raw({
            id: "baseline-unsupported-in",
            args: { browsers: formatter.format(unsupported) },
          });
        } else {
          return "";
        }
      };

    const openByDefault = Boolean(signalsLink);

    return html`<details
      class="baseline-indicator ${status}"
      data-glean-toggle-open="baseline_toggle_open"
      ?open=${openByDefault}
      ?data-open-by-default=${openByDefault}
    >
      <summary>
        <span
          class="indicator"
          role="img"
          aria-label=${
            status === "limited"
              ? context.l10n(
                  "baseline-indicator-baseline-cross",
                )`Baseline Cross`
              : context.l10n(
                  "baseline-indicator-baseline-check",
                )`Baseline Check`
          }
        ></span>
        <div class="status-title">
          ${
            status === "limited"
              ? html`<span class="not-bold">${titleText}</span>`
              : html`
                  ${titleText}
                  <span class="not-bold">
                    ${status === "high" ? statusText : lowDate?.getFullYear()}
                  </span>
                  ${asterisk && " *"}
                `
          }
        </div>
        ${
          status === "low"
            ? html`<div class="pill">${statusText}</div>`
            : nothing
        }
        <div class="browsers">
          ${ENGINES.map(
            ({ browsers }) =>
              html`<span class="engine" title=${engineTitle(browsers)}>
                ${browsers.map(
                  (browser) =>
                    html`<span
                      class=${`browser ${browser.ids[0]} ${
                        isBrowserSupported(browser) ? "supported" : ""
                      }`}
                      role="img"
                      aria-label=${`${browser.name} ${isBrowserSupported(browser) ? context.l10n("baseline-indicator-check")`check` : context.l10n("baseline-indicator-cross")`cross`}`}
                    ></span>`,
                )}
              </span>`,
          )}
        </div>
        <span class="icon icon-chevron"></span>
      </summary>
      <div class="extra">
        ${extraText.map((text) => html`<p>${text}</p>`)}
        ${
          asterisk
            ? html`<p>* ${context.l10n("baseline-asterisk")}</p>`
            : nothing
        }
        <ul>
          <li>
            <a
              href=${`/${context.locale}/docs/Glossary/Baseline/Compatibility`}
              data-glean-id="baseline_link_learn_more"
              target="_blank"
              class="learn-more"
            >
              ${context.l10n("baseline-indicator-learn-more")`Learn more`}
            </a>
          </li>
          <li>
            <a href=${bcdLink} data-glean-id="baseline_link_bcd_table">
              ${context.l10n(
                "baseline-indicator-see-full-compatibility",
              )`See full compatibility`}
            </a>
          </li>
        </ul>
      </div>
    </details>`;
  }

  /**
   * @param {import("@fred").Context<import("@rari").DocPage>} context
   */
  renderSimplified(context) {
    const data = this.normalizeData(context, true);

    if (!data) {
      return nothing;
    }

    const { status, lowDate, asterisk, extraText, titleText, statusText } =
      data;

    return html`<p>
      <strong>
        ${titleText}
        ${
          status === "high"
            ? statusText
            : status === "low"
              ? html`${lowDate?.getFullYear()} ${statusText}`
              : nothing
        }
        ${asterisk ? " *" : nothing}
      </strong>
      <br />
      ${extraText}
      ${asterisk ? html`<br />* ${context.l10n("baseline-asterisk")}` : nothing}
    </p>`;
  }
}
