import {
  FLAGS,
  STORAGE_KEY,
  applyFlags,
  parseOverrides,
  resolveFlags,
} from "./flags.js";

try {
  const overrides = parseOverrides(localStorage.getItem(STORAGE_KEY));
  applyFlags(document.documentElement, resolveFlags(FLAGS, overrides));
} catch (error) {
  console.warn("Unable to set prototype flags", error);
}
