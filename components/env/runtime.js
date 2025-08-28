import { parseBool } from "./utils.js";

/** @type {string[]} */
export const runtimeVariables = [];
/** Overriden to prod default (false) in rspack config, set to true so it works in dev server by default. */
export const RUNTIME_ENV = parseBool("RUNTIME_ENV", true);
