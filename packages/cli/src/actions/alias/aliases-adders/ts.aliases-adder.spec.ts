import { DEPENDENCIES } from '../../../lib/constants'
import { Json, AliasesMeta } from '../../../lib/shared-types'
import { tsAliasesAdder } from './ts.aliases-adder'

describe('tsAliasesAdder', () => {
  it('should successfully add aliases when currentConfig is empty', () => {
    const currentConfig: Json = {}

    const aliasesMeta: AliasesMeta = {
      aliasMap: [['@app', './src']],
      pathGroups: [
        {
          pattern: '@app',
          group: 'internal',
          position: 'before',
        },
        {
          pattern: '@app/**',
          group: 'internal',
          position: 'before',
        },
      ],
    }

    const expectedResult: Json = {
      settings: {
        'import/parsers': {
          [DEPENDENCIES.TS_PARSER]: ['.ts', '.tsx'],
        },
        'import/resolver': {
          typescript: {
            alwaysTryTypes: true,
          },
        },
      },
      rules: {
        'import/order': [
          'warn',
          {
            groups: [
              'builtin',
              'external',
              'internal',
              'parent',
              'sibling',
              'index',
            ],
            pathGroups: [
              {
                pattern: '@app',
                group: 'internal',
                position: 'before',
              },
              {
                pattern: '@app/**',
                group: 'internal',
                position: 'before',
              },
            ],
          },
        ],
      },
    }

    expect(tsAliasesAdder(currentConfig, aliasesMeta)).toEqual(expectedResult)
  })

  it('should successfully add aliases when currentConfig already has aliases', () => {
    const currentConfig: Json = {
      settings: {
        'import/parsers': {
          [DEPENDENCIES.TS_PARSER]: ['.ts', '.tsx'],
        },
        'import/resolver': {
          typescript: {
            alwaysTryTypes: true,
          },
        },
      },
      rules: {
        'import/order': [
          'warn',
          {
            groups: [
              'builtin',
              'external',
              'internal',
              'parent',
              'sibling',
              'index',
            ],
            pathGroups: [
              {
                pattern: '@app',
                group: 'internal',
                position: 'before',
              },
              {
                pattern: '@app/**',
                group: 'internal',
                position: 'before',
              },
            ],
          },
        ],
      },
    }

    const aliasesMeta: AliasesMeta = {
      aliasMap: [['@folder', './src/folder']],
      pathGroups: [
        {
          pattern: '@folder',
          group: 'internal',
          position: 'before',
        },
        {
          pattern: '@folder/**',
          group: 'internal',
          position: 'before',
        },
      ],
    }

    const expectedResult: Json = {
      settings: {
        'import/parsers': {
          [DEPENDENCIES.TS_PARSER]: ['.ts', '.tsx'],
        },
        'import/resolver': {
          typescript: {
            alwaysTryTypes: true,
          },
        },
      },
      rules: {
        'import/order': [
          'warn',
          {
            groups: [
              'builtin',
              'external',
              'internal',
              'parent',
              'sibling',
              'index',
            ],
            pathGroups: [
              {
                pattern: '@app',
                group: 'internal',
                position: 'before',
              },
              {
                pattern: '@app/**',
                group: 'internal',
                position: 'before',
              },
              {
                pattern: '@folder',
                group: 'internal',
                position: 'before',
              },
              {
                pattern: '@folder/**',
                group: 'internal',
                position: 'before',
              },
            ],
          },
        ],
      },
    }

    expect(tsAliasesAdder(currentConfig, aliasesMeta)).toEqual(expectedResult)
  })

  it('should successfully add aliases when currentConfig already has some import plugin settings/rules', () => {
    let currentConfig: Json
    let aliasesMeta: AliasesMeta
    let expectedResult: Json

    currentConfig = {
      settings: {
        'import/parsers': {
          'my-parser': ['.sdfdsf'],
        },
        'import/resolver': {
          typescript: {
            setting: false,
          },
        },
      },
      rules: {
        'import/order': ['warn'],
      },
    }

    aliasesMeta = {
      aliasMap: [['@folder', './src/folder']],
      pathGroups: [
        {
          pattern: '@folder',
          group: 'internal',
          position: 'before',
        },
        {
          pattern: '@folder/**',
          group: 'internal',
          position: 'before',
        },
      ],
    }

    expectedResult = {
      settings: {
        'import/parsers': {
          [DEPENDENCIES.TS_PARSER]: ['.ts', '.tsx'],
          'my-parser': ['.sdfdsf'],
        },
        'import/resolver': {
          typescript: {
            alwaysTryTypes: true,
            setting: false,
          },
        },
      },
      rules: {
        'import/order': [
          'warn',
          {
            groups: [
              'builtin',
              'external',
              'internal',
              'parent',
              'sibling',
              'index',
            ],
            pathGroups: [
              {
                pattern: '@folder',
                group: 'internal',
                position: 'before',
              },
              {
                pattern: '@folder/**',
                group: 'internal',
                position: 'before',
              },
            ],
          },
        ],
      },
    }

    expect(tsAliasesAdder(currentConfig, aliasesMeta)).toEqual(expectedResult)

    currentConfig = {
      settings: {
        'import/parsers': {
          [DEPENDENCIES.TS_PARSER]: ['.ts'],
        },
        'import/resolver': {
          hello: 'hi',
        },
        'other': {
          test: 4324,
        },
      },
      rules: {
        'import/order': [
          'warn',
          {
            groups: [
              'builtin',
              'internal',
              'external',
              'parent',
              'sibling',
              'index',
            ],
          },
        ],
      },
    }

    aliasesMeta = {
      aliasMap: [['@folder', './src/folder']],
      pathGroups: [
        {
          pattern: '@folder',
          group: 'internal',
          position: 'before',
        },
        {
          pattern: '@folder/**',
          group: 'internal',
          position: 'before',
        },
      ],
    }

    expectedResult = {
      settings: {
        'import/parsers': {
          [DEPENDENCIES.TS_PARSER]: ['.ts', '.tsx'],
        },
        'import/resolver': {
          typescript: {
            alwaysTryTypes: true,
          },
          hello: 'hi',
        },
        'other': {
          test: 4324,
        },
      },
      rules: {
        'import/order': [
          'warn',
          {
            groups: [
              'builtin',
              'internal',
              'external',
              'parent',
              'sibling',
              'index',
            ],
            pathGroups: [
              {
                pattern: '@folder',
                group: 'internal',
                position: 'before',
              },
              {
                pattern: '@folder/**',
                group: 'internal',
                position: 'before',
              },
            ],
          },
        ],
      },
    }

    expect(tsAliasesAdder(currentConfig, aliasesMeta)).toEqual(expectedResult)
  })
})
