import { Config, MeaningfulDependency } from './shared-types'
import { CONFIG_PREFIX } from './constants'

export function isFromConfigKit(fullConfigName: string): boolean {
  return fullConfigName.startsWith(CONFIG_PREFIX)
}

export function toConfigName(fullConfigName: string): Config {
  return fullConfigName.slice(CONFIG_PREFIX.length) as Config
}

export function toConfigPackage(configName: Config): MeaningfulDependency {
  return (CONFIG_PREFIX + 'eslint-config-' + configName) as MeaningfulDependency
}
