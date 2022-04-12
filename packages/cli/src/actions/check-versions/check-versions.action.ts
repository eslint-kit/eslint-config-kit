import chalk from 'chalk'
import { getDataBySchema } from '../../lib/data-by-schema'
import { updateDependencies } from '../../lib/dependencies-work'
import { getDependenciesToDelete } from '../../lib/get-dependencies-to-delete'
import { getDependenciesToInstall } from '../../lib/get-dependencies-to-install'
import { getRequiredDependencies } from '../../lib/get-required-dependencies'
import { getWrongDependencies } from '../../lib/get-wrong-dependencies'
import { getWrongDependenciesToUpdate } from '../../lib/get-wrong-dependencies-to-update'
import { MESSAGES } from '../../lib/ui/messages'
import { log } from '../../lib/util/log'
import { LOCAL_MESSAGES } from './ui/local-messages'

export class CheckVersionsAction {
  static async process(): Promise<void> {
    const {
      packageJson,
      installedConfigs,
      installedDependencies,
      useTs,
      packageManager,
    } = await getDataBySchema({
      packageJson: true,
      eslintConfigMeta: true,
      installedDependencies: true,
      useTs: true,
      packageManager: true,
      installedConfigs: true,
    })

    const requiredDependencies = getRequiredDependencies({
      installedDependencies,
      finalConfigs: installedConfigs,
      // maybe there is no aliases
      // but we need it for checking
      // we won't install alias dependencies anyway (if there aren't wrong versions)
      hasAliases: true,
      useTs,
    })

    const wrongDependencies = getWrongDependencies({
      packageJson,
      requiredDependencies,
    })

    if (wrongDependencies.total === 0) {
      log(LOCAL_MESSAGES.VERSIONS_ARE_FINE, chalk.green)
      return
    }

    const wrongDependenciesToUpdate = await getWrongDependenciesToUpdate({
      wrongDependencies,
    })

    if (wrongDependenciesToUpdate.length === 0) {
      log(LOCAL_MESSAGES.UPDATE_WAS_SKIPPED, chalk.yellow)
      return
    }

    /*
     * We don't use requiredDependencies further
     * Since it can contain dependencies we don't need
     */

    const dependenciesToInstall = getDependenciesToInstall({
      wrongDependenciesToUpdate,
    })

    const dependenciesToDelete = getDependenciesToDelete({
      wrongDependenciesToUpdate,
    })

    await updateDependencies({
      packageManager,
      dependenciesToInstall,
      dependenciesToDelete,
    })

    log(LOCAL_MESSAGES.VERSIONS_UPDATED, chalk.green, [true, false])
    log(MESSAGES.PLEASE_RESTART, [chalk.magenta, chalk.bold])
  }

  public static async handle(): Promise<void> {
    try {
      await CheckVersionsAction.process()
    } catch (error) {
      const isError = error instanceof Error
      if (!isError) return
      log(error.message, chalk.red)
    }
  }
}
