// Lit caches parsed templates by the identity of their strings array.
/** @type {WeakMap<TemplateStringsArray, Map<string, TemplateStringsArray>>} */
const attrStrings = new WeakMap();

/**
 * @param {import("@lit").SVGTemplateResult} original
 * @param {{[key: string]: string}} attrs
 * @returns {import("@lit").SVGTemplateResult}
 */
export function addAttrs(original, attrs) {
  // turn { role: 'img', 'aria-label': 'Foo' } into: role="img" aria-label="Foo"
  const attrString = Object.entries(attrs)
    .map(([k, v]) => `${k}="${v}"`)
    .join(" ");
  const head = original.strings[0];
  if (!head) {
    return original;
  }
  let variants = attrStrings.get(original.strings);
  if (!variants) {
    variants = new Map();
    attrStrings.set(original.strings, variants);
  }
  let strings = variants.get(attrString);
  if (!strings) {
    const newHead = head.replace(/<svg([\s\S]*?)>/, `<svg$1 ${attrString}>`);
    const restStrings = original.strings.slice(1);
    strings = Object.assign([newHead, ...restStrings], {
      raw: [newHead, ...restStrings],
    });
    variants.set(attrString, strings);
  }
  return { ...original, strings };
}
