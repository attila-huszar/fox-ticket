module.exports = {
  env: {
    node: true,
    jest: true,
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'regexp'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:regexp/recommended',
  ],
  ignorePatterns: ['dist', 'build', '.eslint*'],
  parser: '@typescript-eslint/parser',
  rules: {
    'prefer-const': 'warn',
    'import/prefer-default-export': 'off',
  },
};
