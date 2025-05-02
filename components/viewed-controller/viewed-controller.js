/**
 * @import { LitElement } from "lit";
 * @import { Ref } from "lit/directives/ref.js";
 */

const OPTIONS = {
  threshold: 0.5,
};

export class ViewedController {
  #host;

  /**
   * @param {LitElement} host
   * @param {Ref<Element>} target
   * @param {Function} callback
   * @param {IntersectionObserverInit} [intersectionObserverOptions]
   */
  constructor(host, target, callback, intersectionObserverOptions = OPTIONS) {
    this.#host = host;
    this.#host.addController(this);

    this.target = target;
    this.callback = callback;
    this.intersectionObserverOptions = intersectionObserverOptions;

    this._visible = !globalThis.document?.hidden;
    this._timer = null;
    this._hasViewed = false;
    this._onVisibilityChange = this.onVisibilityChange.bind(this);
  }

  hostConnected() {
    document.addEventListener("visibilitychange", this._onVisibilityChange);
  }

  hostDisconnected() {
    this.disconnectObserver();
    document.removeEventListener("visibilitychange", this._onVisibilityChange);
  }

  hostUpdated() {
    const target = this.target.value;
    if (target) {
      this._observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          this._checkAndSetTimer(entry.isIntersecting);
        }
      }, this.intersectionObserverOptions);
      this._observer.observe(target);
    }
  }

  disconnectObserver() {
    if (this._observer) {
      this._observer.disconnect();
    }
  }

  onVisibilityChange() {
    this._visible = !document.hidden;
    this._checkAndSetTimer();
  }

  /**
   * If the page is visible and the element is intersecting, start a 1-second timer
   * to dispatch the "view" event.
   *
   * If conditions are not met before the timer fires, clear the timer.
   *
   * @param {boolean} isIntersecting
   */
  _checkAndSetTimer(isIntersecting = false) {
    if (!this._hasViewed && this._visible && isIntersecting) {
      if (this._timer === null) {
        this._timer = globalThis.setTimeout(() => {
          this._hasViewed = true;
          this.callback();
        }, 1000);
      }
    } else {
      if (this._timer !== null) {
        clearTimeout(this._timer);
        this._timer = null;
      }
    }
  }
}
