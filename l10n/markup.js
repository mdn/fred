/**
 * @import { Element } from "../types/fluent.js"
 */

export const ALLOWED_TAGS = new Set(["i", "strong", "br", "em"]);
export const ALLOWED_ATTRIBUTES = ["title", "aria-label"];
export const ALLOWED_SCHEMES = ["http", "https", "mailto"];
export const NAME_ATTRIBUTE = "data-l10n-name";

const VOID_TAGS = new Set(["br"]);

// The only tag syntax we accept: anything else is treated as text.
const TAG_SOURCE = String.raw`<(\/?)([a-zA-Z][a-zA-Z0-9]*)((?:\s+[a-zA-Z][a-zA-Z0-9-]*="[^"<>]*")*)\s*\/?>`;
const ATTRIBUTE_SOURCE = '([a-zA-Z][a-zA-Z0-9-]*)="([^"<>]*)"';

/**
 * @typedef {{ type: "text", value: string }} TextToken
 * @typedef {{ type: "open" | "close", value: string, tag: string, attributes: Record<string, string>, void: boolean }} TagToken
 */

/**
 * @param {string} message
 * @yields {TextToken | TagToken}
 * @returns {Generator<TextToken | TagToken>}
 */
export function* tokenize(message) {
  let index = 0;
  for (const match of message.matchAll(new RegExp(TAG_SOURCE, "g"))) {
    if (match.index > index) {
      yield { type: "text", value: message.slice(index, match.index) };
    }
    index = match.index + match[0].length;

    const [value, closing, name = "", rawAttributes = ""] = match;
    const tag = name.toLowerCase();
    /** @type {Record<string, string>} */
    const attributes = {};
    for (const [, key = "", attrValue = ""] of rawAttributes.matchAll(
      new RegExp(ATTRIBUTE_SOURCE, "g"),
    )) {
      attributes[key.toLowerCase()] = attrValue;
    }
    yield {
      type: closing ? "close" : "open",
      value,
      tag,
      attributes,
      // As in HTML, a trailing slash does not close the element.
      void: VOID_TAGS.has(tag),
    };
  }
  if (index < message.length) {
    yield { type: "text", value: message.slice(index) };
  }
}

/**
 * Renders the markup of a formatted message, keeping only allowlisted tags
 * and the attributes given in `elements`.
 *
 * @param {string} message
 * @param {Record<string, Element>} [elements]
 * @returns {{ value: string, html: boolean }} `html` is false if `value` is plain text, to be rendered as is
 */
export function renderMarkup(message, elements = {}) {
  /** @type {({ text: string } | { html: string })[]} */
  const parts = [];
  /** @type {string[]} */
  const open = [];
  let html = false;
  // Depth within an element that is not allowed, whose content is dropped.
  let ignoring = 0;

  for (const token of tokenize(message)) {
    if (ignoring > 0) {
      if (token.type === "open" && !token.void) {
        ignoring++;
      } else if (token.type === "close") {
        ignoring--;
      }
      continue;
    }

    if (token.type === "text") {
      parts.push({ text: token.value });
    } else if (token.type === "open") {
      const name = token.attributes[NAME_ATTRIBUTE];
      const element =
        name !== undefined && Object.hasOwn(elements, name)
          ? elements[name]
          : undefined;
      const named = element?.tag === token.tag;

      if (!named && !ALLOWED_TAGS.has(token.tag)) {
        if (!token.void) {
          ignoring = 1;
        }
        continue;
      }

      /** @type {Record<string, string>} */
      const attributes = {};
      if (named) {
        for (const key of ALLOWED_ATTRIBUTES) {
          const value = token.attributes[key];
          if (value !== undefined) {
            attributes[key] = value;
          }
        }
        for (const [key, value] of Object.entries(element)) {
          if (key !== "tag") {
            attributes[key] = escapeAttribute(value);
          }
        }
        if (attributes.href !== undefined && !isSafeUrl(element.href ?? "")) {
          delete attributes.href;
        }
      }

      html = true;
      parts.push({
        html: `<${token.tag}${Object.entries(attributes)
          .map(([key, value]) => ` ${key}="${value}"`)
          .join("")}>`,
      });
      if (!token.void) {
        open.push(token.tag);
      }
    } else if (open.at(-1) === token.tag) {
      open.pop();
      parts.push({ html: `</${token.tag}>` });
    }
  }

  while (open.length > 0) {
    parts.push({ html: `</${open.pop()}>` });
  }

  return {
    value: parts
      .map((part) =>
        "html" in part
          ? part.html
          : html
            ? part.text.replaceAll("<", "&lt;")
            : unescapeText(part.text),
      )
      .join(""),
    html,
  };
}

/**
 * @param {string} url
 */
function isSafeUrl(url) {
  // Browsers ignore these when parsing the scheme.
  // eslint-disable-next-line no-control-regex
  const scheme = /^([^/?#]*?):/.exec(url.replaceAll(/[\u{0}-\u{20}]/gu, ""));
  return !scheme || ALLOWED_SCHEMES.includes((scheme[1] ?? "").toLowerCase());
}

/**
 * Reverts the escaping of args and of literal `<` in messages.
 *
 * @param {string} text
 */
function unescapeText(text) {
  return text
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&amp;", "&");
}

/**
 * @param {string} value
 */
function escapeAttribute(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}
