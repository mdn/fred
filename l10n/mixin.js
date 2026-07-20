import { getSymmetricContext } from "../symmetric-context/both.js";

import getFluentContext from "./fluent.js";

/**
 * @import { LitElement } from "lit";
 */

/* eslint-disable jsdoc/reject-any-type -- TS mixin constructors require `any[]` (error TS2545) */
/**
 * @template {new (...args: any[]) => LitElement} TBase
 * @param {TBase} Base
 */
/* eslint-enable jsdoc/reject-any-type */
export const L10nMixin = (Base) =>
  class LocalizedElement extends Base {
    /* eslint-disable jsdoc/reject-any-type -- TS mixin constructors require `any[]` (error TS2545) */
    /**
     * @param  {...any} args
     */
    /* eslint-enable jsdoc/reject-any-type */
    constructor(...args) {
      super(...args);
      const context = getSymmetricContext();
      this.locale = context.locale;
      this.l10n = getFluentContext(this.locale);
    }
  };
