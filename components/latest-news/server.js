import { html, nothing } from "lit";

import { ServerComponent } from "../server/index.js";

export class LatestNews extends ServerComponent {
  /**
   * @param {import("@rari").HomePageLatestNewsItem[]} items
   * @param {string} locale
   */
  render(items, locale) {
    const rtf = new Intl.RelativeTimeFormat(locale);
    const now = Date.now();

    return html`<ul class="latest-news">
      ${items.map(
        (item) =>
          html`<li>
            <article class="latest-news__item">
              ${item.source
                ? html`<a class="latest-news__source" href=${item.source.url}
                    >${item.source.name}</a
                  >`
                : nothing}
              <h3 class="latest-news__title">
                <a href=${item.url}>${item.title}</a>
              </h3>
              <time class="latest-news__date" datetime=${item.published_at}>
                ${rtf.format(
                  ...getRelativeTime(
                    (Date.parse(item.published_at) - now) / 1000,
                  ),
                )}
              </time>
              <p class="latest-news__summary">${item.summary}</p>
            </article>
          </li>`,
      )}
    </ul>`;
  }
}

/**
 *
 * @param {number} seconds
 * @returns {[number, Intl.RelativeTimeFormatUnit]}
 */
function getRelativeTime(seconds) {
  /** @type {Array<{amount: number, unit: Intl.RelativeTimeFormatUnit}>} */
  const divisions = [
    { amount: 60, unit: "second" },
    { amount: 60, unit: "minute" },
    { amount: 24, unit: "hour" },
    { amount: 7, unit: "day" },
    { amount: 4.345_24, unit: "week" }, // 365/12/7
    { amount: 12, unit: "month" },
    { amount: Number.POSITIVE_INFINITY, unit: "year" },
  ];

  let duration = seconds;
  for (const division of divisions) {
    if (Math.abs(duration) < division.amount) {
      return [Math.round(duration), division.unit];
    }
    duration /= division.amount;
  }

  return [0, "year"];
}
