/**
 * @param {string} str
 */
export default function escape(str) {
  return str
    .replaceAll(`\\`, `\\\\`)
    .replaceAll(`$`, `\\$`)
    .replaceAll(`\``, `\\\``);
}
