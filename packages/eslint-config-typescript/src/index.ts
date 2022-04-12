import { extensions, importRules } from '../../../shared'

export default {
  plugins: ['import', '@typescript-eslint'],
  env: {
    es6: true,
  },
  parserOptions: {
    sourceType: 'module',
    project: 'tsconfig.json',
    createDefaultProgram: true,
    tsconfigRootDir: './',
  },
  settings: {
    'import/extensions': extensions.jsAndTs,
    'import/resolver': {
      node: {
        extensions: extensions.jsAndTs,
      },
    },
    'import/ignore': ['\\.(coffee|scss|css|less|hbs|svg|json)$'],
    'import/external-module-folders': ['node_modules', 'node_modules/@types'],
    'import/parsers': {
      '@typescript-eslint/parser': extensions.ts,
    },
  },
  rules: {
    'import/extensions': importRules['import/extensions']
      // select base options without extensions
      .slice(0, 2)
      // add ts specific extensions object
      .concat(
        extensions.jsAndTs.reduce<Record<string, 'never'>>((acc, extension) => {
          const extensionShort = extension.slice(1)
          acc[extensionShort] = 'never'
          return acc
        }, {})
      ),
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        // rules from @typescript-eslint
        // it should be there to support mixed codebases
        '@typescript-eslint/adjacent-overload-signatures': 'warn',
        '@typescript-eslint/ban-ts-comment': 'error',
        '@typescript-eslint/ban-types': 'error',
        '@typescript-eslint/naming-convention': [
          'warn',
          {
            selector: 'variable',
            format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
            leadingUnderscore: 'allow',
          },
          {
            selector: 'parameter',
            format: ['camelCase'],
            leadingUnderscore: 'allow',
          },
          {
            selector: 'typeLike',
            format: ['PascalCase'],
          },
        ],
        '@typescript-eslint/consistent-type-assertions': 'warn',
        '@typescript-eslint/consistent-type-definitions': ['warn', 'interface'],
        '@typescript-eslint/no-array-constructor': 'warn',
        '@typescript-eslint/no-empty-interface': 'warn',
        '@typescript-eslint/no-explicit-any': 'warn',
        '@typescript-eslint/no-extra-non-null-assertion': 'warn',
        '@typescript-eslint/no-for-in-array': 'warn',
        '@typescript-eslint/no-inferrable-types': 'error',
        '@typescript-eslint/no-misused-new': 'error',
        '@typescript-eslint/no-namespace': 'error',
        '@typescript-eslint/no-non-null-assertion': 'warn',
        '@typescript-eslint/no-unused-vars': [
          'warn',
          {
            ignoreRestSiblings: true,
            varsIgnorePattern: '^_',
            argsIgnorePattern: '^_',
          },
        ],
        '@typescript-eslint/no-unnecessary-condition': 'warn',
        '@typescript-eslint/no-unused-expressions': 'warn',
        '@typescript-eslint/no-useless-constructor': 'warn',
        '@typescript-eslint/prefer-for-of': 'warn',
        '@typescript-eslint/prefer-includes': 'warn',
        '@typescript-eslint/prefer-namespace-keyword': 'error',
        '@typescript-eslint/prefer-optional-chain': 'warn',
        '@typescript-eslint/prefer-string-starts-ends-with': 'warn',
        '@typescript-eslint/require-array-sort-compare': 'error',
        '@typescript-eslint/return-await': ['error', 'in-try-catch'],
        '@typescript-eslint/triple-slash-reference': 'error',

        // Specific rules that are enabled using @typescript-eslint, but have analogues in common eslint
        'camelcase': 'off',
        'no-array-constructor': 'off',
        'no-unused-vars': 'off',
        'no-unused-expressions': 'off',
        'no-useless-constructor': 'off',
        'no-return-await': 'off',

        // Checked by Typescript - ts(2378)
        'getter-return': 'off',
        // Checked by Typescript - ts(2300)
        'no-dupe-args': 'off',
        // Checked by Typescript - ts(1117)
        'no-dupe-keys': 'off',
        // Checked by Typescript - ts(7027)
        'no-unreachable': 'off',
        // Checked by Typescript - ts(2367)
        'valid-typeof': 'off',
        // Checked by Typescript - ts(2588)
        'no-const-assign': 'off',
        // Checked by Typescript - ts(2588)
        'no-new-symbol': 'off',
        // Checked by Typescript - ts(2376)
        'no-this-before-super': 'off',
        // This is checked by Typescript using the option `strictNullChecks`.
        'no-undef': 'off',
        // This is already checked by Typescript.
        'no-dupe-class-members': 'off',
        // This is already checked by Typescript.
        'no-redeclare': 'off',

        // Checked by Typescript
        'import/no-extraneous-dependencies': 'off',
      },
    },
  ],
}
