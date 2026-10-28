export class AsyncLocalStorage {
  #store = undefined;

  run(store, callback) {
    this.#store = store;
    return callback();
  }

  getStore() {
    return this.#store;
  }
}

/**
 * Store for internal context passed around components.
 *
 * Generally only used within the `ServerComponent` class itself,
 * or very special server components (such as the `OuterLayout`).
 *
 * e.g. We add the rspack compilation stats for use in `OuterLayout`.
 *
 * Populated in `entry.ssr.js`.
 *
 * @type {AsyncLocalStorage<import("./types.js").FredLocalContents>}
 */
export const asyncLocalStorage = new AsyncLocalStorage();
