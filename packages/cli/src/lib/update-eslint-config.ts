import YAML from 'yamljs'
import path from 'path'
import { FILENAMES } from './constants'
import { FileSystemReader } from './readers'
import { Json, EslintConfigMeta, PackageJson } from './shared-types'

interface Params {
  rootDir: string
  updatedConfig: Json
  packageJson: PackageJson
  eslintConfigMeta: EslintConfigMeta
}

export async function updateEslintConfig({
  rootDir,
  updatedConfig,
  packageJson,
  eslintConfigMeta,
}: Params): Promise<void> {
  if (eslintConfigMeta.isPackageJson) {
    packageJson.eslint = updatedConfig

    return FileSystemReader.writeFile(
      path.resolve(rootDir, FILENAMES.PACKAGE_JSON),
      JSON.stringify(packageJson, null, 2)
    )
  }

  if (eslintConfigMeta.isYaml) {
    return FileSystemReader.writeFile(
      path.resolve(rootDir, eslintConfigMeta.configFileName),
      YAML.stringify(updatedConfig, Number.POSITIVE_INFINITY, 2)
    )
  }

  return FileSystemReader.writeFile(
    path.resolve(rootDir, eslintConfigMeta.configFileName),
    JSON.stringify(updatedConfig, null, 2)
  )
}
