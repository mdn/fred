import { FluentBundle, FluentResource } from "@fluent/bundle";
import DOMPurify from "isomorphic-dompurify";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

import de_ftl from "../l10n/de.ftl";
import enUS_ftl from "../l10n/en-US.ftl";
import es_ftl from "../l10n/es.ftl";
import fr_ftl from "../l10n/fr.ftl";
import ja_ftl from "../l10n/ja.ftl";
import ko_ftl from "../l10n/ko.ftl";
import ptBR_ftl from "../l10n/pt-BR.ftl";
import ru_ftl from "../l10n/ru.ftl";
import zhCN_ftl from "../l10n/zh-CN.ftl";
import zhTW_ftl from "../l10n/zh-TW.ftl";

/** @type {Record<string, string>} */
const ftlMap = {
  "en-US": enUS_ftl,
  de: de_ftl,
  es: es_ftl,
  fr: fr_ftl,
  ja: ja_ftl,
  ko: ko_ftl,
  "pt-BR": ptBR_ftl,
  ru: ru_ftl,
  "zh-CN": zhCN_ftl,
  "zh-TW": zhTW_ftl,
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

    // Add hook to process data-l10n-name attributes and enforce per-tag attribute rules
    DOMPurify.addHook(
      "afterSanitizeAttributes",
      /** @param {Element} element */ (element) => {
        const tagName = element.tagName.toLowerCase();
        const name =
          "dataset" in element
            ? /** @type {HTMLElement} */ (element).dataset.l10nName
            : undefined;

        // Apply attributes from elements config based on data-l10n-name
        const elementConfig = name ? elements[name] : undefined;
        if (elementConfig) {
          for (const [k, v] of Object.entries(elementConfig)) {
            if (k !== "tag") {
              element.setAttribute(k, String(v));
            }
          }
        }

        // Enforce per-tag attribute allowlist (remove disallowed attributes)
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

        // Track if HTML tags are used (to decide string vs unsafeHTML return)
        if (
          ALLOWED_TAGS.includes(tagName) ||
          (elementConfig && elementConfig.tag === tagName)
        ) {
          safe = false;
        }
      },
    );

    const sanitized = DOMPurify.sanitize(message, {
      ALLOWED_TAGS: allowedTags,
      ALLOWED_ATTR: allAllowedAttributes,
      ALLOWED_URI_REGEXP: /^(?:https?|mailto):/i,
    });

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

    if (this.locale === "qa") {
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
 * @param {string} [locale]
 */
export default function getFluentContext(locale) {
  /**
   * @overload
   * @param {string} id
   * @param {string} [_comment]
   * @returns {import("../types/fluent.js").L10nTag}
   */

  /**
   * @overload
   * @param {TemplateStringsArray} strings
   * @returns {string}
   */

  /**
   * @param {string | TemplateStringsArray} idOrStrings
   * @param {string} [_comment]
   * @returns {import("../types/fluent.js").L10nTag | string}
   */
  function l10n(idOrStrings, _comment) {
    if (typeof idOrStrings === "string") {
      // called as a function, returning a template tag:
      // l10n("foobar")`Foobar`
      const id = idOrStrings;
      const localizedString = getLocale(locale)?.get(id);
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
        return (
          (typeof localizedString === "string" && localizedString) ||
          fallbackString
        );
      };
      return tag;
    }
    // called directly as a template tag:
    // l10n`Foobar`
    // TODO: create consistent logic for id generation at runtime and scrapetime
    const strings = idOrStrings;
    const templateString = strings[0];
    return templateString || "";
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
