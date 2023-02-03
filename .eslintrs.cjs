module.exports = {
  extends: [
    'airbnb',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'prettier',
  ],
  plugins: [
    '@typescript-eslint',
    'unused-imports',
    'no-relative-import-paths',
    'import',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  env: {
    es6: true,
    node: true,
    browser: true,
  },
  rules: {
    'no-console': 'error',
    'require-jsdoc': 'off',
    'valid-jsdoc': 'off',
    'react/boolean-prop-naming': 'error',
    'react/sort-prop-types': 'error',
    'import/newline-after-import': ['error'],
    'unused-imports/no-unused-imports': 'error',

    // We need to disable "no-unused-vars" when working with TypeScript,
    // but plugin:@typescript-eslint/recommended is already doing that for us.
    // See https://typescript-eslint.io/rules/no-unused-vars/
    '@typescript-eslint/no-unused-vars': 'error',

    'import/order': [
      'error',
      {
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        pathGroups: [
          {
            pattern: 'react',
            group: 'builtin',
            position: 'before',
          },
        ],
        pathGroupsExcludedImportTypes: ['react'],
      },
    ],
    'no-relative-import-paths/no-relative-import-paths': [
      'error',
      {
        allowSameFolder: true,
        rootDir: 'src',
      },
    ],
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': ['typescript'],
    // See https://stackoverflow.com/a/61839578
    'spaced-comment': ['error', 'always', { markers: ['/'] }],
  },
};
