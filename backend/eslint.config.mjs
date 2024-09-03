import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import importX from 'eslint-plugin-import-x'
import promise from 'eslint-plugin-promise'
import regexp from 'eslint-plugin-regexp'
import prettier from 'eslint-plugin-prettier'
import prettierConfig from 'eslint-config-prettier'

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  importX.configs.typescript,
  promise.configs['flat/recommended'],
  regexp.configs['flat/recommended'],
  prettierConfig,
  {
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        projectService: {
          allowDefaultProject: ['*.js'],
          defaultProject: './tsconfig.json',
        },
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      'import-x': importX,
      prettier: prettier,
    },
    rules: {
      'no-undef': 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { ignoreRestSiblings: true },
      ],
      '@typescript-eslint/consistent-type-definitions': 'off',
      'import-x/named': 'error',
      'promise/always-return': ['error', { ignoreLastCallback: true }],
      'promise/no-callback-in-promise': 'off',
      'prettier/prettier': 'warn',
    },
    linterOptions: {
      reportUnusedDisableDirectives: 'warn',
    },
    settings: {
      regexp: {
        allowedCharacterRanges: ['alphanumeric', 'a-ű'],
      },
    },
  },
  {
    files: ['eslint.config.mjs'],
    ...tseslint.configs.disableTypeChecked,
  },
  {
    ignores: ['build', '__tests__'],
  },
)
