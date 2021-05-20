import { Json, AliasesMeta } from '../../../lib/shared-types'
import { jsAliasesAdder } from './js.aliases-adder'

describe('jsAliasesAdder', () => {
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
        'import/resolver': {
          alias: {
            map: [['@app', './src']],
            extensions: ['.js', '.jsx', '.json'],
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

    expect(jsAliasesAdder(currentConfig, aliasesMeta)).toEqual(expectedResult)
  })

  it('should successfully add aliases when currentConfig already has aliases', () => {
    const currentConfig: Json = {
      settings: {
        'import/resolver': {
          alias: {
            map: [['@app', './src']],
            extensions: ['.js', '.jsx', '.json'],
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
        'import/resolver': {
          alias: {
            map: [
              ['@app', './src'],
              ['@folder', './src/folder'],
            ],
            extensions: ['.js', '.jsx', '.json'],
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

    expect(jsAliasesAdder(currentConfig, aliasesMeta)).toEqual(expectedResult)
  })

  it('should successfully add aliases when currentConfig already has some import plugin settings/rules', () => {
    let currentConfig: Json
    let aliasesMeta: AliasesMeta
    let expectedResult: Json

    currentConfig = {
      settings: {
        'import/resolver': {
          alias: {
            extensions: ['.js', '.jsx', '.json'],
          },
          something: 123,
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
        'import/resolver': {
          alias: {
            map: [['@folder', './src/folder']],
            extensions: ['.js', '.jsx', '.json'],
          },
          something: 123,
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

    expect(jsAliasesAdder(currentConfig, aliasesMeta)).toEqual(expectedResult)

    currentConfig = {
      settings: {
        'import/resolver': {
          alias: {
            extensions: ['.js', '.jsx'],
          },
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
        'import/resolver': {
          alias: {
            map: [['@folder', './src/folder']],
            extensions: ['.js', '.jsx', '.json'],
          },
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

    expect(jsAliasesAdder(currentConfig, aliasesMeta)).toEqual(expectedResult)
  })
})
