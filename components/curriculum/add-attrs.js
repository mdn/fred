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
  const newHead = head.replace(/<svg([\s\S]*?)>/, `<svg$1 ${attrString}>`);
  const restStrings = original.strings.slice(1);
  const strings = Object.freeze(
    Object.assign([newHead, ...restStrings], {
      raw: Object.freeze([newHead, ...restStrings]),
    }),
  );
  return { ...original, strings };
}
