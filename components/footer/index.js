import { html } from "lit";

import bluesky from "../icon/bluesky.svg?lit";
import github from "../icon/github.svg?lit";
import mastodon from "../icon/mastodon.svg?lit";
import rss from "../icon/rss.svg?lit";
import x from "../icon/x.svg?lit";

import { ServerComponent } from "../server.js";

import mdn from "./mdn.svg?lit";
import mozilla from "./mozilla.svg?lit";

export class Footer extends ServerComponent {
  /**
   * @param {Fred.Context} context
   */
  render(context) {
    return html`<div class="footer">
      <div class="footer__mdn">
        <div class="footer__intro">
          <a class="footer__logo" href="/">${mdn}</a>
          <p>
            ${context.l10n(
              "footer_tagline",
            )`Your blueprint for a better internet.`}
          </p>
        </div>
        <ul class="footer__socials">
          <li>
            <a
              href="https://github.com/mdn/"
              aria-label=${context.l10n`MDN on GitHub`}
            >
              ${github}
            </a>
          </li>
          <li>
            <a
              href="https://bsky.app/profile/developer.mozilla.org"
              aria-label=${context.l10n`MDN on Bluesky`}
            >
              ${bluesky}
            </a>
          </li>
          <li>
            <a
              href="https://x.com/mozdevnet"
              aria-label=${context.l10n`MDN on X`}
            >
              ${x}
            </a>
          </li>
          <li>
            <a
              href="https://mastodon.social/@mdn"
              aria-label=${context.l10n`MDN on Mastodon`}
            >
              ${mastodon}
            </a>
          </li>
          <li>
            <a
              href="/en-US/blog/rss.xml"
              aria-label=${context.l10n`MDN blog RSS feed`}
            >
              ${rss}
            </a>
          </li>
        </ul>
        <dl class="footer__links">
          <dt>${context.l10n`MDN`}</dt>
          <dd>
            <ul>
              <li><a href="/en-US/about">${context.l10n`About`}</a></li>
              <li><a href="/en-US/blog/">${context.l10n`Blog`}</a></li>
              <li>
                <a href="https://www.mozilla.org/en-US/careers/listings/"
                  >${context.l10n`Careers`}</a
                >
              </li>
              <li>
                <a href="/en-US/advertising"
                  >${context.l10n`Advertise with us`}</a
                >
              </li>
            </ul>
          </dd>
        </dl>
        <dl class="footer__links">
          <dt>${context.l10n`Support`}</dt>
          <dd>
            <ul>
              <li>
                <a href="https://support.mozilla.org/products/mdn-plus"
                  >${context.l10n`Product help`}</a
                >
              </li>
              <li>
                <a href="/en-US/docs/MDN/Community/Issues"
                  >${context.l10n`Report an issue`}</a
                >
              </li>
            </ul>
          </dd>
        </dl>
        <dl class="footer__links">
          <dt>${context.l10n`Our communities`}</dt>
          <dd>
            <ul>
              <li>
                <a href="/en-US/community">${context.l10n`MDN Community`}</a>
              </li>
              <li>
                <a href="https://discourse.mozilla.org/c/mdn/236"
                  >${context.l10n`MDN Forum`}</a
                >
              </li>
              <li><a href="/discord">${context.l10n`MDN Chat`}</a></li>
            </ul>
          </dd>
        </dl>
        <dl class="footer__links">
          <dt>${context.l10n`Developers`}</dt>
          <dd>
            <ul>
              <li>
                <a href="/en-US/docs/Web">${context.l10n`Web Technologies`}</a>
              </li>
              <li>
                <a href="/en-US/docs/Learn"
                  >${context.l10n`Learn Web Development`}</a
                >
              </li>
              <li><a href="/en-US/plus">${context.l10n`MDN Plus`}</a></li>
              <li>
                <a href="https://hacks.mozilla.org/"
                  >${context.l10n`Hacks Blog`}</a
                >
              </li>
            </ul>
          </dd>
        </dl>
      </div>
      <div class="footer__mozilla">
        <a class="footer__logo" href="https://www.mozilla.org/">${mozilla}</a>
        <ul>
          <li>
            <a href="https://www.mozilla.org/privacy/websites/"
              >${context.l10n`Website Privacy Notice`}</a
            >
          </li>
          <li>
            <a href="https://www.mozilla.org/privacy/websites/cookie-settings/"
              >${context.l10n`Cookies`}</a
            >
          </li>
          <li>
            <a href="https://www.mozilla.org/about/legal/terms/mozilla"
              >${context.l10n`Legal`}</a
            >
          </li>
          <li>
            <a
              href="https://www.mozilla.org/about/governance/policies/participation/"
              >${context.l10n`Community Participation Guidelines`}</a
            >
          </li>
        </ul>
        <p>
          ${context.l10n.raw({
            id: "footer_mofo",
            elements: {
              moco: { tag: "a", href: "https://www.mozilla.org/" },
              mofo: { tag: "a", href: "https://foundation.mozilla.org/" },
            },
          })}<br />
          ${context.l10n.raw({
            id: "footer_copyright",
            elements: {
              cc: {
                tag: "a",
                href: "/docs/MDN/Writing_guidelines/Attrib_copyright_license",
              },
            },
          })}
        </p>
      </div>
    </div> `;
  }
}
