/**
 * @import { LitElement } from "lit";
 * @import { Ref } from "lit/directives/ref.js";
 */

import { ViewedObserver } from "./viewed-observer.js";

export class ViewedController {
  #host;
  /** @type {ViewedObserver | null} */
  observer = null;

  /**
   * @param {LitElement} host
   * @param {Ref<Element>} target
   * @param {Function} callback
   * @param {IntersectionObserverInit} [observerOptions]
   */
  constructor(host, target, callback, observerOptions) {
    this.#host = host;
    this.#host.addController(this);

    this.target = target;
    this.callback = callback;
    this.observerOptions = observerOptions;
  }

  hostDisconnected() {
    this.observer?.disconnect();
    this.observer = null;
  }

  hostUpdated() {
    const target = this.target.value;
    if (target && !this.observer) {
      this.observer = new ViewedObserver(
        target,
        this.callback,
        this.observerOptions,
      );
      this.observer.connect();
    }
  }
}
