import chalk from 'chalk'
import { toConfigPackage } from '../../lib/config-name-helpers'
import { getDataBySchema } from '../../lib/data-by-schema'
import { upgradeDependenciesToLatest } from '../../lib/dependencies-work'
import { MESSAGES } from '../../lib/ui/messages'
import { log } from '../../lib/util/log'
import { LOCAL_MESSAGES } from './ui/local-messages'

export class UpgradeAction {
  static async process(): Promise<void> {
    const { packageManager, installedConfigs } = await getDataBySchema({
      packageManager: true,
      installedConfigs: true,
    })

    if (installedConfigs.length === 0) {
      log(LOCAL_MESSAGES.NO_CONFIGS, chalk.red)
      return
    }

    await upgradeDependenciesToLatest({
      packageManager,
      dependencies: installedConfigs.map(toConfigPackage),
    })

    log(LOCAL_MESSAGES.VERSIONS_UPGRADED, chalk.green, [true, false])
    log(MESSAGES.PLEASE_RESTART, [chalk.magenta, chalk.bold])
  }

  public static async handle(): Promise<void> {
    try {
      await UpgradeAction.process()
    } catch (error) {
      log(error.message, chalk.red)
    }
  }
}
