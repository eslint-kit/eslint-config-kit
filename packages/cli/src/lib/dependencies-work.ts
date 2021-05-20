import ora from 'ora'
import chalk from 'chalk'
import program from 'commander'
import {
  MaxVersions,
  MeaningfulDependency,
  PackageManager,
} from './shared-types'
import { NpmPackageManager, YarnPackageManager } from './package-managers'
import { MAX_VERSIONS } from './constants'
import { MESSAGES } from './ui/messages'
import { log } from './util/log'

const PACKAGE_MANAGERS = {
  npm: NpmPackageManager,
  yarn: YarnPackageManager,
}

interface UpdateDependenciesParams {
  packageManager: PackageManager
  dependenciesToInstall?: MeaningfulDependency[]
  dependenciesToDelete?: MeaningfulDependency[]
  maxVersions?: MaxVersions
}

export async function updateDependencies({
  packageManager: packageManagerName,
  dependenciesToInstall = [],
  dependenciesToDelete = [],
  maxVersions = MAX_VERSIONS,
}: UpdateDependenciesParams): Promise<void> {
  if (dependenciesToInstall.length === 0 && dependenciesToDelete.length === 0) {
    return
  }

  const anyVersion: string[] = []
  const exactVersion: string[] = []

  for (const dependency of dependenciesToInstall) {
    if (maxVersions[dependency]) {
      exactVersion.push(`${dependency}@${maxVersions[dependency]}`)
      continue
    }

    anyVersion.push(dependency)
  }

  const packageManager = new PACKAGE_MANAGERS[packageManagerName]()

  const spinner = ora({
    spinner: 'dots',
  })

  const spin = (text: string): void => {
    spinner.text = text

    if (!spinner.isSpinning) {
      spinner.start()
    }
  }

  const showResult = (text: string): Promise<void> => {
    spinner.text = text

    return new Promise(resolve => {
      setTimeout(resolve, 2000)
    })
  }

  log(MESSAGES.PACKAGE_MANAGER.WARNING, [chalk.red, chalk.bold])

  try {
    const { workspace } = program.opts()

    if (dependenciesToDelete.length > 0) {
      spin(chalk.yellow(MESSAGES.PACKAGE_MANAGER.REMOVING))
      await packageManager.uninstall({
        dependencies: dependenciesToDelete,
        workspace,
      })
      await showResult(chalk.green(MESSAGES.PACKAGE_MANAGER.REMOVED))
    }

    if (anyVersion.length > 0) {
      spin(chalk.yellow(MESSAGES.PACKAGE_MANAGER.INSTALLING))
      await packageManager.install({
        dependencies: anyVersion,
        saveType: 'dev',
        workspace,
      })
      await showResult(chalk.green(MESSAGES.PACKAGE_MANAGER.INSTALLED))
    }

    if (exactVersion.length > 0) {
      spin(chalk.yellow(MESSAGES.PACKAGE_MANAGER.INSTALLING_EXACT))
      await packageManager.install({
        dependencies: exactVersion,
        saveType: 'dev',
        workspace,
        exact: true,
      })
      await showResult(chalk.green(MESSAGES.PACKAGE_MANAGER.INSTALLED))
    }

    spinner.stop()
  } catch (error) {
    spinner.stop()
    log(
      MESSAGES.PACKAGE_MANAGER.FAILED(error?.message ?? 'Unknown error'),
      chalk.red
    )
  }
}
