import { FluentBundle, FluentResource } from "@fluent/bundle";
import DOMPurify from "isomorphic-dompurify";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

import enUS_ftl from "./locales/en-US.ftl";

/**
 * @import { FluentVariable } from "@fluent/bundle"
 */
/** @type {Record<string, string>} */
const ftlMap = {
  "en-US": enUS_ftl,
};

const ALLOWED_TAGS = new Set(["i", "strong", "br", "em"]);
const ALLOWED_ATTRIBUTES = ["title", "aria-label"];

export class Fluent {
  /**
   * @param {string} locale
   * @param {string[]} resources
   */
  constructor(locale = "en-US", resources = []) {
    this.locale = locale;

    this.usBundle = Fluent.constructBundle(
      new FluentBundle(locale, { useIsolating: false }),
      [enUS_ftl],
    );

    if (resources.length > 0) {
      this.bundle = Fluent.constructBundle(
        new FluentBundle(locale, { useIsolating: false }),
        [enUS_ftl, ...resources],
      );
    }
  }

  /**
   * @param {FluentBundle} bundle
   * @param {string[]} resources
   */
  static constructBundle(bundle, resources = []) {
    for (const r of resources) {
      const errors = bundle.addResource(new FluentResource(r), {
        allowOverrides: true,
      });
      if (errors.length > 0) {
        console.error(errors);
      }
    }
    return bundle;
  }

  /**
   * @param {string} id
   * @param {string} [attr]
   * @param {Record<string, FluentVariable | undefined>} [args]
   * @param {Record<string, import("../types/fluent.js").Element>} [elements]
   * @returns {string | ReturnType<typeof unsafeHTML> | undefined}
   */
  get(id, attr, args, elements) {
    const message = this.getMessage(id, attr, args);
    if (!message) {
      return;
    }
    return Fluent.sanitize(message, elements);
  }

