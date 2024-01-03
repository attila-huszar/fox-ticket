module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    jsxPragma: null, // for @typescript/eslint-parser
  },
  plugins: ['@typescript-eslint', 'react', 'react-refresh', 'regexp'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:regexp/recommended',
  ],
  ignorePatterns: ['dist', 'build', '.eslint*'],
  rules: {
    'import/prefer-default-export': 'off',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
  settings: {
    react: {
      version: 'detect',
    },
    regexp: {
      allowedCharacterRanges: ['alphanumeric', 'a-ű'],
    },
  },
};
