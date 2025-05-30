import { LitElement, html } from "lit";

import styles from "./element.css?lit";

/** @import { ContributorData } from "./types.d.ts" */

export class MDNContributorList extends LitElement {
  static ssr = false;

  static properties = {
    _contributors: { state: true },
  };

  static styles = styles;

  constructor() {
    super();
    /** @type {ContributorData[]} */
    this._contributors = [];
  }

  _onChildrenChanged() {
    const contributorList = this.querySelector("ul");
    /** @type {ContributorData[]} */
    const randomContributors = [];
    if (contributorList) {
      const contributors = [...contributorList.querySelectorAll("li")];
      for (let index = 0; index < 8; index++) {
        const contributor = popRandom(contributors);
        if (!contributor) {
          break;
        }
        const [name, github, org] = [...contributor.childNodes].map(
          (node) => node?.textContent?.trim() || undefined,
        );
        if (!name || !github) {
          index--;
          continue;
        }
        randomContributors.push({
          name,
          github,
          org,
        });
      }
      this._contributors = randomContributors;
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this._onChildrenChanged();
    new MutationObserver(() => this._onChildrenChanged()).observe(this, {
      subtree: true,
      childList: true,
      characterData: true,
    });
  }

  render() {
    return html`<div class="wrap">
      <div class="inner">
        <ul>
          <svg>
            <defs>
              <mask id="hide-half">
                <rect
                  x="0%"
                  y="0%"
                  width="100%"
                  height="100%"
                  fill="#fff"
                  stroke="#fff"
                />
              </mask>
            </defs>
            <ellipse
              rx="100%"
              ry="50%"
              cx="100%"
              cy="50%"
              mask="url(#hide-half)"
            />
            <ellipse
              rx="50%"
              ry="25%"
              cx="100%"
              cy="50%"
              mask="url(#hide-half)"
            />
          </svg>
          ${this._contributors.map(({ name, github, org }) => {
            const imgSrc = `https://avatars.githubusercontent.com/${github
              ?.split("/")
              .slice(-1)}`;
            return html`<li>
              <a href=${github} target="_blank" rel="nofollow noreferrer">
                <img
                  src="${imgSrc}?size=80"
                  srcset="${imgSrc}?size=160 2x"
                  loading="lazy"
                  referrerpolicy="no-referrer"
                />
                ${name}
              </a>
              <span class="org">${org}</span>
            </li>`;
          })}
        </ul>
      </div>
    </div>`;
  }
}

customElements.define("mdn-contributor-list", MDNContributorList);

/**
 * @template T
 * @param {Array<T>} array
 */
function popRandom(array) {
  const i = Math.floor(Math.random() * array.length);
  // mutate the array:
  return array.splice(i, 1)[0];
}
