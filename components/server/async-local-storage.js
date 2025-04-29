import { AsyncLocalStorage } from "node:async_hooks";

/** @type {AsyncLocalStorage<{ componentsUsed: Set<string> }>} */
export const asyncLocalStorage = new AsyncLocalStorage();
