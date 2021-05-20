import { Config, PackageJson } from './shared-types'
import { getMajor, greaterOrEquals } from './dependency-version-compare'

function reactCompatible(version?: string): boolean {
  if (!version) {
    return false
  }

  if (getMajor(version) === 0 && greaterOrEquals(version, '0.14.10')) {
    return true
  }

  if (getMajor(version) === 15 && greaterOrEquals(version, '15.7.0')) {
    return true
  }

  if (getMajor(version) === 16 && greaterOrEquals(version, '16.14.0')) {
    return true
  }

  if (getMajor(version) === 17 && greaterOrEquals(version, '17.0.0')) {
    return true
  }

  return false
}

function reactWithNewJSXTransformSupport(
  allDependencies: Record<string, string>
): boolean {
  if (!reactCompatible(allDependencies.react)) {
    return false
  }

  function hasPackage(packageName: string): boolean {
    return Boolean(allDependencies[packageName])
  }

  function minVersion(packageName: string, version: string): boolean {
    return greaterOrEquals(allDependencies[packageName], version)
  }

  if (hasPackage('react-scripts')) {
    return minVersion('react-scripts', '4.0.0')
  }

  if (hasPackage('next')) {
    return minVersion('next', '9.5.3')
  }

  if (hasPackage('gatsby')) {
    return minVersion('gatsby', '2.24.5')
  }

  if (hasPackage('babel')) {
    return minVersion('babel', '7.9.0')
  }

  return false
}

interface Params {
  packageJson: PackageJson
  updatedConfigs: Config[]
}

export function getFinalConfigs({
  packageJson,
  updatedConfigs,
}: Params): Config[] {
  const { dependencies = {}, devDependencies = {} } = packageJson

  const allDependencies = {
    ...dependencies,
    ...devDependencies,
  }

  const finalConfigs = updatedConfigs.slice()

  if (
    updatedConfigs.includes('react') &&
    reactWithNewJSXTransformSupport(allDependencies)
  ) {
    finalConfigs.push('react-new-jsx-transform')
  }

  return finalConfigs
}
