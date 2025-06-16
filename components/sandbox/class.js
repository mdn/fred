export class SandboxComponent {
  /**
   * @template {typeof SandboxComponent} T
   * @this {T}
   * @returns {ReturnType<InstanceType<T>["render"]>}
   */
  static render() {
    return new this().render();
  }

  /**
   * @abstract
   * @returns {any}
   */
  render() {
    throw new Error("Must be implemented by subclass");
  }
}
