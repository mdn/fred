import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

import { Transformer, parse, serialize } from "@fluent/syntax";

/**
 * @import { TextElement } from "@fluent/syntax";
 */

/**
 * Tranforms strings by:
 * - adding accents to all characters
 * - duplicating some vowels to create longer strings
 * - wrapping in square brackets to help detect truncation
 */
class AccentTransformer extends Transformer {
  // eslint-disable-next-line unicorn/consistent-function-scoping
  MARKS = Array.from({ length: 0x3_6f - 0x3_00 + 1 }, (_, i) =>
    String.fromCodePoint(0x3_00 + i),
  );

  /**
   * @param {number} min
   * @param {number} max
   */
  _randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * @param {number} min
   * @param {number} max
   */
  _randMarks(min, max) {
    const n = this._randInt(min, max);
    let out = "";
    for (let i = 0; i < n; i++) {
      out += this.MARKS[this._randInt(0, this.MARKS.length - 1)];
    }
    return out;
  }

  /** @param {string} str  */
  _accent(str) {
    return [...str]
      .flatMap((char) => {
        return /\S/i.test(char)
          ? ("aeiou".includes(char.toLowerCase())
              ? Array.from({ length: this._randInt(1, 3) }, () => char)
              : [char]
            ).map((char) => char + this._randMarks(1, 1))
          : char;
      })
      .join("");
  }

  /**
   * @param {TextElement} node
   */
  visitTextElement(node) {
    node.value =
      "[" +
      node.value
        .split(/(<[^>]*>)/g)
        .map((token) => (token.startsWith("<") ? token : this._accent(token)))
        .join("") +
      "]";
    return node;
  }
}

export async function generateQaaLocale() {
  const strings = await readFile(
    fileURLToPath(import.meta.resolve("../template.ftl")),
    "utf8",
  );
  const resource = parse(strings, {});

  const accentedResource = resource.clone();
  new AccentTransformer().genericVisit(accentedResource);
  await writeFile(
    fileURLToPath(import.meta.resolve("../locales/qaa.ftl")),
    serialize(accentedResource, {}),
    "utf8",
  );
}
