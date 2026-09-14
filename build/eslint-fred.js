import path from "node:path";

import { camelToKebabCase } from "../utils/name-transformation.js";

/** @type {import("eslint").ESLint.Plugin} */
export default {
  rules: {
    "custom-element-name": {
      meta: {
        type: "problem",
      },
      create(context) {
        return {
          /**
           * @param {import("estree").ClassDeclaration} node
           */
          ClassDeclaration(node) {
            const filename = context.filename;
            const [className, superClassName] = getClassNames(node);

            if (superClassName === "LitElement") {
              if (!className.startsWith("MDN")) {
                context.report({
                  node,
                  message: `Class '${className}' extends LitElement and should have an 'MDN' prefix.`,
                });
              }

              const expectedDir = camelToKebabCase(
                className.replace(/^MDN/, ""),
              );
              const expectedPath = path.join(
                "components",
                expectedDir,
                "element.js",
              );
              if (!filename.endsWith(expectedPath)) {
                context.report({
                  node,
                  message: `Class '${className}' extends LitElement and should be in a file named 'components/${expectedDir}/element.js'.`,
                });
              }
            }
          },
        };
      },
    },
    "server-component-name": {
      meta: {
        type: "problem",
      },
      create(context) {
        return {
          /**
           * @param {import("estree").ClassDeclaration} node
           */
          ClassDeclaration(node) {
            const filename = context.filename;
            const [className, superClassName] = getClassNames(node);

            if (superClassName === "ServerComponent") {
              const expectedDir = camelToKebabCase(className);
              const expectedPath = path.join(
                "components",
                expectedDir,
                "server.js",
              );
              if (!filename.endsWith(expectedPath)) {
                context.report({
                  node,
                  message: `Class '${className}' extends ServerComponent and should be in a file named './components/${expectedDir}/server.js'.`,
                });
              }
            }
          },
        };
      },
    },
    "sandbox-component-name": {
      meta: {
        type: "problem",
      },
      create(context) {
        return {
          /**
           * @param {import("estree").ClassDeclaration} node
           */
          ClassDeclaration(node) {
            const filename = context.filename;
            const [className, superClassName] = getClassNames(node);

            if (superClassName === "SandboxComponent") {
              if (!className.endsWith("Sandbox")) {
                context.report({
                  node,
                  message: `Class '${className}' extends SandboxComponent and should have a 'Sandbox' suffix.`,
                });
              }

              const expectedDir = camelToKebabCase(
                className.replace(/Sandbox$/, ""),
              );
              const expectedPath = path.join(
                "components",
                expectedDir,
                "sandbox.js",
              );
              if (!filename.endsWith(expectedPath)) {
                context.report({
                  node,
                  message: `Class '${className}' extends SandboxComponent and should be in a file named './components/${expectedDir}/sandbox.js'.`,
                });
              }
            }
          },
        };
      },
    },
    "no-external-link-whitespace": {
      meta: {
        type: "problem",
        fixable: "whitespace",
        docs: {
          description:
            "disallow leading/trailing whitespace inside external links, so the icon stays attached to the last word",
        },
      },
      create(context) {
        return {
          /**
           * @param {import("estree").TaggedTemplateExpression} node
           */
          TaggedTemplateExpression(node) {
            if (node.tag.type !== "Identifier" || node.tag.name !== "html") {
              return;
            }

            const { quasis, expressions } = node.quasi;
            const { source, segments } = flattenTemplate(quasis);
            const sourceCode = /** @type {import("eslint").SourceCode} */ (
              context.sourceCode
            );

            for (const anchor of findExternalAnchors(source, (index) =>
              sourceCode.getText(expressions[index]),
            )) {
              const ranges = anchor.whitespace.map((range) =>
                toSourceRange(segments, range),
              );
              const [start, end] = toSourceRange(segments, anchor.span);
              context.report({
                node,
                loc: {
                  start: sourceCode.getLocFromIndex(start),
                  end: sourceCode.getLocFromIndex(end),
                },
                message:
                  "External links must not start or end with whitespace, otherwise the icon wraps onto its own line.",
                fix: (fixer) => ranges.map((range) => fixer.removeRange(range)),
              });
            }
          },
        };
      },
    },
    "server-html-import": {
      meta: {
        type: "problem",
      },
      create(context) {
        return {
          /**
           * @param {import("estree").ImportDeclaration} node
           */
          ImportDeclaration(node) {
            const filename = context.filename;
            if (!/\/components\/.*\/server\.js$/.test(filename)) {
              return;
            }

            if (node.source.value === "lit") {
              const htmlSpecifier = node.specifiers.some(
                (spec) =>
                  spec.type === "ImportSpecifier" &&
                  spec.imported.type === "Identifier" &&
                  spec.imported.name === "html",
              );
              if (htmlSpecifier) {
                context.report({
                  node,
                  message: `Import "html" from "@lit-labs/ssr" instead of "lit" in server.js files.`,
                });
              }
            }
          },
        };
      },
    },
  },
};

