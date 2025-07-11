import { html } from "lit";

import { stylesForComponents } from "../outer-layout/utils.js";

import { asyncLocalStorage } from "./async-local-storage.js";

export class ServerComponent {
  static stylesInHead = true;
  static legacy = false;

  /**
   * @template {typeof ServerComponent} T
   * @this {T}
   * @param {Parameters<InstanceType<T>["render"]>} args
   * @returns {ReturnType<InstanceType<T>["render"]> | import("@lit").TemplateResult}
   */
  static render(...args) {
    const { componentsUsed, componentsWithStylesInHead, compilationStats } =
      asyncLocalStorage.getStore() || {};
    componentsUsed?.add(this.name);
    if (this.stylesInHead) {
      componentsWithStylesInHead?.add(this.name);
    }
    if (this.legacy) {
      componentsUsed?.add("legacy");
    }

    const res = new this().render(...args);

    if (!this.stylesInHead && compilationStats) {
      const styles = stylesForComponents([this.name], compilationStats.client);
      if (styles.length > 0) {
        // render block in Gecko and WebKit with empty script tag following link
        // https://github.com/chrishtr/rendering/blob/master/stylesheet-loading-behavior.md
        return html`${styles.map(
          (path) =>
            html`<link rel="stylesheet" href=${path} fetchpriority="high" />
              <script></script>`,
        )}${res}`;
      }
    }
    return res;
  }

  /**
   * @abstract
   * @param {...any} _args
   * @returns {any}
   */
  render(..._args) {
    throw new Error("Must be implemented by subclass");
  }
}
