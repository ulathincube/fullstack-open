import globals from 'globals'
import { defineConfig } from 'eslint/config'
import js from '@eslint/js'

export default defineConfig([
  {
    files: ['**/*.js'],
    languageOptions: { sourceType: 'commonjs' },
    plugins: {
      js,
    },
    extends: ['js/recommended'],
  },
  { files: ['**/*.{js,mjs,cjs}'], languageOptions: { globals: globals.node } },
  {
    rules: {
      'no-unused-vars': 'warn',
      'no-undef': 'warn',
      quotes: ['warn', 'single'],
      semi: ['error', 'never'],
    },
  },
])
