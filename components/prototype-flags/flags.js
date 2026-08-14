/**
 * @import { Flag, Overrides, ResolvedFlag } from "./types.js";
 */

export const STORAGE_KEY = "prototype-flags";

/** @type {Flag[]} */
export const FLAGS = [
  {
    id: "baseline-high-links",
    name: "Show Baseline Widely Available icon after links",
    default: false,
  },
  {
    id: "baseline-low-links",
    name: "Show Baseline Newly Available icon after links",
    default: true,
  },
  {
    id: "baseline-limited-links",
    name: "Show Limited Availability icon after links",
    default: true,
  },
  {
    id: "baseline-icons-code-only",
    name: "Only show icons after code blocks",
    default: false,
  },
  {
    id: "baseline-icons-dt-only",
    name: "Only show icons in <dt>s",
    default: false,
  },
  {
    id: "baseline-icons-in-code",
    name: "Show Baseline icons within code blocks",
    default: false,
  },
  {
    id: "baseline-icons-hide-others",
    name: "Baseline icons hide other icons",
    default: true,
  },
];

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
