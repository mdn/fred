import { getSymmetricContext } from "../symmetric-context/both.js";

export class ServerComponent {
  /**
   * @template {typeof ServerComponent} T
   * @this {T}
   * @param {Parameters<InstanceType<T>["render"]>} args
   * @returns {ReturnType<InstanceType<T>["render"]>}
   */
  static render(...args) {
    getSymmetricContext().serverComponents?.add(this.name);
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
