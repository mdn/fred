import { FluentBundle, FluentResource } from "@fluent/bundle";
import insane from "insane";
import USStrings from "./l10n/en-us.flt";
import DEStrings from "./l10n/de.flt";

/**
 * @typedef {import("insane").AllowedTags} AllowedTags
 */

const languages = [["en-US", "English"]];

/** @type AllowedTags[] */
const whitelistedTags = ["i", "strong", "br"];
const whitelistedAttributes = ["title", "aria-label"];

export class Fluent {
  /**
   * @param {string} locale
   * @param {string[]} resources
   */
  constructor(locale = "en-US", resources = []) {
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
    resources.forEach((r) => {
      const errors = bundle.addResource(new FluentResource(r), {
        allowOverrides: true,
      });
      if (errors.length) {
        console.error(errors);
      }
    });
    return bundle;
  }

  /**
   * @param {readonly string[]} requested
   * @param {string[]} available
   */
  static init(requested = navigator.languages, available) {
    // @ts-ignore
    this.locales = this.resolveLocale(requested, available);
    // @ts-ignore
    return this.load(...this.locales);
  }

  static languages() {
    return languages;
  }

  /**
   * @param {...*} parameters
   * @returns {string}
   */
  get(...parameters) {
    if (typeof parameters[0] === "string") {
      const id = parameters[0];
      switch (parameters.length) {
        case 2:
          if (typeof parameters[1] === "string") {
            return this.get({ id, attr: parameters[1] });
          }
          return this.get({ id, args: parameters[1] });
        default:
          return this.get({ id });
      }
    }
    const { id, attr, args, tags } = parameters[0];
    const message = this.getMessage(id, attr, args);
    return Fluent.sanitize(message, tags);
  }

  /**
   * @param {string} message
   * @param {Record<string, { tag: AllowedTags } & Record<string, string>>} tags
   */
  static sanitize(message, tags = {}) {
    /** @type Record<string, string[]> */
    const allowedAttributes = {};
    Object.values(tags).forEach((t) => {
      allowedAttributes[t.tag] = Object.keys(t)
        .filter((x) => x !== "tag")
        .concat(whitelistedAttributes);
    });

    const allowedTags = Object.values(tags)
      .map((t) => t.tag)
      .concat(whitelistedTags);

    return insane(
      message,
      {
        allowedAttributes,
        allowedTags,
        allowedSchemes: ["http", "https", "mailto"],
        filter(token) {
          const name = token.attrs["data-l10n-name"];
          if (name) {
            // @ts-ignore
            Object.entries(tags[name]).forEach(([k, v]) => {
              token.attrs[k] = v;
            });
          }
          if (
            whitelistedTags.includes(token.tag) ||
            // @ts-ignore
            (Object.keys(tags).includes(name) && tags[name].tag === token.tag)
          ) {
            return true;
          }
          return false;
        },
      },
      true,
    );
  }

  /**
   * @param {string} id
   * @returns {string}
   */
  getMessage(id, attr = null, args = {}, bundle = this.bundle, us = false) {
    const parentMessage = bundle ? bundle.getMessage(id) : undefined;
    let message;

    if (Fluent.locales && Fluent.locales[1] === "__ids") {
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
    if (errors.length) {
      console.error(errors);
    }
    return formatted;
  }
}

/** @type {Map<string, Fluent>} */
let fluent = new Map();

async function l10n(locale = "en-US") {
  if (!fluent.has(locale)) {
    const localeF = new Fluent(locale, [DEStrings]);
    fluent.set(locale, localeF);
  }
  return fluent.get(locale);
}

export default l10n;
