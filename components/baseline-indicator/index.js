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

  const level =
    // @ts-expect-error Check whether baseline can be false.
    status.baseline ?? (status.baseline === false ? "not" : undefined);

  const feedbackLink = `${SURVEY_URL}?page=${encodeURIComponent(context.url)}&level=${level}`;

  const supported = /** @param {Baseline.BrowserGroup} browser */ (browser) => {
    return browser.ids.map((id) => status.support?.[id]).every(Boolean);
  };

  const engineTitle = /** @param {Baseline.BrowserGroup[]} browsers */ (
    browsers,
  ) =>
    browsers
      .map((browser, index, array) => {
        // @ts-expect-error Understand why this works in yari, but not here.
        const previous = index > 0 ? supported(array[index - 1]) : undefined;
        const current = supported(browser);
        const name = browser.name;
        return previous === undefined
          ? current
            ? `Supported in ${name}`
            : `Not widely supported in ${name}`
          : current === previous
            ? ` and ${name}`
            : current
              ? `, and supported in ${name}`
              : `, and not widely supported in ${name}`;
      })
      .join("");

  return html`<details
    class="baseline-indicator ${level}"
    data-glean-toggle-open="baseline_toggle_open"
  >
    <summary>
      <span
        class="indicator"
        role="img"
        aria-label=${level === "not" ? "Baseline Cross" : "Baseline Check"}
      ></span>
      <div class="status-title">
        ${level === "not"
          ? html`<span class="not-bold">Limited availability</span>`
          : html`
              Baseline
              <span class="not-bold">
                ${level === "high"
                  ? "Widely available"
                  : low_date?.getFullYear()}
              </span>
              ${status.asterisk && " *"}
            `}
      </div>
      ${level === "low"
        ? html`<div class="pill">Newly available</div>`
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
                      supported(browser) ? "supported" : ""
                    }`}
                    role="img"
                    aria-label=${`${browser.name} ${supported(browser) ? "check" : "cross"}`}
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
            This feature is well established and works across many devices and
            browser versions. It’s been available across browsers since
            ${low_date.toLocaleDateString(DEFAULT_LOCALE, {
              year: "numeric",
              month: "long",
            })}
            .
          </p>`
        : level === "low" && low_date
          ? html`<p>
              Since
              ${low_date.toLocaleDateString(DEFAULT_LOCALE, {
                year: "numeric",
                month: "long",
              })}
              , this feature works across the latest devices and browser
              versions. This feature might not work in older devices or
              browsers.
            </p>`
          : html`<p>
              This feature is not Baseline because it does not work in some of
              the most widely-used browsers.
            </p>`}
      ${status.asterisk
        ? html`<p>
            * Some parts of this feature may have varying levels of support.
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
            Learn more
          </a>
        </li>
        <li>
          <a href=${bcdLink} data-glean="baseline_link_bcd_table">
            See full compatibility
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
            Report feedback
          </a>
        </li>
      </ul>
    </div>
  </details>`;
}
