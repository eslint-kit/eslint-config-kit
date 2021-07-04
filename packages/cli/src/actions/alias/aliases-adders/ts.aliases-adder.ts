import merge from 'deepmerge'
import { DEPENDENCIES } from '../../../lib/constants'
import { Json } from '../../../lib/shared-types'
import { CustomMerge } from './types'

const tsCustomMerge: CustomMerge = (key) => {
  if (key === DEPENDENCIES.TS_PARSER) {
    return (a: string[], b: string[]) => {
      return Array.from(new Set([...a, ...b]))
    }
  }

  return undefined
}

export const tsAliasesAdder = (currentConfig: Json): Json =>
  merge(
    currentConfig,
    {
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
    },
    { customMerge: tsCustomMerge }
  )
