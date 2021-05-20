// import chalk from 'chalk'
// import inquirer from 'inquirer'
import { isFromConfigKit } from './config-name-helpers'
import { isDependencyMeaningful } from './dependency-guards'
import { MeaningfulDependency } from './shared-types'

interface Params {
  requiredDependencies?: MeaningfulDependency[]
  installedDependencies?: string[]
  wrongDependenciesToUpdate: MeaningfulDependency[]
}

export function getDependenciesToDelete({
  requiredDependencies,
  installedDependencies,
  wrongDependenciesToUpdate,
}: Params): MeaningfulDependency[] {
  if (!requiredDependencies || !installedDependencies) {
    return wrongDependenciesToUpdate
  }

  const requiredDependenciesSet = new Set(requiredDependencies)

  return (
    installedDependencies
      .filter(isDependencyMeaningful)
      .filter(dependency => {
        return !requiredDependenciesSet.has(dependency)
      })
      // we can delete configs without any questions
      .filter(isFromConfigKit)
      // and wrong dependencies too
      .concat(wrongDependenciesToUpdate)
  )
}
