import path from 'path'
import program from 'commander'
import glob from 'glob-promise'
import { PackageJson } from './shared-types'
import { MESSAGES } from './ui/messages'

function getLastSegment(path: string): string {
  let result = ''

  for (let i = path.length - 1; i > 0; i--) {
    const char = path[i]

    if (char === '/' || char === '\\') {
      break
    }

    result = path[i] + result
  }

  return result
}

async function findWorkspaceDirectory(
  workspace: string,
  workspaces: string[]
): Promise<string> {
  for (const workspaceGlob of workspaces) {
    const directories = await glob(workspaceGlob)

    for (const directory of directories) {
      const lastSegment = getLastSegment(directory)
      if (lastSegment !== workspace) continue
      return path.join(process.cwd(), directory)
    }
  }

  throw new Error(MESSAGES.WORKSPACES.WORKSPACE_NOT_FOUND)
}

interface Params {
  rootPackageJson: PackageJson
}

export async function getRootDir({ rootPackageJson }: Params): Promise<string> {
  const { workspace } = program.opts()

  if (workspace) {
    if (typeof workspace !== 'string') {
      throw new Error(MESSAGES.WORKSPACES.NOT_VALID)
    }

    if (!rootPackageJson.workspaces) {
      throw new Error(MESSAGES.WORKSPACES.NO_WORKSPACES_FOUND)
    }

    return findWorkspaceDirectory(workspace, rootPackageJson.workspaces)
  }

  return process.cwd()
}
