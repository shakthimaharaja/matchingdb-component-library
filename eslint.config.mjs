import js from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";

export default [
  js.configs.recommended,
  {
    files: ["src/**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
      globals: {
        document: "readonly",
        URL: "readonly",
        console: "readonly",
        HTMLButtonElement: "readonly",
        HTMLInputElement: "readonly",
        HTMLSelectElement: "readonly",
        HTMLTableCellElement: "readonly",
        Blob: "readonly",
        Array: "readonly",
        Map: "readonly",
        Set: "readonly",
        Record: "readonly",
        Math: "readonly",
        Number: "readonly",
        String: "readonly",
        Date: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
    },
    rules: {
      // ── TypeScript strict rules ──
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],

      // ── React rules ──
      "react/jsx-key": "error",
      "react/react-in-jsx-scope": "off",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // ── General quality ──
      "no-console": ["warn", { allow: ["warn", "error"] }],
      eqeqeq: ["error", "always"],
      "no-var": "error",
      "prefer-const": "error",
      "no-unused-vars": "off", // handled by @typescript-eslint/no-unused-vars
    },
    settings: {
      react: { version: "18" },
    },
  },
  {
    ignores: ["node_modules/**", "dist/**", ".storybook/**"],
  },
];
