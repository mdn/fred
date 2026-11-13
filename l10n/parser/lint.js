import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  Message,
  Placeable,
  SelectExpression,
  StringLiteral,
  Term,
  TextElement,
  parse,
} from "@fluent/syntax";

import {
  ALLOWED_ATTRIBUTES,
  ALLOWED_TAGS,
  NAME_ATTRIBUTE,
  tokenize,
} from "../markup.js";

/**
 * @import { Pattern } from "@fluent/syntax"
 */

/**
 * @typedef {{ text: string, anchors: { index: number, start: number }[] }} Fragment
 *   Text of a pattern, with the source offset (`start`) of each of its elements
 *   by position in the text (`index`).
 */

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Stands in for a placeable, whose value is only known at runtime.
const PLACEABLE = "￼";

/**
 * Checks the markup of all l10n strings.
 *
 * @returns {Promise<string[]>} Errors
 */
export async function lintMarkup() {
  const root = path.join(__dirname, "..");
  const templatePath = path.join(root, "template.ftl");
  const template = await readFile(templatePath, "utf8");

  const localesDir = path.join(root, "locales");
  const files = await readdir(localesDir);
  const results = await Promise.all(
    files
      .filter((file) => file.endsWith(".ftl"))
      .toSorted()
      .map(async (file) => {
        const filePath = path.join(localesDir, file);
        const errors = lintResource(
          await readFile(filePath, "utf8"),
          // en-US.ftl is the source of template.ftl
          file === "en-US.ftl" ? undefined : template,
        );
        return errors.map((error) => `l10n/locales/${file}:${error}`);
      }),
  );

  return [
    ...lintResource(template).map((error) => `l10n/template.ftl:${error}`),
    ...results.flat(),
  ];
}

/**
 * @param {string} source Fluent file to check
 * @param {string} [reference] Fluent file defining which names `source` may use
 * @returns {string[]} Errors, prefixed with line number and message id
 */
export function lintResource(source, reference) {
  const referenceNames =
    reference === undefined ? undefined : collectNames(reference);

  /** @type {string[]} */
  const errors = [];
  for (const { id, pattern } of patterns(source)) {
    for (const fragment of flatten(pattern)) {
      // Messages missing from the reference are never rendered.
      for (const { index, message } of lintText(
        fragment.text,
        referenceNames?.get(id),
      )) {
        const line = lineAt(source, fragment, index);
        errors.push(`${line}: \`${id}\`: ${message}`);
      }
    }
  }
  return errors;
}

/**
 * @param {string} source
 * @yields {{ id: string, pattern: Pattern }}
 * @returns {Generator<{ id: string, pattern: Pattern }>}
 */
function* patterns(source) {
  for (const entry of parse(source, {}).body) {
    if (entry instanceof Message || entry instanceof Term) {
      const id = (entry instanceof Term ? "-" : "") + entry.id.name;
      if (entry.value) {
        yield { id, pattern: entry.value };
      }
      for (const attribute of entry.attributes) {
        yield { id: `${id}.${attribute.id.name}`, pattern: attribute.value };
      }
    }
  }
}

/**
 * @param {string} source
 * @returns {Map<string, Map<string, string>>} Tag by name, by message id
 */
function collectNames(source) {
  /** @type {Map<string, Map<string, string>>} */
  const names = new Map();
  for (const { id, pattern } of patterns(source)) {
    /** @type {Map<string, string>} */
    const messageNames = new Map();
    for (const { text } of flatten(pattern)) {
      for (const token of tokenize(text)) {
        const name =
          token.type === "open" ? token.attributes[NAME_ATTRIBUTE] : undefined;
        if (token.type === "open" && name !== undefined) {
          messageNames.set(name, token.tag);
        }
      }
    }
    names.set(id, messageNames);
  }
  return names;
}

/**
 * @param {Pattern} pattern
 * @returns {Fragment[]} Text of the pattern, followed by the text of each nested variant
 */
