import { AsyncLocalStorage } from "node:async_hooks";

/** @type {AsyncLocalStorage<import("./types.js").AsyncLocalStorageContents>} */
export const asyncLocalStorage = new AsyncLocalStorage();
