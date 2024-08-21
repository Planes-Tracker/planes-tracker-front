/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */

import { fixupConfigRules, fixupPluginRules } from '@eslint/compat';
import pluginJs from '@eslint/js';
import pluginImport from 'eslint-plugin-import';
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
  },
  {
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: ['./tsconfig.app.json', './tsconfig.node.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    plugins: {
      'react-hooks': fixupPluginRules(pluginReactHooks),
      import: fixupPluginRules(pluginImport),
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  ...fixupConfigRules(pluginReactConfig),
  ...fixupConfigRules({
    rules: pluginReactHooks.configs.recommended.rules,
  }),
  ...fixupConfigRules({
    rules: pluginImport.configs.recommended.rules,
  }),
  {
    ignores: ['dist'],
    rules: {
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',

      '@typescript-eslint/consistent-type-imports': ['error'],
      '@typescript-eslint/no-empty-interface': 'off',

      'import/no-unresolved': 'off',
      'import/namespace': 'off',
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling'],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
    },
  },
);
