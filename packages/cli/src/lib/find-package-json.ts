import path from 'path'
import { FILENAMES } from './constants'
import { PackageJson } from './shared-types'
import { FileSystemReader } from './readers'

interface Params {
  rootDir?: string
}

export async function findPackageJson({
  rootDir = process.cwd(),
}: Params): Promise<PackageJson> {
  let json: string

  try {
    const buffer = await FileSystemReader.readFile(
      path.resolve(rootDir, FILENAMES.PACKAGE_JSON)
    )

    json = buffer.toString()
  } catch {
    throw new Error('Cannot find package.json file in your project root')
  }

  let content: PackageJson

  try {
    content = JSON.parse(json)
  } catch {
    throw new Error('Cannot parse package.json contents')
  }

  return content
}
