/** @import { ChainablePromiseElement } from "webdriverio" */

export default class Component {
  /** @param {() => ChainablePromiseElement} elementFactory */
  constructor(elementFactory) {
    this.elementFactory = elementFactory;
  }

  get element() {
    return this.elementFactory();
  }
}
