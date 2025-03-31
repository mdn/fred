import getFluentContext from "./fluent.js";

/**
 * @import { LitElement } from "lit";
 */

/**
 * @template {(new (...args: any[]) => LitElement) & Pick<typeof LitElement, "properties">} TBase
 * @param {TBase} Base
 */
export const L10nMixin = (Base) =>
  class LocalizedElement extends Base {
    static properties = {
      ...Base.properties,
      locale: { type: String },
    };

    /**
     * @param  {...any} args
     */
    constructor(...args) {
      super(...args);
      this.locale = "";
      this.l10n = getFluentContext();
    }

    /**
     * @param {import("lit").PropertyValues<this>} changedProperties
     */
    willUpdate(changedProperties) {
      if (changedProperties.has("locale")) {
        this.l10n = getFluentContext(this.locale);
      }
    }
  };
