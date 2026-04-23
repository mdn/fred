/**
 * @import { LitElement } from "lit";
 * @import { Ref } from "lit/directives/ref.js";
 */

import { ViewedTracker } from "./viewed-tracker.js";

export class ViewedController {
  #host;
  /** @type {ViewedTracker | null} */
  #tracker = null;

  /**
   * @param {LitElement} host
   * @param {Ref<Element>} target
   * @param {Function} callback
   * @param {IntersectionObserverInit} [intersectionObserverOptions]
   */
  constructor(host, target, callback, intersectionObserverOptions) {
    this.#host = host;
    this.#host.addController(this);

    this.target = target;
    this.callback = callback;
    this.intersectionObserverOptions = intersectionObserverOptions;
  }

  hostDisconnected() {
    this.#tracker?.disconnect();
    this.#tracker = null;
  }

  hostUpdated() {
    const target = this.target.value;
    if (target && !this.#tracker) {
      this.#tracker = new ViewedTracker(
        target,
        this.callback,
        this.intersectionObserverOptions,
      );
      this.#tracker.connect();
    }
  }
}
