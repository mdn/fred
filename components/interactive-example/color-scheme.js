/**
 * @param {Iterable<{ classList: Iterable<string> }>} preElements
 * @returns {"light-dark" | "light" | "dark"}
 */
export function getInteractiveExampleColorScheme(preElements) {
  for (const pre of preElements) {
    const colorScheme = [...pre.classList].find((name) =>
      ["light-dark", "light", "dark"].includes(name),
    );
    if (colorScheme) {
      return /** @type {"light-dark" | "light" | "dark"} */ (colorScheme);
    }
  }
  return "light";
}
