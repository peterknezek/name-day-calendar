// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import simpleImportSort from "eslint-plugin-simple-import-sort";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended"

export default [
    ...tseslint.config(
        eslint.configs.recommended,
        ...tseslint.configs.strict,
        ...tseslint.configs.stylistic,
        {
            plugins: {
                "simple-import-sort": simpleImportSort,
            },
            rules: {
                "simple-import-sort/imports": "error",
                "simple-import-sort/exports": "error",
            },
        },
    ),
    eslintPluginPrettierRecommended
];
