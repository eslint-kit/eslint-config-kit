import path from 'path'
import { FILENAMES } from './constants'
import { FileSystemReader } from './readers'

interface Params {
  rootDir: string
}

export async function addRecommendedPrettierConfig({
  rootDir,
}: Params): Promise<void> {
  const recommendedConfig = {
    semi: false,
    singleQuote: true,
    tabWidth: 2,
    quoteProps: 'consistent',
    endOfLine: 'lf',
    importOrder: ['^[./]'],
  }

  return FileSystemReader.writeFile(
    path.resolve(rootDir, FILENAMES.PRETTIER),
    JSON.stringify(recommendedConfig, null, 2)
  )
}
