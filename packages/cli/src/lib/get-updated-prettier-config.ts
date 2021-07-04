import { AliasesMeta, PrettierConfigMeta, PrettierConfig } from './shared-types'

function withNesting(regex: string): string {
  return regex + '(\\/(.*))?$'
}

interface GetUpdatedConfigParams {
  prettierConfigMeta: PrettierConfigMeta
  aliasesMeta: AliasesMeta
}

export function getUpdatedPrettierConfig({
  prettierConfigMeta,
  aliasesMeta,
}: GetUpdatedConfigParams): PrettierConfig | null {
  if (!prettierConfigMeta.found) return null
  if (!prettierConfigMeta.supported) return null

  const { content } = prettierConfigMeta
  const updatedConfig = Object.assign({}, content)

  if (!updatedConfig.importOrder) {
    updatedConfig.importOrder = ['^[./]']
  }

  if (!updatedConfig.experimentalBabelParserPluginsList) {
    updatedConfig.experimentalBabelParserPluginsList = ['jsx', 'typescript']
  }

  const newRegexps = aliasesMeta.aliasMap.map(([name]) => {
    return withNesting('^' + name)
  })

  const relativePathsIndex = updatedConfig.importOrder.findIndex((value) => {
    return value === '^[./]'
  })

  if (relativePathsIndex >= 0) {
    updatedConfig.importOrder.splice(relativePathsIndex, 0, ...newRegexps)
  } else {
    updatedConfig.importOrder.push(...newRegexps)
  }

  return updatedConfig
}
