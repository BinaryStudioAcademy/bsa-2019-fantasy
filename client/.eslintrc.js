module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:jsx-a11y/recommended',
        'plugin:prettier/recommended',
    ],
    plugins: ['@typescript-eslint', 'react', 'react-hooks', 'jsx-a11y'],
    parserOptions: {
        project: __dirname + '/tsconfig.json',
        ecmaVersion: 2018,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    env: {
        browser: true,
        es6: true,
    },
    rules: {
        'react/jsx-boolean-value': ['warn', 'never'],
        'react/no-direct-mutation-state': 'error',
        'react/no-access-state-in-setstate': 'error',
        'react/no-this-in-sfc': 'error',
        'react/prefer-stateless-function': ['warn', { ignorePureComponents: true }],
        'react/self-closing-comp': 'warn',
        'react/static-property-placement': 'warn',
        'react/void-dom-elements-no-children': 'error',
        'react/state-in-constructor': ['error', 'never'],

        'jsx-a11y/click-events-have-key-events': 'off',
        'jsx-a11y/no-static-element-interactions': 'warn',

        '@typescript-eslint/indent': 'off',
        camelcase: 'off',
        '@typescript-eslint/camelcase': [
            'error',
            {
                allow: ['^UNSAFE_'],
            },
        ],
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': [
            'warn',
            {
                argsIgnorePattern: 'props',
            },
        ],
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/prefer-interface': 'off',
        '@typescript-eslint/no-floating-promises': 'warn',
        '@typescript-eslint/no-misused-promises': 'warn',
        '@typescript-eslint/class-name-casing': 'error',
        '@typescript-eslint/require-await': 'warn',
        '@typescript-eslint/await-thenable': 'warn',
        '@typescript-eslint/explicit-member-accessibility': 'off',
    },
    settings: {
        react: {
            pragma: 'React',
            version: 'detect',
        },
    },
    root: true,
};
