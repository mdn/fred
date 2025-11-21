import { AsyncLocalStorage } from "node:async_hooks";

/**
 * Store for internal context passed around components.
 *
 * Generally only used within the `ServerComponent` class itself,
 * or very special server components (such as the `OuterLayout`).
 *
 * Populated in `entry.ssr.js`.
 *
 * @type {AsyncLocalStorage<import("./types.js").FredLocalContents>}
 */
export const asyncLocalStorage = new AsyncLocalStorage();
