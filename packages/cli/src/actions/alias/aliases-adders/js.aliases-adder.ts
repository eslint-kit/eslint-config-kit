import merge from 'deepmerge'
import {
  PathGroup,
  Json,
  AliasesMeta,
  AliasMapItem,
} from '../../../lib/shared-types'
import { combineMerge } from './shared'
import { CustomMerge } from './types'

const jsCustomMerge: CustomMerge = key => {
  if (key === 'map') {
    return (a: AliasMapItem[], b: AliasMapItem[]) => {
      const existingAliasNames = a.map(([aliasName]) => aliasName)

      const newMapItems = b.filter(mapItem => {
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

  if (key === 'import/order') {
    return (a, b) =>
      merge(a, b, {
        arrayMerge: combineMerge,
        customMerge: jsCustomMerge,
      })
  }

  if (key === 'groups') {
    return a => a
  }

  if (key === 'pathGroups') {
    return (a: PathGroup[], b: PathGroup[]) => {
      const existingPatterns = a.map(group => group.pattern)

      const newGroups = b.filter(group => {
        return !existingPatterns.includes(group.pattern)
      })

      return [...a, ...newGroups]
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
            pathGroups: meta.pathGroups,
          },
        ],
      },
    },
    { customMerge: jsCustomMerge }
  )
