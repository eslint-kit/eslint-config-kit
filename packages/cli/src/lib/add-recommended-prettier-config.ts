import path from 'path'
import { FILENAMES } from './constants'
import { FileSystemReader } from './readers'

interface Params {
  rootDir: string
}

function withNesting(regex: string): string {
  return regex + '(\\/(.*))?$'
}

const builtInNodeModulesString = [
  'child_process',
  'crypto',
  'events',
  'fs',
  'http',
  'https',
  'os',
  'path',
].join('|')

const importOrder = [
  withNesting(`^(${builtInNodeModulesString})`),
  '<THIRD_PARTY_MODULES>',
  withNesting('^~'),
  withNesting('^@'),
  withNesting('^@app'),
  '^[./]',
]

export async function addRecommendedPrettierConfig({
  rootDir,
}: Params): Promise<void> {
  const recommendedConfig = {
    semi: false,
    singleQuote: true,
    tabWidth: 2,
    quoteProps: 'consistent',
    endOfLine: 'lf',
    importOrder,
    experimentalBabelParserPluginsList: ['jsx', 'typescript'],
  }

  return FileSystemReader.writeFile(
    path.resolve(rootDir, FILENAMES.PRETTIER),
    JSON.stringify(recommendedConfig, null, 2)
  )
}
