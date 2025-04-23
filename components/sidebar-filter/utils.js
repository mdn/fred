/**
 * Used by quicksearch and sidebar filters.
 * @param {string} term
 * @returns {string[]}
 */
export function splitQuery(term) {
  term = term.trim().toLowerCase();

  return term.startsWith(".") || term.endsWith(".")
    ? // Dot is probably meaningful.
      term.split(/[ ,]+/)
    : // Dot is probably just a word separator.
      term.split(/[ ,.]+/);
}
