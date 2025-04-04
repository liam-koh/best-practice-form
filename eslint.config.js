export default {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
  },
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:testing-library/react',
    'plugin:prettier/recommended',
    // 'plugin:jsx-a11y/strict',
  ],
  plugins: [
    '@typescript-eslint',
    'react',
    'react-hooks',
    'import',
    'prettier',
    // 'jsx-a11y',
  ],
  settings: {
    'import/resolver': {
      typescript: {
        project: './tsconfig.json',
        alwaysTryTypes: true,
      },
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        paths: ['src'],
      },
    },
    react: {
      version: 'detect',
    },
  },
  rules: {
    'no-console': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/no-unknown-property': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'react-hooks/exhaustive-deps': 'off',
    '@typescript-eslint/no-empty-function': 'warn',
    '@typescript-eslint/ban-ts-comment': 'off',
    'prefer-const': 'warn',
    'prettier/prettier': 'off',
    'react/display-name': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    // default export 사용 허용 (styled-components 등 사용시 필요)
    'import/no-named-as-default': 'off',
    'import/namespace': 'off',
    'no-inner-declarations': 'off',
    'testing-library/no-unnecessary-act': 'off',
    'testing-library/no-render-in-lifecycle': 'off',
  },
  overrides: [
    {
      files: ['**/__tests__/**/*', '**/*.{spec,test}.*'],

      plugins: ['testing-library'],
      extends: [
        'plugin:testing-library/react',
      ],
    },
  ],
  ignorePatterns: ['node_modules/', 'build/', 'dist/', '.storybook/'],
}