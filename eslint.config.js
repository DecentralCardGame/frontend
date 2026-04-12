import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import vue from "eslint-plugin-vue";
import globals from "globals";
import prettierPlugin from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";
import vueParser from "vue-eslint-parser";

export default tseslint.config(
  {
    ignores: ["**/dist/**", "**/coverage/**", "**/*.d.ts"],
  },

  // Base config — applies to ALL files
  {
    files: ["**/*.{ts,js,vue}"],

    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.browser,
    },

    plugins: {
      vue,
      prettier: prettierPlugin,
    },

    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...vue.configs["flat/recommended"],
    ],

    rules: {
      // eslint --fix WILL format
      "prettier/prettier": [
        "error",
        {
          semi: true,
          singleQuote: false,
          trailingComma: "es5",
          printWidth: 100,
        },
      ],
    },
  },

  // TS parser
  {
    files: ["**/*.{ts,js}"],
    languageOptions: {
      parser: tseslint.parser,
    },
  },

  // Vue SFC parser
  {
    files: ["**/*.vue"],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tseslint.parser,
      },
    },
  },

  // Disable conflicting formatting rules LAST
  prettierConfig
);
