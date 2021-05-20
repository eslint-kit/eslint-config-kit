import { PackageJson } from './shared-types'

interface Params {
  packageJson: PackageJson
}

export function getInstalledDependencies({ packageJson }: Params): string[] {
  const { dependencies = {}, devDependencies = {} } = packageJson

  const dependenciesNames = Object.keys(dependencies)
  const devDependenciesNames = Object.keys(devDependencies)

  const allDependenciesNames = [...dependenciesNames, ...devDependenciesNames]

  // fix for create-react-app
  if (allDependenciesNames.includes('react-scripts')) {
    allDependenciesNames.push('eslint', 'babel-eslint')
  }

  return allDependenciesNames
}
