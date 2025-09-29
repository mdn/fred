import path from "node:path";

import { toCamelCase } from "./utils.js";

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

              const expectedDir = toCamelCase(className.replace(/^MDN/, ""));
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
              const expectedDir = toCamelCase(className);
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

              const expectedDir = toCamelCase(
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
