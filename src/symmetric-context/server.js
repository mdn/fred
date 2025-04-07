import { AsyncLocalStorage } from "node:async_hooks";

globalThis.__MDNServerContext = new AsyncLocalStorage();

/**
 * @template R
 * @param {import("./types").SymmetricContext} context The server-derived values of the symmetric context
 * @param {() => R} callback
 */
export function runWithContext(context, callback) {
  return globalThis.__MDNServerContext.run(context, callback);
}
