import { MAX_VERSIONS, MEANINGFUL_DEPENDENCIES } from './constants'
import { MeaningfulDependency } from './shared-types'

export function isDependencyMeaningful(
  dependency: string
): dependency is MeaningfulDependency {
  return (MEANINGFUL_DEPENDENCIES as string[]).includes(dependency)
}

export function isDependencyLimited(dependency: MeaningfulDependency): boolean {
  return Boolean(MAX_VERSIONS[dependency])
}
