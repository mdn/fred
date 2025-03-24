import { defineConfig } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";
import * as lit from "eslint-plugin-lit";
import n from "eslint-plugin-n";
import * as wc from "eslint-plugin-wc";

export default defineConfig([
  n.configs["flat/recommended"],
  wc.configs["flat/best-practice"],
  lit.configs["flat/all"],
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
    },
  },
]);
