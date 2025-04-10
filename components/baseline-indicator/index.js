import { html, nothing } from "lit";

import "./index.css";

/**
 * @type {{ name: string, browsers: Baseline.BrowserGroup[] }[]}
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
 * @type {Record<string, string> & Record<typeof DEFAULT_LOCALE, string>}}
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

/**
 *
 * @param {Fred.Context<Rari.DocPage>} context
 */
export function BaselineIndicator(context) {
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

  const isBrowserSupported = /** @param {Baseline.BrowserGroup} browser */ (
    browser,
  ) => {
    return browser.ids.map((id) => status.support?.[id]).every(Boolean);
  };

  const engineTitle = /** @param {Baseline.BrowserGroup[]} browsers */ (
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

    const formatter = new Intl.ListFormat(context.locale);
    const parts = [];

    if (supported.length > 0) {
      parts.push(
        context.l10n.raw({
          id: "baseline_supported_in",
          args: { browsers: formatter.format(supported) },
        }),
      );
    }

    if (unsupported.length > 0) {
      parts.push(
        context.l10n.raw({
          id: "baseline_not_widely_supported_in",
          args: { browsers: formatter.format(unsupported) },
        }),
      );
    }

    return parts.join(" ");
  };

  return html`<details
    class="baseline-indicator ${level}"
    data-glean-toggle-open="baseline_toggle_open"
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
      ${level === "high" && low_date
        ? html`<p>
            ${context.l10n.raw({
              id: "baseline_high_extra",
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
                id: "baseline_low_extra",
                args: {
                  date: low_date.toLocaleDateString(DEFAULT_LOCALE, {
                    year: "numeric",
                    month: "long",
                  }),
                },
              })}
            </p>`
          : html`<p>${context.l10n("baseline_not_extra")}</p>`}
      ${status.asterisk
        ? html`<p>
            ${context.l10n.raw({
              id: "baseline_asterisk",
              args: { asterisk: "*" },
            })}
          </p>`
        : nothing}
      <ul>
        <li>
          <a
            href=${`/${context.locale}/docs/Glossary/Baseline/Compatibility`}
            data-glean="baseline_link_learn_more"
            target="_blank"
            class="learn-more"
          >
            ${context.l10n`Learn more`}
          </a>
        </li>
        <li>
          <a href=${bcdLink} data-glean="baseline_link_bcd_table">
            ${context.l10n`See full compatibility`}
          </a>
        </li>
        <li>
          <a
            href=${feedbackLink}
            data-glean="baseline_link_feedback"
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
