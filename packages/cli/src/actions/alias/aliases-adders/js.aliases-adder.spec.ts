/* eslint-disable sonarjs/no-duplicate-string */
import { Json, AliasesMeta } from '../../../lib/shared-types'
import { jsAliasesAdder } from './js.aliases-adder'

describe('jsAliasesAdder', () => {
  it('should successfully add aliases when currentConfig is empty', () => {
    const currentConfig: Json = {}

    const aliasesMeta: AliasesMeta = {
      aliasMap: [['@app', './src']],
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
    }

    const aliasesMeta: AliasesMeta = {
      aliasMap: [['@folder', './src/folder']],
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
    }

    aliasesMeta = {
      aliasMap: [['@folder', './src/folder']],
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
    }

    aliasesMeta = {
      aliasMap: [['@folder', './src/folder']],
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
    }

    expect(jsAliasesAdder(currentConfig, aliasesMeta)).toEqual(expectedResult)
  })
})
