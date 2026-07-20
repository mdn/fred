export class SandboxComponent {
  /**
   * @template {typeof SandboxComponent} T
   * @this {T}
   * @returns {ReturnType<InstanceType<T>["render"]>}
   */
  static render() {
    return new this().render();
  }

  /* eslint-disable jsdoc/reject-any-type -- abstract render is overridden by subclasses (needs a supertype) yet consumed via generic `ReturnType<...>` (needs `any`); neither `unknown` nor `never` satisfies both */
  /**
   * @abstract
   * @returns {any}
   */
  /* eslint-enable jsdoc/reject-any-type */
  render() {
    throw new Error("Must be implemented by subclass");
  }
}
