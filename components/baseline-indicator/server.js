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

const SURVEY_URL =
  "https://survey.alchemer.com/s3/7634825/MDN-baseline-feedback";

/** @type {Record<string, { url: string, votes: number }>} */
let signalsData = {};

try {
  const signalsRes = await fetch(
    "https://web-platform-dx.github.io/developer-signals/web-features-signals.json",
  );
  signalsData = await signalsRes.json();
} catch {
  // noop
}

export class BaselineIndicator extends ServerComponent {
  static inlineScript = inlineScript;

  /**
   *
   * @param {import("@fred").Context<import("@rari").DocPage>} context
   */
  render(context) {
    const { doc } = context;

    if (!doc) {
      return nothing;
    }

    const status = doc.baseline;

    if (!status) {
      return nothing;
    }

    const bcdLink = `#${
      LOCALIZED_BCD_IDS[context.locale] || LOCALIZED_BCD_IDS[DEFAULT_LOCALE]
    }`;

    const low_date_range = status.baseline_low_date?.match(/^([^0-9])/)?.[0];
    const low_date = status.baseline_low_date
      ? new Date(status.baseline_low_date.slice(low_date_range ? 1 : 0))
      : undefined;

    const level = status.baseline || "not";

    const feedbackLink = `${SURVEY_URL}?page=${encodeURIComponent(context.url)}&level=${level}`;

    const signalsLink = signalsData[status.feature.id]?.url;

    const isBrowserSupported =
      /** @param {import("./types.js").BrowserGroup} browser */ (browser) => {
        return browser.ids.map((id) => status.support?.[id]).every(Boolean);
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
      class="baseline-indicator ${level}"
      data-glean-toggle-open="baseline_toggle_open"
      ?open=${openByDefault}
      ?data-open-by-default=${openByDefault}
    >
      <summary>
        <span
          class="indicator"
          role="img"
          aria-label=${level === "not"
            ? context.l10n`Baseline Cross`
            : context.l10n`Baseline Check`}
        ></span>
        <div class="status-title">
          ${level === "not"
            ? html`<span class="not-bold"
                >${context.l10n`Limited availability`}</span
              >`
            : html`
                ${context.l10n`Baseline`}
                <span class="not-bold">
                  ${level === "high"
                    ? context.l10n`Widely available`
                    : low_date?.getFullYear()}
                </span>
                ${status.asterisk && " *"}
              `}
        </div>
        ${level === "low"
          ? html`<div class="pill">${context.l10n`Newly available`}</div>`
          : nothing}
        <div class="browsers">
          ${ENGINES.map(
            ({ name, browsers }) =>
              html`<span
                key=${name}
                class="engine"
                title=${engineTitle(browsers)}
              >
                ${browsers.map(
                  (browser) =>
                    html`<span
                      key=${browser.ids[0]}
                      class=${`browser ${browser.ids[0]} ${
                        isBrowserSupported(browser) ? "supported" : ""
                      }`}
                      role="img"
                      aria-label=${`${browser.name} ${isBrowserSupported(browser) ? context.l10n`check` : context.l10n`cross`}`}
                    ></span>`,
                )}
              </span>`,
          )}
        </div>
        <span class="icon icon-chevron"></span>
      </summary>
      <div class="extra">
        ${signalsLink
          ? html`<p>
              ${context.l10n.raw({
                id: "baseline-signals",
                elements: {
                  link: {
                    tag: "a",
                    href: signalsLink,
                    target: "_blank",
                    "data-glean-id": "baseline_link_signals",
                  },
                },
              })}
            </p>`
          : nothing}
        ${level === "high" && low_date
          ? html`<p>
              ${context.l10n.raw({
                id: "baseline-high-extra",
                args: {
                  date: low_date.toLocaleDateString(context.locale, {
                    year: "numeric",
                    month: "long",
                  }),
                },
              })}
            </p>`
          : level === "low" && low_date
            ? html`<p>
                ${context.l10n.raw({
                  id: "baseline-low-extra",
                  args: {
                    date: low_date.toLocaleDateString(DEFAULT_LOCALE, {
                      year: "numeric",
                      month: "long",
                    }),
                  },
                })}
              </p>`
            : html`<p>${context.l10n("baseline-not-extra")}</p>`}
        ${status.asterisk
          ? html`<p>* ${context.l10n("baseline-asterisk")}</p>`
          : nothing}
        <ul>
          <li>
            <a
              href=${`/${context.locale}/docs/Glossary/Baseline/Compatibility`}
              data-glean-id="baseline_link_learn_more"
              target="_blank"
              class="learn-more"
            >
              ${context.l10n`Learn more`}
            </a>
          </li>
          <li>
            <a href=${bcdLink} data-glean-id="baseline_link_bcd_table">
              ${context.l10n`See full compatibility`}
            </a>
          </li>
          <li>
            <a
              href=${feedbackLink}
              data-glean-id="baseline_link_feedback"
              class="feedback-link"
              target="_blank"
              rel="noreferrer"
            >
              ${context.l10n`Report feedback`}
            </a>
          </li>
        </ul>
      </div>
    </details>`;
  }
}
