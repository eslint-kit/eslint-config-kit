import { MeaningfulDependency, Config } from './shared-types'
import { toMap } from './util/to-map'
import { DEPENDENCIES } from './constants'
import { toConfigPackage } from './config-name-helpers'

interface Params {
  installedDependencies: string[]
  finalConfigs?: Config[]
  hasAliases?: boolean
  useTs: boolean
}

export function getRequiredDependencies({
  installedDependencies,
  finalConfigs,
  hasAliases = false,
  useTs,
}: Params): MeaningfulDependency[] {
  const dependenciesSet: Set<MeaningfulDependency> = new Set()

  function add(deps: MeaningfulDependency[]): void {
    for (const dep of deps) {
      dependenciesSet.add(dep)
    }
  }

  function remove(deps: MeaningfulDependency[]): void {
    for (const dep of deps) {
      dependenciesSet.delete(dep)
    }
  }

  if (finalConfigs) {
    const configsMap = toMap(finalConfigs)

    add(['eslint'])

    const configDependencies = Array.from(configsMap.keys(), toConfigPackage)

    add(configDependencies)

    if (configsMap.has('prettier')) {
      add(['prettier'])
    }

    // Parser
    if (configsMap.has('typescript')) {
      add([DEPENDENCIES.TS_PARSER])
    } else if (!useTs) {
      add([DEPENDENCIES.BABEL_PARSER])
    }
  }

  if (hasAliases) {
    if (useTs) {
      add(['eslint-import-resolver-typescript'])
    } else {
      add(['eslint-import-resolver-alias'])
    }
  }

  // fix for create-react-app
  if (installedDependencies.includes('react-scripts')) {
    /*
     * If user have his own package version, even when it's not required
     * We should check it too
     */

    if (!installedDependencies.includes('eslint')) {
      remove(['eslint'])
    }

    if (!installedDependencies.includes('babel-eslint')) {
      remove(['babel-eslint'])
    }
  }

  return Array.from(dependenciesSet)
}