  /**
   * @param {string} message
   * @param {Record<string, import("../types/fluent.js").Element>} [elements]
   * @returns {string | ReturnType<typeof unsafeHTML>}
   */
  static sanitize(message, elements = {}) {
    /** @type {Record<string, string[]>} */
    const allowedAttributesPerTag = Object.fromEntries(
      Object.values(elements).map((t) => [
        t.tag,
        [...Object.keys(t).filter((x) => x !== "tag"), ...ALLOWED_ATTRIBUTES],
      ]),
    );

    for (const tag of ALLOWED_TAGS) {
      allowedAttributesPerTag[tag] ??= [...ALLOWED_ATTRIBUTES];
    }

    // Global list for DOMPurify (we'll filter per-tag in the hook)
    const allAllowedAttributes = [
      "data-l10n-name",
      ...ALLOWED_ATTRIBUTES,
      ...Object.values(elements).flatMap((t) =>
        Object.keys(t).filter((x) => x !== "tag"),
      ),
    ];

    const allowedTags = [
      ...Object.values(elements).map((t) => t.tag),
      ...ALLOWED_TAGS,
    ];

    let safe = true;

    DOMPurify.addHook("uponSanitizeElement", (node, data) => {
      if (node.nodeType !== 1) {
        return;
      }
      const name =
        "dataset" in node
          ? /** @type {HTMLElement} */ (node).dataset.l10nName
          : undefined;
      data.allowedTags[data.tagName] =
        ALLOWED_TAGS.has(data.tagName) ||
        !!(
          name &&
          Object.hasOwn(elements, name) &&
          elements[name]?.tag === data.tagName
        );
    });

    // Configured attributes must pass DOMPurify's validation too.
    DOMPurify.addHook(
      "beforeSanitizeAttributes",
      /** @param {Element} element */ (element) => {
        if (!element.tagName) {
          return;
        }
        const tagName = element.tagName.toLowerCase();
        const name =
          "dataset" in element
            ? /** @type {HTMLElement} */ (element).dataset.l10nName
            : undefined;

        const elementConfig =
          name &&
          Object.hasOwn(elements, name) &&
          elements[name]?.tag === tagName
            ? elements[name]
            : undefined;
        if (elementConfig) {
          for (const [k, v] of Object.entries(elementConfig)) {
            if (k !== "tag") {
              element.setAttribute(k, String(v));
            }
          }
        }

        const allowedForTag = allowedAttributesPerTag[tagName] || [];
        const attrsToRemove = [];
        for (const attr of element.attributes) {
          if (
            attr.name !== "data-l10n-name" &&
            !allowedForTag.includes(attr.name)
          ) {
            attrsToRemove.push(attr.name);
          }
        }
        for (const attr of attrsToRemove) {
          element.removeAttribute(attr);
        }

        if (
          ALLOWED_TAGS.has(tagName) ||
          (elementConfig && elementConfig.tag === tagName)
        ) {
          safe = false;
        }
      },
    );

    try {
      const sanitized = DOMPurify.sanitize(message, {
        ALLOWED_TAGS: allowedTags,
        ALLOWED_ATTR: allAllowedAttributes,
        // Allow approved schemes and relative URLs with no scheme before /, ?, or #.
        ALLOWED_URI_REGEXP: /^(?:(?:https?|mailto):|[^:/?#]*(?:[/?#]|$))/i,
      });
      return safe ? sanitized : unsafeHTML(sanitized);
    } finally {
      DOMPurify.removeHook("beforeSanitizeAttributes");
      DOMPurify.removeHook("uponSanitizeElement");
    }
  }

  /**
   * @param {string} id
   * @param {string} [attr]
   * @param {Record<string, FluentVariable | undefined>} [args]
   * @param {FluentBundle | undefined} [bundle]
   * @param {boolean} [us]
   * @returns {string | undefined}
   */
  getMessage(id, attr, args = {}, bundle = this.bundle, us = false) {
    const parentMessage = bundle ? bundle.getMessage(id) : undefined;
    let message;

    if (this.locale === "qai") {
      return `[${id}${attr ? `.${attr}` : ""}]`;
    }

    if (!parentMessage) {
      if (us) {
        // console.error(`string ${id} doesn't exist`);
        // return `[${id}${attr ? `.${attr}` : ""}]`;
        return;
      }
      return this.getMessage(id, attr, args, this.usBundle, true);
    }

    if (attr) {
      message = parentMessage.attributes[attr];
      if (!message) {
        if (us) {
          // console.error(`string ${id} with ${attr} attribute doesn't exist`);
          // return `[${id}.${attr}]`;
          return;
        }
        return this.getMessage(id, attr, args, this.usBundle, true);
      }
    } else if (parentMessage.value) {
      message = parentMessage.value;
    }

    if (!message || !bundle) {
      return "";
    }

    /** @type {Error[]} */
    const errors = [];
    const formatted = bundle?.formatPattern(message, escapeArgs(args), errors);
    if (errors.length > 0) {
      console.error(errors);
    }
    return formatted;
  }
}

/**
 * HTML-escape string-valued args so that variable substitution can't inject
 * tags that confuse the downstream sanitizer. Only string values are touched
 * so that Number/Date selectors keep working.
 *
 * @param {Record<string, FluentVariable | undefined>} args
 * @returns {Record<string, FluentVariable>}
 */
function escapeArgs(args) {
  /** @type {Record<string, FluentVariable>} */
  const out = {};
  for (const [k, v] of Object.entries(args)) {
    if (v !== undefined) {
      out[k] = typeof v === "string" ? escapeHtml(v) : v;
    }
  }
  return out;
}

/**
 * @param {string} s
 */
function escapeHtml(s) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

/** @type {Map<string, Fluent>} */
const fluent = new Map();

/**
 * @param {string} [locale]
 */
function getLocale(locale) {
  if (!locale) {
    return;
  }
  if (!fluent.has(locale)) {
    const ftl = ftlMap[locale];
    if (!ftl) {
      return new Fluent(locale);
    }
    const localeF = new Fluent(locale, [ftl]);
    fluent.set(locale, localeF);
  }
  return fluent.get(locale);
}

/**
 * @param {string} locale
 */
export async function loadFluentFile(locale) {
  if (locale !== "qai" && !ftlMap[locale]) {
    try {
      const { default: localeStrings } = await import(
        `./locales/${locale}.ftl`
      );
      ftlMap[locale] = localeStrings;
    } catch (error) {
      console.error(error);
    }
  }
}

/**
 * @param {string} locale
 */
export default function getFluentContext(locale) {
  /**
   * @param {string} id
   * @param {string} [_comment]
   * @returns {import("../types/fluent.js").L10nTag}
   */
  function l10n(id, _comment) {
    // called as a function, returning a template tag:
    // l10n("foobar")`Foobar`
    const localizedStringOrHtml = getLocale(locale)?.get(id);
    // if fluent has returned a lit html template, discard it
    const localizedString =
      typeof localizedStringOrHtml === "string"
        ? localizedStringOrHtml
        : undefined;
    const fallbackString = `[${id}]`;
    /** @type {import("../types/fluent.js").L10nTag} */
    const tag = (strings) => {
      // we don't currently support any expressions in the template string
      // we might in the future, if we use l10n.raw a lot
      const templateString = strings[0];
      return localizedString || templateString || fallbackString;
    };
    tag.toString = () => {
      // called as a function, used as a function:
      // ${l10n("foobar")}
      return localizedString || fallbackString;
    };
    return tag;
  }

  /**
   * @param {{ id: string, attr?: string, args?: Record<string, FluentVariable | undefined>, elements?: Record<string, import("../types/fluent.js").Element> }} param0
   */
  l10n.raw = function ({ id, attr, args, elements }) {
    const fluent = getLocale(locale);
    if (fluent) {
      return fluent.get(id, attr, args, elements);
    }
    return `[${id}]`;
  };

  return l10n;
}

// const l10n = getFluentContext("en-US");

// console.log(l10n`Hello`);
// console.log(l10n("hello")`Hello`);
// console.log(l10n("hello", "a greeting to the user")`Hello`);
// console.log(l10n.raw({ id: "hello" }));
// console.log(`${l10n("hello")}`);

// should show error:
// l10n("hello")`Hello ${"world"}`;
