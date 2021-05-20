import { FileSystemReader } from './readers'

interface Params {
  rootDir: string
}

export function getRootDirFileNames({ rootDir }: Params): Promise<string[]> {
  return FileSystemReader.readDir(rootDir)
}
