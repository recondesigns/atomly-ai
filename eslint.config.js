import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import vuePlugin from 'eslint-plugin-vue';
import vueParser from 'vue-eslint-parser';
import storybookPlugin from 'eslint-plugin-storybook';
import * as mdxPlugin from 'eslint-plugin-mdx';
import globals from 'globals';
import prettier from 'eslint-config-prettier';

export default tseslint.config(
  {
    ignores: ['**/dist/**', '**/storybook-static/**', 'packages/website/**'],
  },

  js.configs.recommended,

  // Node.js globals for script files
  {
    files: ['**/*.{mjs,cjs}'],
    languageOptions: {
      globals: globals.node,
    },
  },

  // TypeScript for all TS/TSX files
  {
    files: ['**/*.{ts,tsx}'],
    extends: tseslint.configs.recommended,
  },

  // React rules — scoped to packages/react
  {
    files: ['packages/react/**/*.{ts,tsx}'],
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
    },
    rules: {
      ...reactPlugin.configs.flat.recommended.rules,
      ...reactHooksPlugin.configs.flat['recommended-latest'].rules,
      'react/react-in-jsx-scope': 'off', // not needed with React 17+ JSX transform
      'react/prop-types': 'off', // TypeScript handles this
    },
    settings: { react: { version: 'detect' } },
  },

  // Vue SFC rules — scoped to packages/vue
  ...vuePlugin.configs['flat/recommended'].map((config) => ({
    ...config,
    files: ['packages/vue/**/*.vue'],
  })),
  {
    files: ['packages/vue/**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: { parser: tseslint.parser },
    },
    rules: {
      // component library components are intentionally single-word (Button, Badge, etc.)
      'vue/multi-word-component-names': 'off',
    },
  },

  // Vue type shims — standard boilerplate, intentional {} and any
  {
    files: ['packages/vue/**/*.d.ts'],
    rules: {
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },

  // Storybook story files
  ...storybookPlugin.configs['flat/recommended'].map((config) => ({
    ...config,
    files: ['**/*.stories.{ts,tsx,vue,js,jsx}'],
  })),

  // MDX files (targets **/*.{md,mdx} automatically)
  mdxPlugin.flat,
  mdxPlugin.flatCodeBlocks,

  // Prettier compatibility — must be last
  prettier,
);
