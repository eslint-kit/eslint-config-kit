import { EslintConfigMeta, Config } from './shared-types'
import { isFromConfigKit, toConfigName } from './config-name-helpers'

interface Params {
  eslintConfigMeta: EslintConfigMeta
}

export function getInstalledConfings({ eslintConfigMeta }: Params): Config[] {
  const { content } = eslintConfigMeta

  if (!content.extends) {
    return []
  }

  if (typeof content.extends === 'string') {
    if (!isFromConfigKit(content.extends)) {
      return []
    }

    return [toConfigName(content.extends)]
  }

  if (!Array.isArray(content.extends)) {
    return []
  }

  return content.extends
    .map(String)
    .filter(isFromConfigKit)
    .map(toConfigName)
}
