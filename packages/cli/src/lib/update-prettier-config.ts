import path from 'path'
import YAML from 'yamljs'
import { FileSystemReader } from './readers'
import { PrettierConfigMeta, PrettierConfig } from './shared-types'

interface Params {
  rootDir: string
  updatedConfig: PrettierConfig
  prettierConfigMeta: PrettierConfigMeta
}

export async function updatePrettierConfig({
  rootDir,
  updatedConfig,
  prettierConfigMeta,
}: Params): Promise<void> {
  if (!prettierConfigMeta.found) return
  if (!prettierConfigMeta.supported) return

  if (prettierConfigMeta.yaml) {
    return FileSystemReader.writeFile(
      path.resolve(rootDir, prettierConfigMeta.fileName),
      YAML.stringify(updatedConfig, Number.POSITIVE_INFINITY, 2)
    )
  }

  return FileSystemReader.writeFile(
    path.resolve(rootDir, prettierConfigMeta.fileName),
    JSON.stringify(updatedConfig, null, 2)
  )
}
