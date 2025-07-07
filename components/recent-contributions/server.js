import { html } from "lit";

import { ServerComponent } from "../server/index.js";

export class RecentContributions extends ServerComponent {
  /**
   * @param {import("@rari").HomePageRecentContribution[]} contributions
   * @param {string} locale
   */
  render(contributions, locale) {
    const rtf = new Intl.RelativeTimeFormat(locale);
    const now = Date.now();
    return html`<ul class="recent-contributions">
      ${contributions.map(
        (contribution, index) =>
          html`<li class="recent-contributions__item">
            <span class="recent-contributions__repo">
              <a
                class="external"
                href=${contribution.repo.url}
                data-glean=${`homepage: contribution_repo ${index + 1}`}
                >${contribution.repo.name}</a
              >
            </span>
            <time
              class="recent-contributions__date"
              datetime=${contribution.updated_at}
            >
              ${rtf.format(
                ...getRelativeTime(
                  (Date.parse(contribution.updated_at) - now) / 1000,
                ),
              )}
            </time>
            <div class="recent-contributions__title">
              <a class="external" href=${contribution.url}
                >${contribution.title}</a
              >
            </div>
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
