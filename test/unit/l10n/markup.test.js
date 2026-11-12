import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";

import { FluentBundle, FluentResource } from "@fluent/bundle";
import sanitizeHtml from "sanitize-html";

import {
  ALLOWED_ATTRIBUTES,
  ALLOWED_SCHEMES,
  ALLOWED_TAGS,
  NAME_ATTRIBUTE,
  renderMarkup,
  tokenize,
} from "../../../l10n/markup.js";

const LOCALES_DIR = fileURLToPath(
  new URL("../../../l10n/locales/", import.meta.url),
);

/**
 * @import { Element } from "../../../types/fluent.js"
 */

/** @type {{ name: string, message: string, elements?: Record<string, Element>, value: string, html: boolean }[]} */
const CASES = [
  {
    name: "plain text",
    message: "Hello world!",
    value: "Hello world!",
    html: false,
  },
  {
    name: "escaped args in plain text",
    message: "a &lt;b&gt; &amp; c > d &amp;lt;",
    value: "a <b> & c > d &lt;",
    html: false,
  },
  {
    name: "escaped args next to allowed tag",
    message: "<em>a</em> &lt;b&gt; &amp; c",
    value: "<em>a</em> &lt;b&gt; &amp; c",
    html: true,
  },
  {
    name: "allowed tags",
    message: "<i>a</i> <strong>b</strong><br> <em>c</em><br/>",
    value: "<i>a</i> <strong>b</strong><br> <em>c</em><br>",
    html: true,
  },
  {
    name: "attributes of allowed tags without name",
    message: '<em title="t" onclick="alert(1)">a</em>',
    value: "<em>a</em>",
    html: true,
  },
  {
    name: "disallowed tag with content",
    message: "x <script>alert(1)</script> y",
    value: "x  y",
    html: false,
  },
  {
    name: "allowed tag within disallowed tag",
    message: "x <div><em>a</em><br></div> <em>y</em>",
    value: "x  <em>y</em>",
    html: true,
  },
  {
    name: "named element",
    message: 'Hello <a data-l10n-name="link">world</a>!',
    elements: { link: { tag: "a", href: "https://example.com/?a=1&b=2" } },
    value: 'Hello <a href="https://example.com/?a=1&amp;b=2">world</a>!',
    html: true,
  },
  {
    name: "named element with translator attributes",
    message:
      '<a data-l10n-name="link" title="T" aria-label="L" href="https://evil.example/" onclick="alert(1)">x</a>',
    elements: { link: { tag: "a", href: "/en-US/" } },
    value: '<a title="T" aria-label="L" href="/en-US/">x</a>',
    html: true,
  },
  {
    name: "element attribute overrides translator attribute",
    message: '<a data-l10n-name="link" title="T">x</a>',
    elements: { link: { tag: "a", title: 'A "title"' } },
    value: '<a title="A &quot;title&quot;">x</a>',
    html: true,
  },
  {
    name: "named allowed tag",
    message: '<strong data-l10n-name="unknown" title="t">a</strong>',
    value: "<strong>a</strong>",
    html: true,
  },
  {
    name: "unknown name",
    message: 'a <a data-l10n-name="unknown">b</a> c',
    elements: { link: { tag: "a", href: "/" } },
    value: "a  c",
    html: false,
  },
  {
    name: "inherited object property as name",
    message: 'a <a data-l10n-name="constructor">b</a> c',
    value: "a  c",
    html: false,
  },
  {
    name: "name with different tag",
    message: 'a <code data-l10n-name="link">b</code> c',
    elements: { link: { tag: "a", href: "/" } },
    value: "a  c",
    html: false,
  },
  {
    name: "element tag without name",
    message: "a <code>b</code> c",
    elements: { code: { tag: "code" } },
    value: "a  c",
    html: false,
  },
  {
    name: "unsafe url scheme",
    message: '<a data-l10n-name="link">x</a>',
    elements: { link: { tag: "a", href: " JaVa\tScript:alert(1)" } },
    value: "<a>x</a>",
    html: true,
  },
  {
    name: "mailto url",
    message: '<a data-l10n-name="link">x</a>',
    elements: { link: { tag: "a", href: "mailto:a@example.com" } },
    value: '<a href="mailto:a@example.com">x</a>',
    html: true,
  },
  {
    name: "relative url with colon in path",
    message: '<a data-l10n-name="link">x</a>',
    elements: { link: { tag: "a", href: "/en-US/docs/Web/CSS/:hover" } },
    value: '<a href="/en-US/docs/Web/CSS/:hover">x</a>',
    html: true,
  },
  {
    name: "malformed tags next to allowed tag",
    message: "<em>a</em> <img src=x onerror=alert(1)> <a href='x'>b</a> 1 < 2",
    value:
      "<em>a</em> &lt;img src=x onerror=alert(1)> &lt;a href='x'>b 1 &lt; 2",
    html: true,
  },
  {
    name: "comment",
    message: "<em>a</em><!-- <em>b</em> -->",
    value: "<em>a</em>&lt;!-- <em>b</em> -->",
    html: true,
  },
  {
    name: "unclosed and unexpected closing tags",
    message: "</i><em>a <strong>b</em>",
    value: "<em>a <strong>b</strong></em>",
    html: true,
  },
  {
    name: "self-closing tag that is not void",
    message: "<em/>a <strong>b</strong>",
    value: "<em>a <strong>b</strong></em>",
    html: true,
  },
  {
    name: "uppercase tag",
    message: "<EM>a</EM>",
    value: "<em>a</em>",
    html: true,
  },
];

