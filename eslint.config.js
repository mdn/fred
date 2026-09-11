import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { includeIgnoreFile } from "@eslint/config-helpers";
import js from "@eslint/js";
import { defineConfig } from "eslint/config";
import prettierConfig from "eslint-config-prettier/flat";
import importX from "eslint-plugin-import-x";
import jsdoc from "eslint-plugin-jsdoc";
import * as lit from "eslint-plugin-lit";
import n from "eslint-plugin-n";
import unicorn from "eslint-plugin-unicorn";
import * as wc from "eslint-plugin-wc";
import globals from "globals";
import tseslint from "typescript-eslint";

import fred from "./build/eslint-fred.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const gitignorePath = path.resolve(__dirname, ".gitignore");
const gitExcludePath = path.resolve(__dirname, ".git", "info", "exclude");

export default defineConfig([
  includeIgnoreFile(gitignorePath),
  ...(fs.existsSync(gitExcludePath) ? [includeIgnoreFile(gitExcludePath)] : []),
  {
    ignores: ["./vendor/"],
  },
  jsdoc.configs["flat/recommended"],
  n.configs["flat/recommended"],
  wc.configs["flat/best-practice"],
  lit.configs["flat/all"],
  tseslint.configs["recommended"],
  unicorn.configs["recommended"],
  { files: ["**/*.{js,mjs,cjs}"] },
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: { globals: globals.browser },
  },
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended"],
  },
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { fred },
    rules: {
      "fred/custom-element-name": "error",
      "fred/server-component-name": "error",
      "fred/sandbox-component-name": "error",
      "fred/server-html-import": "error",
    },
  },
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { "@typescript-eslint": tseslint.plugin },
    rules: {
      "@typescript-eslint/ban-ts-comment": [
        "error",
        {
          "ts-expect-error": false,
        },
      ],
    },
  },
  {
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "jsdoc/no-undefined-types": "off",
      "jsdoc/require-jsdoc": "off",
      "jsdoc/require-param-description": "off",
      "jsdoc/require-param-type": "off",
      "jsdoc/require-returns": "off",
      "jsdoc/require-returns-description": "off",
      "jsdoc/require-returns-type": "off",
      "jsdoc/tag-lines": "off",
      "jsdoc/check-tag-names": [
        "error",
        { definedTags: ["element", "attr", "slot"] },
      ],
      "lit/no-template-map": "off",
      "lit/prefer-query-decorators": "off",
      "no-restricted-syntax": [
        "error",
        {
          selector:
            "PropertyDefinition[static=true][key.name='properties'][value.type='ObjectExpression']",
          message:
            "Declare reactive properties with `static get properties()`, so lit-analyzer can detect the element's attributes.",
        },
      ],
      "n/no-missing-import": "off",
      "n/no-unsupported-features/node-builtins": ["off"],
      "n/no-unpublished-import": "off",
      "no-unused-vars": "off", // Prefer `@typescript-eslint/no-unused-vars`.
      "unicorn/consistent-boolean-name": "off",
      "unicorn/consistent-class-member-order": "off",
      "unicorn/consistent-optional-chaining": "off",
      "unicorn/logical-assignment-operators": "off",
      "unicorn/max-nested-calls": "off",
      "unicorn/name-replacements": "off",
      "unicorn/no-array-callback-reference": "off",
      "unicorn/no-array-reverse": "off",
      "unicorn/no-array-sort": "off",
      "unicorn/no-array-splice": "off",
      "unicorn/no-break-in-nested-loop": "off",
      "unicorn/no-computed-property-existence-check": "off",
      "unicorn/no-declarations-before-early-exit": "off",
      "unicorn/no-global-object-property-assignment": "off",
      "unicorn/no-immediate-mutation": "off",
      "unicorn/no-loop-iterable-mutation": "off",
      "unicorn/no-null": ["off"],
      "unicorn/no-return-array-push": "off",
      "unicorn/no-top-level-assignment-in-function": "off",
      "unicorn/no-top-level-side-effects": "off",
      "unicorn/no-undeclared-class-members": "off",
      "unicorn/no-unnecessary-global-this": "off",
      "unicorn/no-unreadable-array-destructuring": "off",
      "unicorn/no-unreadable-for-of-expression": "off",
      "unicorn/no-unreadable-object-destructuring": "off",
      "unicorn/no-unsafe-string-replacement": "off",
      "unicorn/no-useless-else": "off",
      "unicorn/no-useless-template-literals": "off",
      "unicorn/prefer-await": "off",
      "unicorn/prefer-continue": "off",
      "unicorn/prefer-early-return": "off",
      "unicorn/prefer-else-if": "off",
      "unicorn/prefer-hoisting-branch-code": "off",
      "unicorn/prefer-iterator-to-array": "off",
      "unicorn/prefer-number-coercion": "off",
      "unicorn/prefer-object-destructuring-defaults": "off",
      "unicorn/prefer-private-class-fields": "off",
      "unicorn/prefer-scoped-selector": "off",
      "unicorn/prefer-simple-condition-first": "off",
      "unicorn/prefer-string-raw": "off",
      "unicorn/prefer-ternary": "off",
      "unicorn/prefer-query-selector": "off",
      "unicorn/prefer-url-href": "off",
      "unicorn/prevent-abbreviations": ["off"],
      "unicorn/require-array-sort-compare": "off",
      "unicorn/require-module-specifiers": "off",
      "unicorn/single-line-block-comment-style": "off",
      "unicorn/switch-case-braces": "off",
      "unicorn/template-indent": ["off"],
    },
  },
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { "import-x": importX },
    rules: {
      "sort-imports": "off",
      "import-x/order": [
        "error",
        {
          alphabetize: {
            order: "asc",
          },
          named: true,
          "newlines-between": "always-and-inside-groups",
        },
      ],
    },
  },
  prettierConfig,
  {
    files: ["test/specs/**/*.js"],
    languageOptions: {
      globals: {
        ...globals.mocha,
      },
    },
  },
]);
