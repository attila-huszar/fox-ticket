module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'regexp', 'react-refresh'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:regexp/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', 'build', '.eslint*'],
  parser: '@typescript-eslint/parser',
  rules: {
    'prefer-const': 'warn',
    'import/prefer-default-export': 'off',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
};