describe("l10n markup", () => {
  describe("renderMarkup", () => {
    for (const { name, message, elements, value, html } of CASES) {
      it(name, () => {
        assert.deepEqual(renderMarkup(message, elements), { value, html });
      });
    }
  });

  // An independent sanitizer must have nothing left to remove.
  describe("sanitize-html oracle", () => {
    for (const { name, message, elements } of CASES) {
      it(`agrees on: ${name}`, () => {
        assertSanitized(message, elements);
      });
    }

    for (const file of readdirSync(LOCALES_DIR)) {
      if (!file.endsWith(".ftl")) {
        continue;
      }
      it(`agrees on all strings in ${file}`, () => {
        const bundle = new FluentBundle("en-US", { useIsolating: false });
        bundle.addResource(
          new FluentResource(
            readFileSync(path.join(LOCALES_DIR, file), "utf8"),
          ),
        );
        for (const id of messageIds(bundle)) {
          const { value, attributes } = bundle.getMessage(id) ?? {};
          for (const pattern of [value, ...Object.values(attributes ?? {})]) {
            if (pattern) {
              // Missing args are formatted as `{$name}`.
              const message = bundle.formatPattern(pattern, {}, []);
              assertSanitized(message, elementsOf(message));
            }
          }
        }
      });
    }
  });
});

/**
 * @param {FluentBundle} bundle
 * @returns {string[]}
 */
function messageIds(bundle) {
  return [...bundle._messages.keys()];
}

/**
 * @param {string} message
 * @returns {Record<string, Element>} An element with a link for each name in `message`
 */
function elementsOf(message) {
  /** @type {Record<string, Element>} */
  const elements = {};
  for (const token of tokenize(message)) {
    const name =
      token.type === "open" ? token.attributes[NAME_ATTRIBUTE] : undefined;
    if (token.type === "open" && name !== undefined) {
      elements[name] = { tag: token.tag, href: "/en-US/?a=1&b=2" };
    }
  }
  return elements;
}

/**
 * @param {string} message
 * @param {Record<string, Element>} [elements]
 */
function assertSanitized(message, elements = {}) {
  const { value, html } = renderMarkup(message, elements);
  if (!html) {
    return;
  }

  /** @type {Record<string, string[]>} */
  const allowedAttributes = {};
  for (const element of Object.values(elements)) {
    allowedAttributes[element.tag] = [
      ...(allowedAttributes[element.tag] ?? []),
      ...Object.keys(element).filter((key) => key !== "tag"),
      ...ALLOWED_ATTRIBUTES,
    ];
  }
  const sanitized = sanitizeHtml(value, {
    allowedTags: [
      ...Object.values(elements).map((element) => element.tag),
      ...ALLOWED_TAGS,
    ],
    allowedAttributes,
    allowedSchemes: ALLOWED_SCHEMES,
  });

  assert.equal(normalize(sanitized), normalize(value));
}

/**
 * Ignores differences in how equivalent HTML is serialized.
 *
 * @param {string} html
 */
function normalize(html) {
  return html.replaceAll("&gt;", ">").replaceAll("<br />", "<br>");
}
