import YAML from 'yamljs'
import path from 'path'
import { FILENAMES } from '../constants'
import { FileSystemReader } from '../readers'
import { PrettierConfigMeta } from '../shared-types'

const unsupportedConfigFileNames = [
  '.prettierrc.js',
  'prettier.config.js',
  '.prettierrc.toml',
]

const yamlConfigFileNames = ['.prettierrc.yaml']

const configFileNames = [
  FILENAMES.PRETTIER,
  ...yamlConfigFileNames,
  ...unsupportedConfigFileNames,
]

interface Params {
  rootDir: string
  rootDirFileNames: string[]
}

export async function findPrettierConfig({
  rootDir,
  rootDirFileNames,
}: Params): Promise<PrettierConfigMeta> {
  const fileName = configFileNames.find((configFileName) => {
    return rootDirFileNames.includes(configFileName)
  })

  if (!fileName) return { found: false }

  const isUnsupportedFormatUsed = unsupportedConfigFileNames.includes(fileName)

  if (isUnsupportedFormatUsed) {
    return { found: true, supported: false }
  }

  const configPath = path.resolve(rootDir, fileName)
  const yaml = yamlConfigFileNames.includes(fileName)

  if (yaml) {
    const content = YAML.load(configPath)

    return {
      found: true,
      supported: true,
      yaml: true,
      fileName,
      content,
    }
  }

  const buffer = await FileSystemReader.readFile(configPath)
  const content = JSON.parse(buffer.toString())

  return {
    found: true,
    supported: true,
    yaml: false,
    fileName,
    content,
  }
}
