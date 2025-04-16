/**
 * @param {string} mode
 */
export function applyColorTheme(mode) {
  document.documentElement.style.colorScheme =
    mode === "osDefault" ? "light dark" : mode;
}

export function loadColorTheme() {
  let mode = null;
  try {
    mode = localStorage.getItem("theme");
  } catch (error) {
    console.warn("Unable to read theme from localStorage", error);
  }
  return mode;
}
