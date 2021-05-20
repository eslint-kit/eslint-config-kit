import {
  MaxVersions,
  MeaningfulDependency,
  PackageJson,
  WrongDependencies,
} from './shared-types'
import { MAX_VERSIONS } from './constants'
import { equals, mayBeGreater, lower } from './dependency-version-compare'
import {
  isDependencyLimited,
  isDependencyMeaningful,
} from './dependency-guards'

interface Params {
  packageJson: PackageJson
  requiredDependencies: MeaningfulDependency[]
  maxVersions?: MaxVersions
}

export function getWrongDependencies({
  packageJson,
  requiredDependencies,
  maxVersions = MAX_VERSIONS,
}: Params): WrongDependencies {
  const { dependencies = {}, devDependencies = {} } = packageJson

  const allDependencies = {
    ...dependencies,
    ...devDependencies,
  }

  const limitedDependencies = Object.keys(allDependencies)
    .filter(isDependencyMeaningful)
    .filter(dependency => {
      return requiredDependencies.includes(dependency)
    })
    .filter(isDependencyLimited)

  const notEqual = limitedDependencies.filter(dependency => {
    const version = allDependencies[dependency]
    return !equals(version, maxVersions[dependency] as string)
  })

  const tooLow = limitedDependencies.filter(dependency => {
    const version = allDependencies[dependency]
    return lower(version, maxVersions[dependency] as string)
  })

  const tooHigh = limitedDependencies.filter(dependency => {
    const version = allDependencies[dependency]
    return mayBeGreater(version, maxVersions[dependency] as string)
  })

  return {
    notEqual,
    tooLow,
    tooHigh,
    total: notEqual.length,
  }
}
