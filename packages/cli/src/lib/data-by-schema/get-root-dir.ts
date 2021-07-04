import program from 'commander'
import glob from 'glob-promise'
import path from 'path'
import { PackageJson } from '../shared-types'
import { MESSAGES } from '../ui/messages'
import { findPackageJson } from './find-package-json'

async function findWorkspaceDirectory(
  workspace: string,
  workspaces: string[]
): Promise<string> {
  for (const workspaceGlob of workspaces) {
    const directories = await glob(workspaceGlob)

    for (const directory of directories) {
      const fullPath = path.join(process.cwd(), directory)

      let packageJson
      try {
        packageJson = await findPackageJson({
          rootDir: fullPath,
        })
      } catch {
        continue
      }

      if (packageJson.name !== workspace) {
        continue
      }

      return fullPath
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
      throw new TypeError(MESSAGES.WORKSPACES.NOT_VALID)
    }

    if (!rootPackageJson.workspaces) {
      throw new Error(MESSAGES.WORKSPACES.NO_WORKSPACES_FOUND)
    }

    return findWorkspaceDirectory(workspace, rootPackageJson.workspaces)
  }

  return process.cwd()
}
