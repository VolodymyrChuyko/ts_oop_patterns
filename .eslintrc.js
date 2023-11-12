module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
        tsconfigRootDir: __dirname,
        project: ['./tsconfig.json'],
    },
    plugins: ['@typescript-eslint'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
    ],
    rules: {
        '@typescript-eslint/semi': ['error', 'always', { 'omitLastInOneLineBlock': true }],
        '@typescript-eslint/restrict-template-expressions': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/brace-style': ['error', 'allman', { 'allowSingleLine': true }],
        '@typescript-eslint/quotes': ['error', 'single'],
        '@typescript-eslint/space-before-blocks': ['error', 'always'],
        '@typescript-eslint/object-curly-spacing': ['error', 'always'],
        '@typescript-eslint/comma-dangle': ['error', 'always-multiline'],
        '@typescript-eslint/comma-spacing': ['error'],
        '@typescript-eslint/default-param-last': ['error'],
        '@typescript-eslint/func-call-spacing': ['error'],
        '@typescript-eslint/lines-between-class-members': ['error', 'always', { 'exceptAfterOverload': true, 'exceptAfterSingleLine': true }],
        '@typescript-eslint/return-await': 'error',
        '@typescript-eslint/explicit-member-accessibility': ['error'],
        '@typescript-eslint/member-ordering': ['error', {
            'default': [
                'static-field', // = ["public-static-field", "protected-static-field", "private-static-field"]
                'instance-field', // = ["public-instance-field", "protected-instance-field", "private-instance-field"]
                'abstract-field', // = ["public-abstract-field", "protected-abstract-field", "private-abstract-field"]

                // Constructors
                'constructor', // = ["public-constructor", "protected-constructor", "private-constructor"]

                // Getters
                'static-get', // = ["public-static-get", "protected-static-get", "private-static-get"]
                'instance-get', // = ["public-instance-get", "protected-instance-get", "private-instance-get"]
                'abstract-get', // = ["public-abstract-get", "protected-abstract-get", "private-abstract-get"]

                // Setters
                'static-set', // = ["public-static-set", "protected-static-set", "private-static-set"]
                'instance-set', // = ["public-instance-set", "protected-instance-set", "private-instance-set"]
                'abstract-set', // = ["public-abstract-set", "protected-abstract-set", "private-abstract-set"]

                // Methods
                'static-method', // = ["public-static-method", "protected-static-method", "private-static-method"]
                'instance-method', // = ["public-instance-method", "protected-instance-method", "private-instance-method"]
                'abstract-method',
            ],
        }],
        '@typescript-eslint/member-delimiter-style': ['error', {
            'multiline': {
                'delimiter': 'semi',
                'requireLast': true,
            },
            'singleline': {
                'delimiter': 'semi',
                'requireLast': false,
            },
        }],
        'curly': ['error', 'multi-or-nest', 'consistent'],
        'object-curly-newline': ['error', { 'multiline': true, 'consistent': true }],
        'no-trailing-spaces': 'error',
        'template-curly-spacing': ['error', 'never'],
    },
};
