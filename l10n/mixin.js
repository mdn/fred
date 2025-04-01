import { getSymmetricContext } from "../symmetric-context/both.js";

import getFluentContext from "./fluent.js";

/**
 * @import { LitElement } from "lit";
 */

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
      const context = getSymmetricContext();
      const locale = context.locale;
      this.l10n = getFluentContext(locale);
    }
  };
