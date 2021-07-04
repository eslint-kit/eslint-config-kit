import { DEPENDENCIES } from '../../../lib/constants'
import { Json } from '../../../lib/shared-types'
import { tsAliasesAdder } from './ts.aliases-adder'

describe('tsAliasesAdder', () => {
  it('should successfully add aliases when currentConfig is empty', () => {
    const currentConfig: Json = {}

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
    }

    expect(tsAliasesAdder(currentConfig)).toEqual(expectedResult)
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
    }

    expect(tsAliasesAdder(currentConfig)).toEqual(expectedResult)
  })

  it('should successfully add aliases when currentConfig already has some import plugin settings/rules', () => {
    let currentConfig: Json
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
    }

    expect(tsAliasesAdder(currentConfig)).toEqual(expectedResult)

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
    }

    expect(tsAliasesAdder(currentConfig)).toEqual(expectedResult)
  })
})
