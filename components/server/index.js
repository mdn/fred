import { asyncLocalStorage } from "./async-local-storage.js";

export class ServerComponent {
  /**
   * @template {typeof ServerComponent} T
   * @this {T}
   * @param {Parameters<InstanceType<T>["render"]>} args
   * @returns {ReturnType<InstanceType<T>["render"]>}
   */
  static render(...args) {
    asyncLocalStorage.getStore()?.componentsUsed?.add(this.name);
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
