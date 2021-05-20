import { MeaningfulDependency } from './shared-types'

interface Params {
  requiredDependencies?: MeaningfulDependency[]
  installedDependencies?: string[]
  wrongDependenciesToUpdate: MeaningfulDependency[]
}

export function getDependenciesToInstall({
  requiredDependencies,
  installedDependencies,
  wrongDependenciesToUpdate,
}: Params): MeaningfulDependency[] {
  if (!requiredDependencies || !installedDependencies) {
    return wrongDependenciesToUpdate
  }

  const installedDependenciesSet = new Set(installedDependencies)

  return requiredDependencies
    .filter(dependency => {
      return !installedDependenciesSet.has(dependency)
    })
    .concat(wrongDependenciesToUpdate)
}
