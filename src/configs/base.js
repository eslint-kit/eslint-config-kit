import { importRules, importSettings } from '../shared/import'

export const config = {
  plugins: ['import', 'unicorn', 'sonarjs'],
  extends: ['plugin:sonarjs/recommended'],
  env: {
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  settings: {
    ...importSettings,
  },
  rules: {
    ...importRules,

    // eslint error-check rules
    'for-direction': 'error',
    'getter-return': 'error',
    'no-async-promise-executor': 'error',
    'no-compare-neg-zero': 'error',
    'no-cond-assign': 'error',
    'no-constant-condition': 'error',
    'no-control-regex': 'error',
    'no-debugger': 'error',
    'no-dupe-else-if': 'error',
    'no-dupe-keys': 'error',
    'no-duplicate-case': 'error',
    'no-empty': ['error', { allowEmptyCatch: true }],
    'no-empty-character-class': 'error',
    'no-ex-assign': 'error',
    'no-extra-boolean-cast': 'warn',
    'no-func-assign': 'error',
    'no-inner-declarations': 'error',
    'no-invalid-regexp': 'error',
    'no-irregular-whitespace': 'error',
    'no-misleading-character-class': 'error',
    'no-obj-calls': 'error',
    'no-prototype-builtins': 'warn',
    'no-regex-spaces': 'warn',
    'no-setter-return': 'error',
    'no-sparse-arrays': 'error',
    'no-template-curly-in-string': 'error',
    'no-unexpected-multiline': 'error',
    'no-unreachable': 'error',
    'no-unsafe-finally': 'error',
    'no-unsafe-negation': 'error',
    'require-atomic-updates': 'error',
    'use-isnan': 'error',

    // eslint best-practice rules
    'array-callback-return': 'error',
    'default-case': 'error',
    'dot-notation': 'warn',
    'eqeqeq': ['error', 'smart'],
    'no-alert': 'warn',
    'no-console': [
      'warn',
      { allow: ['warn', 'error', 'info', 'group', 'groupEnd', 'table'] },
    ],
    'no-case-declarations': 'warn',
    'no-constructor-return': 'warn',
    'no-else-return': ['warn', { allowElseIf: false }],
    'no-empty-pattern': 'error',
    'no-extend-native': 'error',
    'no-fallthrough': 'warn',
    'no-global-assign': 'error',
    'no-implicit-coercion': 'warn',
    'no-loop-func': 'error',
    'no-new': 'warn',
    'no-new-wrappers': 'error',
    'no-octal': 'error',
    'no-octal-escape': 'error',
    'no-param-reassign': ['warn', { props: false }],
    'no-proto': 'error',
    'no-redeclare': 'error',
    'no-return-assign': 'warn',
    'no-return-await': 'warn',
    'no-self-assign': 'error',
    'no-self-compare': 'error',
    'no-sequences': 'error',
    'no-unmodified-loop-condition': 'error',
    'no-unused-expressions': 'warn',
    'no-unused-labels': 'error',
    'no-useless-call': 'warn',
    'no-useless-catch': 'warn',
    'no-useless-escape': 'warn',
    'no-useless-return': 'warn',
    'no-void': 'warn',
    'no-with': 'error',
    'radix': 'error',
    'yoda': 'warn',

    // eslint variable rules
    'no-delete-var': 'error',
    'no-shadow-restricted-names': 'error',
    'no-undef': 'error',
    'no-undef-init': 'warn',
    'no-unused-vars': [
      'warn',
      {
        ignoreRestSiblings: true,
        varsIgnorePattern: '^_',
        argsIgnorePattern: '^_',
      },
    ],
    'no-use-before-define': 'error',

    // eslint stylistic rules
    'lines-between-class-members': [
      'warn',
      'always',
      { exceptAfterSingleLine: true },
    ],
    'no-lonely-if': 'warn',
    'no-bitwise': 'warn',
    'no-array-constructor': 'warn',
    'no-new-object': 'warn',
    'no-unneeded-ternary': 'warn',
    'operator-assignment': 'warn',
    'prefer-exponentiation-operator': 'warn',

    // eslint es6 rules
    'constructor-super': 'error',
    'no-class-assign': 'error',
    'no-const-assign': 'error',
    'no-dupe-class-members': 'error',
    'no-new-symbol': 'error',
    'no-this-before-super': 'error',
    'no-useless-computed-key': 'warn',
    'no-useless-constructor': 'warn',
    'no-useless-rename': 'warn',
    'no-var': 'error',
    'object-shorthand': 'warn',
    'prefer-arrow-callback': 'warn',
    'prefer-const': 'warn',
    'prefer-rest-params': 'warn',
    'prefer-spread': 'warn',
    'require-yield': 'error',

    // unicorn plugin
    'unicorn/catch-error-name': 'warn',
    'unicorn/error-message': 'warn',
    'unicorn/escape-case': 'warn',
    'unicorn/explicit-length-check': 'warn',
    'unicorn/new-for-builtins': 'error',
    'unicorn/no-abusive-eslint-disable': 'warn',
    'unicorn/no-array-instanceof': 'error',
    'unicorn/no-console-spaces': 'warn',
    'unicorn/no-for-loop': 'warn',
    'unicorn/no-hex-escape': 'warn',
    'unicorn/no-nested-ternary': 'warn',
    'unicorn/no-new-buffer': 'error',
    'unicorn/no-unreadable-array-destructuring': 'warn',
    'unicorn/no-zero-fractions': 'warn',
    'unicorn/number-literal-case': 'warn',
    'unicorn/prefer-add-event-listener': 'error',
    // rule does not exist but listed in docs
    // 'unicorn/prefer-array-find': 'error',
    'unicorn/prefer-dataset': 'warn',
    'unicorn/prefer-event-key': 'error',
    'unicorn/prefer-flat-map': 'warn',
    'unicorn/prefer-includes': 'error',
    'unicorn/prefer-negative-index': 'warn',
    'unicorn/prefer-node-append': 'error',
    'unicorn/prefer-node-remove': 'error',
    'unicorn/prefer-number-properties': 'error',
    'unicorn/prefer-query-selector': 'error',
    'unicorn/prefer-starts-ends-with': 'error',
    'unicorn/prefer-string-slice': 'error',
    'unicorn/prefer-text-content': 'error',
    'unicorn/prefer-trim-start-end': 'warn',
    'unicorn/prefer-type-error': 'error',
    'unicorn/prevent-abbreviations': [
      'warn',
      {
        extendDefaultReplacements: false,
        replacements: {
          /*
           * Ignore anything related to "event"
           * Since there is no option to ignore global "event" variable
           * (this variable forces to replace e/evt with "event_",
           *  but we don't want underscore there)
           */

          arr: {
            array: true,
          },
          // e: {
          //   event: true,
          //   error: true,
          // },
          err: {
            error: true,
          },
          cb: {
            callback: true,
          },
          ctx: {
            context: true,
          },
          curr: {
            current: true,
          },
          el: {
            element: true,
          },
          elem: {
            element: true,
          },
          // evt: {
          //   event: true,
          // },
          ext: {
            extension: true,
          },
          len: {
            length: true,
          },
          lib: {
            library: true,
          },
          msg: {
            message: true,
          },
          num: {
            number: true,
          },
          obj: {
            object: true,
          },
          opts: {
            options: true,
          },
          str: {
            string: true,
          },
          val: {
            value: true,
          },
        },
      },
    ],
    'unicorn/throw-new-error': 'error',
  },
}
