const OPTIONS = {
  threshold: 0.5,
};

export class ViewedTracker {
  #element;
  #callback;
  #options;

  /** @type {IntersectionObserver | null} */
  #observer = null;
  /** @type {ReturnType<typeof setTimeout> | null} */
  #timer = null;
  #hasViewed = false;
  #visible = !globalThis.document?.hidden;
  #onVisibilityChange = this.#handleVisibilityChange.bind(this);

  /**
   * @param {Element} element
   * @param {Function} callback
   * @param {IntersectionObserverInit} [options]
   */
  constructor(element, callback, options = OPTIONS) {
    this.#element = element;
    this.#callback = callback;
    this.#options = options;
  }

  connect() {
    document.addEventListener("visibilitychange", this.#onVisibilityChange);
    this.#observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        this.#checkAndSetTimer(entry.isIntersecting);
      }
    }, this.#options);
    this.#observer.observe(this.#element);
  }

  disconnect() {
    if (this.#observer) {
      this.#observer.disconnect();
      this.#observer = null;
    }
    if (this.#timer !== null) {
      clearTimeout(this.#timer);
      this.#timer = null;
    }
    document.removeEventListener("visibilitychange", this.#onVisibilityChange);
  }

  #handleVisibilityChange() {
    this.#visible = !document.hidden;
    this.#checkAndSetTimer();
  }

  /**
   * If the page is visible and the element is intersecting, start a 1-second timer
   * to dispatch the "view" event.
   *
   * If conditions are not met before the timer fires, clear the timer.
   *
   * @param {boolean} isIntersecting
   */
  #checkAndSetTimer(isIntersecting = false) {
    if (!this.#hasViewed && this.#visible && isIntersecting) {
      if (this.#timer === null) {
        this.#timer = globalThis.setTimeout(() => {
          this.#hasViewed = true;
          this.#callback();
        }, 1000);
      }
    } else {
      if (this.#timer !== null) {
        clearTimeout(this.#timer);
        this.#timer = null;
      }
    }
  }
}
