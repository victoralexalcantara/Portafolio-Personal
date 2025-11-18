// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import nextPlugin from '@next/eslint-plugin-next';
import reactPlugin from 'eslint-plugin-react';
import hooksPlugin from 'eslint-plugin-react-hooks';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';

export default tseslint.config(
  {
    // Aplica a todos los archivos
    ignores: ['node_modules', '.next'],
  },
  {
    // Reglas para archivos TypeScript y TSX
    files: ['**/*.{ts,tsx}'],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
    ],
    plugins: {
      '@next/next': nextPlugin,
      'react': reactPlugin,
      'react-hooks': hooksPlugin,
      'jsx-a11y': jsxA11yPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
      ...reactPlugin.configs.recommended.rules,
      ...hooksPlugin.configs.recommended.rules,
      ...jsxA11yPlugin.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off', // No es necesario en Next.js 11+
      'react/prop-types': 'off', // No es necesario con TypeScript
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    languageOptions: {
      parserOptions: {
        project: true,
      },
    },
  }
);
