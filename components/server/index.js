import { html } from "@lit-labs/ssr";
import { nothing } from "lit";

import { unsafeHTML } from "lit/directives/unsafe-html.js";

import { stylesForComponents } from "../outer-layout/utils.js";

import { asyncLocalStorage } from "./async-local-storage.js";

export class ServerComponent {
  static stylesInHead = true;
  static legacy = false;
  /** @type {string | undefined} */
  static inlineScript;

  /**
   * @template {typeof ServerComponent} T
   * @this {T}
   * @param {Parameters<InstanceType<T>["render"]>} args
   * @returns {ReturnType<InstanceType<T>["render"]> | import("@lit").TemplateResult | import("@lit").nothing }
   */
  static render(...args) {
    const asyncStore = asyncLocalStorage.getStore();
    if (!asyncStore) {
      throw new Error("asyncLocalStorage missing");
    }
    const { componentsUsed, componentsWithStylesInHead, compilationStats } =
      asyncStore;
    const componentUsedBefore = componentsUsed.has(this.name);
    componentsUsed.add(this.name);
    if (this.stylesInHead) {
      componentsWithStylesInHead.add(this.name);
    }
    if (this.legacy) {
      componentsUsed.add("legacy");
    }

    const renderResult = new this().render(...args);
    if (!renderResult || renderResult === nothing) {
      if (!componentUsedBefore) {
        componentsUsed.delete(this.name);
        componentsWithStylesInHead.delete(this.name);
      }
      return nothing;
    }

    const inline = this.inlineScript;
    const res = inline
      ? html`${renderResult}${unsafeHTML(`<script>${inline}</script>`)}`
      : renderResult;

    if (!this.stylesInHead) {
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
