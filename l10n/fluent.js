import { FluentBundle, FluentResource } from "@fluent/bundle";
import insane from "insane";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

import enUS_ftl from "./locales/en-US.ftl";

/**
 * @import { AllowedTags } from "insane";
 */

/** @type {Record<string, string>} */
let ftlMap = {
  "en-US": enUS_ftl,
};

const ALLOWED_TAGS = ["i", "strong", "br", "em"];
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
   * @param {Record<string, any>} [args]
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
    /** @type { Record<string, string[]> } */
    const allowedAttributes = {};
    for (const t of Object.values(elements)) {
      allowedAttributes[t.tag] = [
        ...Object.keys(t).filter((x) => x !== "tag"),
        ...ALLOWED_ATTRIBUTES,
      ];
    }

    const allowedTags = [
      ...Object.values(elements).map((t) => t.tag),
      ...ALLOWED_TAGS,
    ];

    let safe = true;
    const sanitized = insane(
      message,
      {
        allowedAttributes,
        allowedTags: /** @type {AllowedTags[]} */ (allowedTags),
        allowedSchemes: ["http", "https", "mailto"],
        filter(token) {
          // TODO: use element names directly
          const name = token.attrs["data-l10n-name"];
          if (name) {
            for (const [k, v] of Object.entries(elements[name] || {})) {
              token.attrs[k] = v;
            }
          }
          if (
            ALLOWED_TAGS.includes(token.tag) ||
            (name &&
              Object.keys(elements).includes(name) &&
              elements[name]?.tag === token.tag)
          ) {
            safe = false;
            return true;
          }
          return false;
        },
      },
      true,
    );
    return safe ? sanitized : unsafeHTML(sanitized);
  }

  /**
   * @param {string} id
   * @param {string} [attr]
   * @param {Record<string, any>} [args]
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
    const formatted = bundle?.formatPattern(message, args, errors);
    if (errors.length > 0) {
      console.error(errors);
    }
    return formatted;
  }
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
    const localeF = new Fluent(locale, ftl ? [ftl] : undefined);
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
   * @param {{ id: string, attr?: string, args?: Record<string, any>, elements?: Record<string, import("../types/fluent.js").Element> }} param0
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
