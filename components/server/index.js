import { asyncLocalStorage } from "./async-local-storage.js";

export class ServerComponent {
  static legacy = false;

  /**
   * @template {typeof ServerComponent} T
   * @this {T}
   * @param {Parameters<InstanceType<T>["render"]>} args
   * @returns {ReturnType<InstanceType<T>["render"]>}
   */
  static render(...args) {
    const { componentsUsed } = asyncLocalStorage.getStore() || {};
    componentsUsed?.add(this.name);
    if (this.legacy) {
      componentsUsed?.add("legacy");
    }
    return new this().render(...args);
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
