import inquirer from 'inquirer'
import program from 'commander'
import { PackageManager, Choice } from './shared-types'
import { MESSAGES } from './ui/messages'
import { FileSystemReader } from './readers'

interface PackageManagerChoice extends Choice {
  value: PackageManager
}

export async function getPackageManager(): Promise<PackageManager> {
  const cwdDirFileNames = await FileSystemReader.readDir(process.cwd())

  for (const fileName of cwdDirFileNames) {
    if (fileName === 'package-lock.json') return 'npm'
    if (fileName === 'yarn.lock') return 'yarn'
  }

  const packageManagerChoices: PackageManagerChoice[] = [
    { name: 'npm', value: 'npm' },
    { name: 'Yarn', value: 'yarn' },
  ]

  const packageManager = await inquirer
    .prompt<{ packageManager: PackageManager }>([
      {
        type: 'list',
        name: 'packageManager',
        message: 'Choose your package manager',
        choices: packageManagerChoices,
      },
    ])
    .then(({ packageManager }) => packageManager)

  if (program.opts().workspace && packageManager !== 'yarn') {
    throw new Error(MESSAGES.ONLY_YARN('workspaces'))
  }

  return packageManager
}
