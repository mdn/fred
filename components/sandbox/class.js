export class SandboxComponent {
  /**
   * @template {typeof SandboxComponent} T
   * @this {T}
   * @param {import("@fred").SandboxContext} context
   * @returns {ReturnType<InstanceType<T>["render"]>}
   */
  static render(context) {
    return new this().render(context);
  }

  /* eslint-disable jsdoc/reject-any-type -- abstract render is overridden by subclasses (needs a supertype) yet consumed via generic `ReturnType<...>` (needs `any`); neither `unknown` nor `never` satisfies both */
  /**
   * @abstract
   * @param {import("@fred").SandboxContext} _context
   * @returns {any}
   */
  /* eslint-enable jsdoc/reject-any-type */
  render(_context) {
    throw new Error("Must be implemented by subclass");
  }
}
