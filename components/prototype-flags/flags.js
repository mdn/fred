/**
 * @import { Flag, Overrides, ResolvedFlag } from "./types.js";
 */

export const STORAGE_KEY = "prototype-flags";

/** @type {Flag[]} */
export const FLAGS = [];

/**
 * @param {string} id
 * @returns {string}
 */
export function className(id) {
  return `prototype-${id}`;
}

/**
 * @param {{ classList: { toggle: (name: string, force: boolean) => void } }} root
 * @param {ResolvedFlag[]} flags
 */
export function applyFlags(root, flags) {
  for (const { id, enabled } of flags) {
    root.classList.toggle(className(id), enabled);
  }
}

/**
 * @param {string | null} stored
 * @returns {Overrides}
 */
export function parseOverrides(stored) {
  if (!stored) {
    return {};
  }
  /** @type {unknown} */
  let parsed;
  try {
    parsed = JSON.parse(stored);
  } catch {
    return {};
  }
  if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
    return {};
  }
  /** @type {Overrides} */
  const overrides = {};
  for (const [id, value] of Object.entries(parsed)) {
    if (typeof value === "boolean") {
      overrides[id] = value;
    }
  }
  return overrides;
}

/**
 * @param {Flag[]} flags
 * @param {Overrides} overrides
 * @returns {ResolvedFlag[]}
 */
export function resolveFlags(flags, overrides) {
  return flags.map(({ id, name, default: fallback }) => ({
    id,
    name,
    enabled: overrides[id] ?? fallback,
  }));
}
