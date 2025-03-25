import { defineConfig } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";
import * as lit from "eslint-plugin-lit";
import n from "eslint-plugin-n";
import * as wc from "eslint-plugin-wc";
import unicorn from "eslint-plugin-unicorn";

export default defineConfig([
  n.configs["flat/recommended"],
  wc.configs["flat/best-practice"],
  lit.configs["flat/all"],
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
    rules: {
      "no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "n/no-unsupported-features/node-builtins": ["off"],
      "unicorn/prevent-abbreviations": ["off"],
      "unicorn/template-indent": ["off"],
    },
  },
]);
