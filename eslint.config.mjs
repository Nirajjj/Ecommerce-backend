import tseslint from "typescript-eslint";
import stylistic from "@stylistic/eslint-plugin";

export default tseslint.config({
  files: ["**/*.ts"],
  languageOptions: {
    parser: tseslint.parser, // <-- This tells ESLint how to read TypeScript
  },
  plugins: {
    "@stylistic": stylistic,
  },
  rules: {
    "@stylistic/padding-line-between-statements": [
      "error",
      { blankLine: "always", prev: "*", next: "return" },
      { blankLine: "always", prev: "if", next: "*" },
      { blankLine: "always", prev: "import", next: "*" },
      { blankLine: "any", prev: "import", next: "import" },
    ],
  },
});
