/**
 *
 * @param {import("@lit").SVGTemplateResult} original
 * @param {{[key: string]: string}} attrs
 * @returns {import("@lit").SVGTemplateResult}
 */

export function addAttrs(original, attrs) {
  // turn { role: 'img', 'aria-label': 'Foo' } into: role="img" aria-label="Foo"
  const attrString = Object.entries(attrs)
    .map(([k, v]) => `${k}="${v}"`)
    .join(" ");
  const [head, ...restStrings] = original.strings;
  if (!head) {
    return original;
  }
  const newHead = head.replace(/<svg([\s\S]*?)>/, `<svg$1 ${attrString}>`);
  const newStrings = [newHead, ...restStrings];
  // @ts-expect-error
  newStrings.raw = [newHead, ...restStrings];
  // @ts-expect-error
  original.strings = newStrings;
  return original;
}
