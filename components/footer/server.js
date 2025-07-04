import { html } from "lit";

import { ServerComponent } from "../server/index.js";

import mdnLogo from "./mdn.svg?lit";
import mozillaLogo from "./mozilla.svg?lit";

/**
 *
 * @param {import("@fred").L10nContext} context
 */
const socials = (context) => [
  {
    icon: "github",
    href: "https://github.com/mdn/",
    ariaLabel: context.l10n`MDN on GitHub`,
  },
  {
    icon: "bluesky",
    href: "https://bsky.app/profile/developer.mozilla.org",
    ariaLabel: context.l10n`MDN on Bluesky`,
  },
  {
    icon: "x",
    href: "https://x.com/mozdevnet",
    ariaLabel: context.l10n`MDN on X`,
  },
  {
    icon: "mastodon",
    href: "https://mastodon.social/@mdn",
    ariaLabel: context.l10n`MDN on Mastodon`,
  },
  {
    icon: "rss",
    href: "/en-US/blog/rss.xml",
    ariaLabel: context.l10n`MDN blog RSS feed`,
  },
];

/**
 *
 * @param {import("@fred").L10nContext} context
 */
const links = (context) => [
  {
    title: context.l10n`MDN`,
    links: [
      { text: context.l10n`About`, href: "/en-US/about" },
      { text: context.l10n`Blog`, href: "/en-US/blog/" },
      {
        text: context.l10n`Careers`,
        href: "https://www.mozilla.org/en-US/careers/listings/",
        external: true,
      },
      {
        text: context.l10n`Advertise with us`,
        href: "/en-US/advertising",
      },
      { text: context.l10n`MDN Plus`, href: "/en-US/plus" },
      {
        text: context.l10n`Product help`,
        href: "https://support.mozilla.org/products/mdn-plus",
        external: true,
      },
    ],
  },
  {
    title: context.l10n`Contribute`,
    links: [
      {
        text: context.l10n`MDN Community`,
        href: "/en-US/community",
      },
      {
        text: context.l10n`Community resources`,
        href: "/en-US/docs/MDN/Community",
      },
      {
        text: context.l10n`Writing guidelines`,
        href: "/en-US/docs/MDN/Writing_guidelines",
      },
      { text: context.l10n`MDN Discord`, href: "/discord", external: true },
      {
        text: context.l10n`MDN on GitHub`,
        href: "https://github.com/mdn",
        external: true,
      },
    ],
  },
  {
    title: context.l10n`Developers`,
    links: [
      {
        text: context.l10n`Web Technologies`,
        href: "/en-US/docs/Web",
      },
      {
        text: context.l10n`Learn Web Development`,
        href: "/en-US/docs/Learn_web_development",
      },
      {
        text: context.l10n`Guides`,
        href: "/en-US/docs/MDN/Guides",
      },
      {
        text: context.l10n`Tutorials`,
        href: "/en-US/docs/MDN/Tutorials",
      },
      {
        text: context.l10n`Glossary`,
        href: "/en-US/docs/Glossary",
      },
      {
        text: context.l10n`Hacks Blog`,
        href: "https://hacks.mozilla.org/",
        external: true,
      },
    ],
  },
];

/**
 * @param {import("@fred").L10nContext} context
 */
const mozillaLinks = (context) => [
  {
    text: context.l10n`Website Privacy Notice`,
    href: "https://www.mozilla.org/privacy/websites/",
    external: true,
  },
  {
    text: context.l10n`Cookies`,
    href: "https://www.mozilla.org/privacy/websites/cookie-settings/",
    external: true,
  },
  {
    text: context.l10n`Legal`,
    href: "https://www.mozilla.org/about/legal/terms/mozilla",
    external: true,
  },
  {
    text: context.l10n`Community Participation Guidelines`,
    href: "https://www.mozilla.org/about/governance/policies/participation/",
    external: true,
  },
];

export class Footer extends ServerComponent {
  /**
   * @param {import("@fred").Context} context
   */
  render(context) {
    return html`
      <mdn-placement-bottom></mdn-placement-bottom>
      <footer class="footer">
        <div class="footer__mdn">
          <div class="footer__intro">
            <a
              class="footer__logo"
              href="/"
              aria-label=${context.l10n`MDN logo`}
              >${mdnLogo}</a
            >
            <p>
              ${context.l10n(
                "footer-tagline",
              )`Your blueprint for a better internet.`}
            </p>
          </div>

          <ul class="footer__socials">
            ${socials(context).map(
              (item) => html`
                <li>
                  <a
                    href=${item.href}
                    aria-label=${item.ariaLabel}
                    data-icon=${item.icon}
                  ></a>
                </li>
              `,
            )}
          </ul>

          ${links(context).map(
            (group) => html`
              <dl class="footer__links">
                <dt>${group.title}</dt>
                <dd>
                  <ul>
                    ${group.links.map(
                      (link) => html`
                        <li>
                          <a
                            href=${link.href}
                            class=${link.external ? "external" : ""}
                            >${link.text}</a
                          >
                        </li>
                      `,
                    )}
                  </ul>
                </dd>
              </dl>
            `,
          )}
        </div>

        <div class="footer__mozilla">
          <a
            class="footer__logo"
            href="https://www.mozilla.org/"
            aria-label=${context.l10n`Mozilla logo`}
            >${mozillaLogo}</a
          >
          <ul>
            ${mozillaLinks(context).map(
              (item) => html`
                <li>
                  <a href=${item.href} class=${item.external ? "external" : ""}
                    >${item.text}</a
                  >
                </li>
              `,
            )}
          </ul>
          <p>
            ${context.l10n.raw({
              id: "footer-mofo",
              elements: {
                moco: { tag: "a", href: "https://www.mozilla.org/" },
                mofo: { tag: "a", href: "https://foundation.mozilla.org/" },
              },
            })}<br />
            ${context.l10n.raw({
              id: "footer-copyright",
              elements: {
                cc: {
                  tag: "a",
                  href: "/docs/MDN/Writing_guidelines/Attrib_copyright_license",
                },
              },
            })}
          </p>
        </div>
      </footer>
    `;
  }
}
