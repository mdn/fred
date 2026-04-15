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
    "require-aria-label-for-title": {
      meta: {
        type: "problem",
        docs: {
          // "Relying on the title attribute is currently discouraged as many user agents do not expose the attribute in an accessible manner …"
          // See: https://html.spec.whatwg.org/multipage/dom.html#the-title-attribute
          description: "require aria-label for HTML elements with title",
        },
      },
      create(context) {
        return {
          /**
           * @param {import("estree").TaggedTemplateExpression} node
           */
          TaggedTemplateExpression(node) {
            // Only process html`` tagged template literals.
            const { tag } = node;
            if (tag.type !== "Identifier" || tag.name !== "html") {
              return;
            }

            // Reconstruct the template string by joining the static parts with
            // a placeholder so attribute patterns remain searchable across
            // expression boundaries.
            const reconstructed = node.quasi.quasis
              .map((q) => q.value.cooked ?? q.value.raw)
              .join('"__EXPR__"');

            // Match opening HTML tags; attributes may span multiple lines.
            // Expressions are replaced with "__EXPR__" so no stray > chars.

            const tagPattern = /<([a-z][a-z0-9-]*)(\s[^>]*)?\/?>/gis;

            /**
             * @param {string} tag
             * @param {string} attr
             * @param attr
             */
            const hasAttr = (tag, attr) =>
              new RegExp(`(?:^|\\s)${attr}\\s*=`).test(tag);

            // Skip elements where title has standardized HTML semantics
            // (abbr expansion) or where aria-label is not applicable (link).
            const SKIP_TAG_NAMES = new Set(["abbr", "link"]);

            for (const [fullTag, tagName] of reconstructed.matchAll(
              tagPattern,
            )) {
              if (!tagName || SKIP_TAG_NAMES.has(tagName)) continue;

              if (!hasAttr(fullTag, "title")) continue;
              if (hasAttr(fullTag, "aria-label")) continue;

              context.report({
                node,
                message: `<${tagName}> has a title attribute but no aria-label. Add aria-label with the same value, or eslint-disable this rule with a comment explaining why.`,
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
              const htmlSpecifier = node.specifiers.find(
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
