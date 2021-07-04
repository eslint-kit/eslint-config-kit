import { AliasesMeta, AliasMapItem } from './shared-types'

function normalizeAliasValue(value: string): string {
  if (value.endsWith('/*')) return value.slice(0, -2)
  if (value.endsWith('/')) return value.slice(0, -1)
  return value
}

export function generateAliasesMeta(
  paths: Record<string, string>
): AliasesMeta {
  const aliasMap: AliasMapItem[] = []

  for (const aliasName in paths) {
    const aliasPath = paths[aliasName]

    const [normalizedAliasName, normalizedAliasPath] = [
      normalizeAliasValue(aliasName),
      normalizeAliasValue(aliasPath),
    ]

    aliasMap.push([normalizedAliasName, normalizedAliasPath])
  }

  return { aliasMap }
}
