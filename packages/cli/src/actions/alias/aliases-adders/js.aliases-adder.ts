import merge from 'deepmerge'
import { Json, AliasesMeta, AliasMapItem } from '../../../lib/shared-types'
import { CustomMerge } from './types'

const jsCustomMerge: CustomMerge = (key) => {
  if (key === 'map') {
    return (a: AliasMapItem[], b: AliasMapItem[]) => {
      const existingAliasNames = a.map(([aliasName]) => aliasName)

      const newMapItems = b.filter((mapItem) => {
        const [aliasName] = mapItem
        return !existingAliasNames.includes(aliasName)
      })

      return [...a, ...newMapItems]
    }
  }

  if (key === 'extensions') {
    return (a: string[], b: string[]) => {
      return Array.from(new Set([...a, ...b]))
    }
  }

  return undefined
}

export const jsAliasesAdder = (currentConfig: Json, meta: AliasesMeta): Json =>
  merge(
    currentConfig,
    {
      settings: {
        'import/resolver': {
          alias: {
            map: meta.aliasMap,
            extensions: ['.js', '.jsx', '.json'],
          },
        },
      },
    },
    { customMerge: jsCustomMerge }
  )
