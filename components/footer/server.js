import { html } from "@lit-labs/ssr";

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
    ariaLabel: context.l10n("footer-mdn-on-github")`MDN on GitHub`,
  },
  {
    icon: "bluesky",
    href: "https://bsky.app/profile/developer.mozilla.org",
    ariaLabel: context.l10n("footer-mdn-on-bluesky")`MDN on Bluesky`,
  },
  {
    icon: "x",
    href: "https://x.com/mozdevnet",
    ariaLabel: context.l10n("footer-mdn-on-x")`MDN on X`,
  },
  {
    icon: "mastodon",
    href: "https://mastodon.social/@mdn",
    ariaLabel: context.l10n("footer-mdn-on-mastodon")`MDN on Mastodon`,
  },
  {
    icon: "rss",
    href: "/en-US/blog/rss.xml",
    ariaLabel: context.l10n("footer-mdn-blog-rss-feed")`MDN blog RSS feed`,
  },
];

/**
 *
 * @param {import("@fred").L10nContext} context
 */
const links = (context) => [
  {
    title: context.l10n("footer-mdn")`MDN`,
    links: [
      { text: context.l10n("footer-about")`About`, href: "/en-US/about" },
      { text: context.l10n("footer-blog")`Blog`, href: "/en-US/blog/" },
      {
        text: context.l10n("footer-mozilla-careers")`Mozilla careers`,
        href: "https://www.mozilla.org/en-US/careers/listings/",
        external: true,
      },
      {
        text: context.l10n("footer-advertise-with-us")`Advertise with us`,
        href: "/en-US/advertising",
      },
      { text: context.l10n("footer-mdn-plus")`MDN Plus`, href: "/en-US/plus" },
      {
        text: context.l10n("footer-product-help")`Product help`,
        href: "https://support.mozilla.org/products/mdn-plus",
        external: true,
      },
    ],
  },
  {
    title: context.l10n("footer-contribute")`Contribute`,
    links: [
      {
        text: context.l10n("footer-mdn-community")`MDN Community`,
        href: "/en-US/community",
      },
      {
        text: context.l10n("footer-community-resources")`Community resources`,
        href: "/en-US/docs/MDN/Community",
      },
      {
        text: context.l10n("footer-writing-guidelines")`Writing guidelines`,
        href: "/en-US/docs/MDN/Writing_guidelines",
      },
      {
        text: context.l10n("footer-mdn-discord")`MDN Discord`,
        href: "/discord",
        external: true,
      },
      {
        text: context.l10n("footer-mdn-on-github")`MDN on GitHub`,
        href: "https://github.com/mdn",
        external: true,
      },
    ],
  },
  {
    title: context.l10n("footer-developers")`Developers`,
    links: [
      {
        text: context.l10n("footer-web-technologies")`Web technologies`,
        href: "/en-US/docs/Web",
      },
      {
        text: context.l10n(
          "footer-learn-web-development",
        )`Learn web development`,
        href: "/en-US/docs/Learn_web_development",
      },
      {
        text: context.l10n("footer-guides")`Guides`,
        href: "/en-US/docs/MDN/Guides",
      },
      {
        text: context.l10n("footer-tutorials")`Tutorials`,
        href: "/en-US/docs/MDN/Tutorials",
      },
      {
        text: context.l10n("footer-glossary")`Glossary`,
        href: "/en-US/docs/Glossary",
      },
      {
        text: context.l10n("footer-hacks-blog")`Hacks blog`,
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
    text: context.l10n("footer-website-privacy-notice")`Website Privacy Notice`,
    href: "https://www.mozilla.org/privacy/websites/",
    external: true,
  },
  {
    text: context.l10n("footer-telemetry-settings")`Telemetry Settings`,
    href: "https://www.mozilla.org/en-US/privacy/websites/data-preferences/",
    external: true,
  },
  {
    text: context.l10n("footer-legal")`Legal`,
    href: "https://www.mozilla.org/about/legal/terms/mozilla",
    external: true,
  },
  {
    text: context.l10n(
      "footer-community-participation-guidelin",
    )`Community Participation Guidelines`,
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
              aria-label=${context.l10n("footer-mdn-logo")`MDN logo`}
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
                    target="_blank"
                    rel="noopener"
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
                            target=${link.external ? "_blank" : undefined}
                            rel=${link.external ? "noopener" : undefined}
                          >
                            ${link.text}
                          </a>
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
            aria-label=${context.l10n("footer-mozilla-logo")`Mozilla logo`}
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
              args: {
                year: new Date().getUTCFullYear().toString(),
              },
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
