module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'prettier/react',
    'prettier',
    'plugin:wdio/recommended'
  ],
  plugins: ['@typescript-eslint', 'prettier', 'react', 'react-hooks', 'jsx-a11y', 'wdio'],
  parserOptions: {
    project: __dirname + '/tsconfig.json',
    ecmaVersion: 2018,
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    es6: true,
    commonjs: true,
  },
  rules: {
    'prettier/prettier': 'error',
    'react/jsx-boolean-value': ['warn', 'never'],
    'react/no-direct-mutation-state': 'error',
    'react/no-access-state-in-setstate': 'error',
    'react/no-this-in-sfc': 'error',
    'react/prefer-stateless-function': ['warn', { ignorePureComponents: true }],
    'react/self-closing-comp': 'warn',
    'react/static-property-placement': 'error',
    'react/void-dom-elements-no-children': 'error',
    'react/state-in-constructor': ['error', 'never'],

    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'warn',

    '@typescript-eslint/indent': 'off',
    camelcase: 'off',
    '@typescript-eslint/camelcase': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: 'props',
      },
    ],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/prefer-interface': 'off',
    '@typescript-eslint/no-floating-promises': 'error',
    '@typescript-eslint/no-misused-promises': 'error',
    '@typescript-eslint/class-name-casing': 'error',
    '@typescript-eslint/require-await': 'warn',
    '@typescript-eslint/await-thenable': 'warn',
    '@typescript-eslint/explicit-member-accessibility': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    'no-console': 'warn',
    '@typescript-eslint/no-non-null-assertion': 'warn',
  },
  settings: {
    react: {
      pragma: 'React',
      version: 'detect',
    },
  },
  root: true,
};
