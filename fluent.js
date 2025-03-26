import { FluentBundle, FluentResource } from "@fluent/bundle";
import insane from "insane";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

import USStrings from "./l10n/en-us.flt";
import DEStrings from "./l10n/de.flt";

/**
 * @import { AllowedTags } from "insane";
 */

/** @type {Record<string, string>} */
const fltMap = { "en-US": USStrings, de: DEStrings };

const whitelistedTags = ["i", "strong", "br"];
const whitelistedAttributes = ["title", "aria-label"];

export class Fluent {
  /**
   * @param {string} locale
   * @param {string[]} resources
   */
  constructor(locale = "en-US", resources = []) {
    this.locale = locale;

    this.usBundle = Fluent.constructBundle(new FluentBundle(locale), [
      USStrings,
    ]);

    if (resources.length > 0) {
      this.bundle = Fluent.constructBundle(new FluentBundle(locale), [
        USStrings,
        ...resources,
      ]);
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
   * @param {string | { id: string, attr?: string, args?: Record<string, any>, tags?: Record<string, import("./fluent").Tag> }} arg1
   * @param {string | Record<string, any>} [arg2]
   */
  get(arg1, arg2) {
    if (typeof arg1 === "string") {
      const id = arg1;
      if (arg2) {
        if (typeof arg2 === "string") {
          return this._get(id, arg2);
        }
        return this._get(id, undefined, arg2);
      }
      return this._get(id);
    }
    const { id, attr, args, tags } = arg1;
    return this._get(id, attr, args, tags);
  }

  /**
   * @param {string} id
   * @param {string} [attr]
   * @param {Record<string, any>} [args]
   * @param {Record<string, import("./fluent").Tag>} [tags]
   */
  _get(id, attr, args, tags) {
    const message = this.getMessage(id, attr, args);
    return Fluent.sanitize(message, tags);
  }

  /**
   * @param {string} message
   * @param {Record<string, import("./fluent").Tag>} tags
   */
  static sanitize(message, tags = {}) {
    /** @type Record<string, string[]> */
    const allowedAttributes = {};
    for (const t of Object.values(tags)) {
      allowedAttributes[t.tag] = [
        ...Object.keys(t).filter((x) => x !== "tag"),
        ...whitelistedAttributes,
      ];
    }

    const allowedTags = [
      ...Object.values(tags).map((t) => t.tag),
      ...whitelistedTags,
    ];

    let unsafe = false;

    const sanitized = insane(
      message,
      {
        allowedAttributes,
        allowedTags: /** @type AllowedTags[] */ (allowedTags),
        allowedSchemes: ["http", "https", "mailto"],
        filter(token) {
          const name = token.attrs["data-l10n-name"];
          if (name) {
            for (const [k, v] of Object.entries(tags[name] || {})) {
              token.attrs[k] = v;
            }
          }
          if (
            whitelistedTags.includes(token.tag) ||
            (name &&
              Object.keys(tags).includes(name) &&
              tags[name]?.tag === token.tag)
          ) {
            unsafe = true;
            return true;
          }
          return false;
        },
      },
      true,
    );
    return unsafe ? unsafeHTML(sanitized) : sanitized;
  }

  /**
   * @param {string | undefined} attr
   * @param {string} id
   * @param {string} [attr]
   * @param {Record<string, any>} [args={}]
   * @param {FluentBundle | undefined} [bundle=this.bundle]
   * @param {boolean} [us=false]
   * @returns {string}
   */
  getMessage(id, attr, args = {}, bundle = this.bundle, us = false) {
    const parentMessage = bundle ? bundle.getMessage(id) : undefined;
    let message;

    if (this.locale === "qa") {
      return `[${id}${attr ? `.${attr}` : ""}]`;
    }

    if (!parentMessage) {
      if (us) {
        console.error(`string ${id} doesn't exist`);
        return `[${id}${attr ? `.${attr}` : ""}]`;
      }
      return this.getMessage(id, attr, args, this.usBundle, true);
    }

    if (attr) {
      message = parentMessage.attributes[attr];
      if (!message) {
        if (us) {
          console.error(`string ${id} with ${attr} attribute doesn't exist`);
          return `[${id}.${attr}]`;
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

async function l10n(locale = "en-US") {
  if (!fluent.has(locale)) {
    const flt = fltMap[locale];
    const localeF = new Fluent(locale, flt ? [flt] : undefined);
    fluent.set(locale, localeF);
  }
  return fluent.get(locale);
}

export default l10n;
