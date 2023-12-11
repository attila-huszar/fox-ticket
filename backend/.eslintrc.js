module.exports = {
  root: true,
  env: {
    node: true,
    jest: true,
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'promise', 'regexp'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:promise/recommended',
    'plugin:regexp/recommended',
  ],
  ignorePatterns: ['dist', 'build', '.eslint*'],
  rules: {
    'import/prefer-default-export': 'off',
  },
};
