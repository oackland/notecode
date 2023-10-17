/* global module */
module.exports = {
    root: true,
    env: {
        'node': true,
        browser: true,
        es2020: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    parser: '@typescript-eslint/parser',
    plugins: ['react-refresh', '@typescript-eslint'],
    rules: {
        'react-refresh/only-export-components': 'off',
        '@typescript-eslint/no-explicit-any': 'error',
    },
};