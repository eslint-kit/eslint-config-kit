import { AliasesMeta, AliasMapItem, PathGroup } from './shared-types'

function normalizeAliasValue(value: string): string {
  if (value.endsWith('/*')) return value.slice(0, -2)
  if (value.endsWith('/')) return value.slice(0, -1)
  return value
}

export function generateAliasesMeta(
  paths: Record<string, string>
): AliasesMeta {
  const aliasMap: AliasMapItem[] = []
  const pathGroups: PathGroup[] = []

  for (const aliasName in paths) {
    const aliasPath = paths[aliasName]

    const [normalizedAliasName, normalizedAliasPath] = [
      normalizeAliasValue(aliasName),
      normalizeAliasValue(aliasPath),
    ]

    aliasMap.push([normalizedAliasName, normalizedAliasPath])

    const isFile = /^.*[\w,\s-]+\.[A-Za-z]+$/.test(normalizedAliasPath)

    if (isFile) {
      pathGroups.push({
        pattern: normalizedAliasName,
        group: 'internal',
        position: 'before',
      })
    } else {
      pathGroups.push(
        {
          pattern: normalizedAliasName,
          group: 'internal',
          position: 'before',
        },
        {
          pattern: normalizedAliasName + '/**',
          group: 'internal',
          position: 'before',
        }
      )
    }
  }

  return {
    aliasMap,
    pathGroups,
  }
}
