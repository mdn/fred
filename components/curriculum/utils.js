import { nothing } from "lit";

import practicesSVG from "../curriculum/assets/curriculum-topic-practices.svg?lit";
import scriptingSVG from "../curriculum/assets/curriculum-topic-scripting.svg?lit";
import standardsSVG from "../curriculum/assets/curriculum-topic-standards.svg?lit";
import stylingSVG from "../curriculum/assets/curriculum-topic-styling.svg?lit";
import toolingSVG from "../curriculum/assets/curriculum-topic-tooling.svg?lit";

/** @enum {string} */
const Topic = {
  WebStandards: "Web Standards & Semantics",
  Styling: "Styling",
  Scripting: "Scripting",
  BestPractices: "Best Practices",
  Tooling: "Tooling",
  None: "",
};

/**
 * Maps a topic enum value to a CSS class string.
 * @param {Topic | undefined} topic
 * @returns {string} The corresponding CSS class name.
 */
export function topic2css(topic) {
  switch (topic) {
    case Topic.WebStandards:
      return "standards";
    case Topic.Styling:
      return "styling";
    case Topic.Scripting:
      return "scripting";
    case Topic.Tooling:
      return "tooling";
    case Topic.BestPractices:
      return "practices";
    default:
      return "none";
  }
}

/**
 * @param {import("@fred").Context<import("@rari").CurriculumPage>} _context
 * @param {string} topic - The topic string.
 * @returns {import("@lit").TemplateResult | nothing} The Lit HTML template for the topic icon SVG.
 */
export function renderTopicIcon(_context, topic) {
  const className = `topic-icon topic-${topic2css(topic)}`;
  // Simplified placeholder SVG content, using currentColor for fill where CSS vars apply.
  switch (topic) {
    case "Web Standards & Semantics":
      return addAttrs(standardsSVG, {
        role: "none",
        class: className,
      });
    case "Styling":
      return addAttrs(stylingSVG, {
        role: "none",
        class: className,
      });
    case "Scripting":
      return addAttrs(scriptingSVG, {
        role: "none",
        class: className,
      });
    case "Tooling":
      return addAttrs(toolingSVG, {
        role: "none",
        class: className,
      });
    case "Best Practices":
      return addAttrs(practicesSVG, {
        role: "none",
        class: className,
      });
    default:
      return nothing;
  }
}

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
