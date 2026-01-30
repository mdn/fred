/**
 * Migration script to convert auto-ID l10n template tags to explicit ID format.
 *
 * Transforms:
 *   this.l10n`Hello world` → this.l10n("hello-world-xxxx")`Hello world`
 *
 * Usage: node scripts/migrate-l10n/index.js
 */

import path from "node:path";
import { fileURLToPath } from "node:url";

import { Node, Project, SyntaxKind } from "ts-morph";

import { getLiteralValue, isL10nTag } from "../../l10n/parser/extractor.js";

import { generateIdFromString } from "./utils.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const project = new Project({});

project.addSourceFilesAtPaths(
  path.join(__dirname, "..", "..", "components", "**", "*.js"),
);

for (const file of project.getSourceFiles()) {
  let fileModified = false;
  const filePath = file.getFilePath();
  const componentName =
    filePath.split("/components/")[1]?.split("/")[0] ?? "unknown";

  for (const taggedTemplate of file.getDescendantsOfKind(
    SyntaxKind.TaggedTemplateExpression,
  )) {
    const tagNode = taggedTemplate.getTag();
    const parent = tagNode.getParent();
    if (
      parent &&
      Node.isPropertyAccessExpression(tagNode) &&
      isL10nTag(tagNode)
    ) {
      // e.g. this.l10n`barfoo`
      const value = getLiteralValue(taggedTemplate);
      const key = generateIdFromString(value, componentName);

      // Get the full text of the property access (e.g., "this.l10n")
      const tagText = tagNode.getText();

      // Get the full tagged template text
      const fullText = parent.getText();

      // Replace with call expression format
      const newText = `${tagText}("${key}")${fullText.slice(tagText.length)}`;

      parent.replaceWithText(newText);

      fileModified = true;
    }
  }

  if (fileModified) {
    file.saveSync();
  }
}