/**
 * @param {import("estree").ClassDeclaration} node
 * @returns {[string, string | undefined]} `[className, superClassName]`
 */
function getClassNames(node) {
  return [
    node.id?.name || "",
    node.superClass?.type === "Identifier" ? node.superClass.name : undefined,
  ];
}

const PLACEHOLDER = "$__fred_expr_";
const PLACEHOLDER_RE = new RegExp(`\\${PLACEHOLDER}(\\d+)__`, "g");

/**
 * Joins the raw template chunks into one HTML string, replacing each
 * `${}` with a placeholder that contains neither whitespace nor `>`.
 * @param {import("estree").TemplateElement[]} quasis
 * @returns {{ source: string, segments: Array<[number, number, number]> }}
 * `segments` maps `[startInSource, endInSource, startInFile]` per chunk.
 */
function flattenTemplate(quasis) {
  let source = "";
  /** @type {Array<[number, number, number]>} */
  const segments = [];
  for (const [index, quasi] of quasis.entries()) {
    const raw = quasi.value.raw;
    // `range` excludes the backtick / `${` / `}` delimiters.
    const fileStart = /** @type {[number, number]} */ (quasi.range)[0] + 1;
    segments.push([source.length, source.length + raw.length, fileStart]);
    source += raw;
    if (index < quasis.length - 1) {
      source += `${PLACEHOLDER}${index}__`;
    }
  }
  return { source, segments };
}

/**
 * @param {Array<[number, number, number]>} segments
 * @param {[number, number]} range
 * @returns {[number, number]}
 */
function toSourceRange(segments, [start, end]) {
  return [toSourceOffset(segments, start), toSourceOffset(segments, end)];
}

/**
 * @param {Array<[number, number, number]>} segments
 * @param {number} offset
 */
function toSourceOffset(segments, offset) {
  const segment = segments.find(
    ([start, end]) => offset >= start && offset <= end,
  );
  if (!segment) {
    throw new Error(`Offset ${offset} is inside a template expression`);
  }
  return segment[2] + (offset - segment[0]);
}

const ANCHOR_RE = /<a\b((?:[^>"']|"[^"]*"|'[^']*')*)>([\s\S]*?)<\/a\s*>/g;
const CLASS_RE = /\bclass\s*=\s*(?:"([^"]*)"|'([^']*)'|(\S+))/;

/**
 * @typedef {object} ExternalAnchor
 * @property {Array<[number, number]>} whitespace offsets (in `source`) of the
 * leading and/or trailing whitespace of an offending external anchor
 * @property {[number, number]} span covers all `whitespace` ranges, for reporting
 */

/**
 * @param {string} source
 * @param {(index: number) => string} getExpressionText
 * @returns {ExternalAnchor[]}
 */
function findExternalAnchors(source, getExpressionText) {
  /** @type {ExternalAnchor[]} */
  const anchors = [];
  for (const match of source.matchAll(ANCHOR_RE)) {
    const attributes = match[1] ?? "";
    const body = match[2] ?? "";
    if (!isExternal(attributes, getExpressionText)) {
      continue;
    }
    const bodyStart =
      match.index + "<a".length + attributes.length + ">".length;
    const bodyEnd = bodyStart + body.length;
    const leading = /^\s+/.exec(body);
    const trailing = /\s+$/.exec(body);
    /** @type {Array<[number, number]>} */
    const whitespace = [];
    if (leading) {
      whitespace.push([bodyStart, bodyStart + leading[0].length]);
    }
    if (trailing && !(leading && leading[0].length === body.length)) {
      whitespace.push([bodyEnd - trailing[0].length, bodyEnd]);
    }
    const first = whitespace[0];
    const last = whitespace.at(-1);
    if (first && last) {
      anchors.push({ whitespace, span: [first[0], last[1]] });
    }
  }
  return anchors;
}

/**
 * An anchor is external when its class contains the `external` token,
 * either literally or in the source of an interpolated expression.
 * @param {string} attributes
 * @param {(index: number) => string} getExpressionText
 */
function isExternal(attributes, getExpressionText) {
  const match = CLASS_RE.exec(attributes);
  if (!match) {
    return false;
  }
  const value = match[1] ?? match[2] ?? match[3] ?? "";
  const expanded = value.replaceAll(PLACEHOLDER_RE, (_, index) =>
    getExpressionText(Number(index)),
  );
  return /\bexternal\b/.test(expanded);
}