function flatten(pattern) {
  let text = "";
  /** @type {Fragment["anchors"]} */
  const anchors = [];
  /** @type {Fragment[]} */
  const nested = [];
  for (const element of pattern.elements) {
    anchors.push({ index: text.length, start: element.span?.start ?? 0 });
    if (element instanceof TextElement) {
      text += element.value;
      continue;
    }
    let expression = element.expression;
    while (expression instanceof Placeable) {
      expression = expression.expression;
    }
    if (expression instanceof StringLiteral) {
      text += expression.parse().value;
    } else {
      text += PLACEABLE;
      if (expression instanceof SelectExpression) {
        for (const variant of expression.variants) {
          nested.push(...flatten(variant.value));
        }
      }
    }
  }
  return [{ text, anchors }, ...nested];
}

/**
 * @param {string} source
 * @param {Fragment} fragment
 * @param {number} index Position in the text of `fragment`
 * @returns {number} Line in `source`
 */
function lineAt(source, { text, anchors }, index) {
  const anchor = anchors.findLast((anchor) => anchor.index <= index) ?? {
    index: 0,
    start: 0,
  };
  // Text elements keep their line breaks, but not their indentation.
  return (
    source.slice(0, anchor.start).split("\n").length +
    text.slice(anchor.index, index).split("\n").length -
    1
  );
}

/**
 * @param {string} text
 * @param {Map<string, string>} [referenceNames] Tag by name, if restricted
 * @returns {{ index: number, message: string }[]} Errors, by position in `text`
 */
function lintText(text, referenceNames) {
  /** @type {{ index: number, message: string }[]} */
  const errors = [];
  /** @type {{ tag: string, index: number }[]} */
  const open = [];
  let index = 0;
  let next = 0;
  /** @param {string} message */
  const report = (message) => {
    errors.push({ index, message });
  };

  for (const token of tokenize(text)) {
    index = next;
    next += token.value.length;

    if (token.type === "text") {
      for (const { index: offset } of token.value.matchAll(/</g)) {
        errors.push({
          index: index + offset,
          message:
            "`<` that is not part of a well-formed tag (use `&lt;` for a literal `<`, and double-quoted attribute values without placeables)",
        });
      }
      continue;
    }

    if (token.type === "close") {
      if (open.at(-1)?.tag === token.tag) {
        open.pop();
      } else {
        report(`unexpected closing tag \`</${token.tag}>\``);
      }
      continue;
    }

    const display = `\`<${token.tag}>\``;
    const { [NAME_ATTRIBUTE]: name, ...attributes } = token.attributes;

    if (token.value.includes(PLACEABLE)) {
      report(`placeable in an attribute of ${display}`);
    }

    if (name === undefined) {
      if (!ALLOWED_TAGS.has(token.tag)) {
        report(
          `tag ${display} is not allowed without \`${NAME_ATTRIBUTE}\` (allowed: ${[
            ...ALLOWED_TAGS,
          ]
            .map((tag) => `\`<${tag}>\``)
            .join(", ")})`,
        );
      }
      for (const attribute of Object.keys(attributes)) {
        report(
          `attribute \`${attribute}\` is not allowed on ${display} without \`${NAME_ATTRIBUTE}\``,
        );
      }
    } else {
      if (referenceNames) {
        const referenceTag = referenceNames.get(name);
        if (referenceTag === undefined) {
          report(
            `\`${NAME_ATTRIBUTE}="${name}"\` does not exist in the en-US message`,
          );
        } else if (referenceTag !== token.tag) {
          report(
            `\`${NAME_ATTRIBUTE}="${name}"\` is a \`<${referenceTag}>\` in the en-US message, not a ${display}`,
          );
        }
      }
      for (const attribute of Object.keys(attributes)) {
        if (!ALLOWED_ATTRIBUTES.includes(attribute)) {
          report(
            `attribute \`${attribute}\` is not allowed on ${display} (allowed: ${ALLOWED_ATTRIBUTES.map(
              (allowed) => `\`${allowed}\``,
            ).join(", ")})`,
          );
        }
      }
    }

    if (!token.void) {
      open.push({ tag: token.tag, index });
    }
  }

  for (const { tag, index } of open) {
    errors.push({ index, message: `unclosed tag \`<${tag}>\`` });
  }

  return errors;
}
