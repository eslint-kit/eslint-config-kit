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

function createSpinner() {
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

    return new Promise((resolve) => {
      setTimeout(resolve, 2000)
    })
  }

  return {
    start: spin,
    stop: spinner.stop,
    showResult,
  }
}

interface UpgradeConfigsParams {
  packageManager: PackageManager
  dependencies: MeaningfulDependency[]
}

export async function upgradeDependenciesToLatest({
  packageManager: packageManagerName,
  dependencies,
}: UpgradeConfigsParams) {
  if (dependencies.length === 0) {
    return
  }

  const latestVersions: string[] = []

  for (const dependency of dependencies) {
    latestVersions.push(`${dependency}@latest`)
  }

  const packageManager = new PACKAGE_MANAGERS[packageManagerName]()

  const spinner = createSpinner()

  log(MESSAGES.PACKAGE_MANAGER.WARNING, [chalk.red, chalk.bold])

  try {
    const { workspace } = program.opts()

    if (latestVersions.length > 0) {
      spinner.start(chalk.yellow(MESSAGES.PACKAGE_MANAGER.UPGRADING))
      await packageManager.install({
        dependencies: latestVersions,
        saveType: 'dev',
        workspace,
      })
      await spinner.showResult(chalk.green(MESSAGES.PACKAGE_MANAGER.INSTALLED))
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

  const spinner = createSpinner()

  log(MESSAGES.PACKAGE_MANAGER.WARNING, [chalk.red, chalk.bold])

  try {
    const { workspace } = program.opts()

    if (dependenciesToDelete.length > 0) {
      spinner.start(chalk.yellow(MESSAGES.PACKAGE_MANAGER.REMOVING))
      await packageManager.uninstall({
        dependencies: dependenciesToDelete,
        workspace,
      })
      await spinner.showResult(chalk.green(MESSAGES.PACKAGE_MANAGER.REMOVED))
    }

    if (anyVersion.length > 0) {
      spinner.start(chalk.yellow(MESSAGES.PACKAGE_MANAGER.INSTALLING))
      await packageManager.install({
        dependencies: anyVersion,
        saveType: 'dev',
        workspace,
      })
      await spinner.showResult(chalk.green(MESSAGES.PACKAGE_MANAGER.INSTALLED))
    }

    if (exactVersion.length > 0) {
      spinner.start(chalk.yellow(MESSAGES.PACKAGE_MANAGER.INSTALLING_EXACT))
      await packageManager.install({
        dependencies: exactVersion,
        saveType: 'dev',
        workspace,
        exact: true,
      })
      await spinner.showResult(chalk.green(MESSAGES.PACKAGE_MANAGER.INSTALLED))
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
