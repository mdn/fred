import { getSymmetricContext } from "../symmetric-context/both.js";

import getFluentContext, { loadFluentFile } from "./fluent.js";

/**
 * @import { LitElement } from "lit";
 */

const locale = getSymmetricContext()?.locale;
if (locale) await loadFluentFile(locale);

/**
 * @template {new (...args: any[]) => LitElement} TBase
 * @param {TBase} Base
 */
export const L10nMixin = (Base) =>
  class LocalizedElement extends Base {
    /**
     * @param  {...any} args
     */
    constructor(...args) {
      super(...args);
      let context = getSymmetricContext();
      if (!context) {
        console.error("SymmetricContext is undefined, reverting to defaults");
        context = {
          locale: "en-US",
        };
      }
      this.locale = context.locale;
      this.l10n = getFluentContext(this.locale);
    }
  };
