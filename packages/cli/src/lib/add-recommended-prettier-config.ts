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
    trailingComma: 'es5',
    endOfLine: 'lf',
  }

  return FileSystemReader.writeFile(
    path.resolve(rootDir, FILENAMES.PRETTIER),
    JSON.stringify(recommendedConfig, null, 2)
  )
}
