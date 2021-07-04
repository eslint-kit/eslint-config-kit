import chalk from 'chalk'
import { toConfigPackage } from '../../lib/config-name-helpers'
import { getDataBySchema } from '../../lib/data-by-schema'
import { upgradeDependenciesToLatest } from '../../lib/dependencies-work'
import { getUpdatedPrettierConfig } from '../../lib/get-updated-prettier-config'
import { MESSAGES } from '../../lib/ui/messages'
import { updatePrettierConfig } from '../../lib/update-prettier-config'
import { log } from '../../lib/util/log'
import { LOCAL_MESSAGES } from './ui/local-messages'

export class UpgradeAction {
  static async process(): Promise<void> {
    const { rootDir, packageManager, installedConfigs, prettierConfigMeta } =
      await getDataBySchema({
        rootDir: true,
        packageManager: true,
        installedConfigs: true,
        prettierConfigMeta: true,
      })

    if (installedConfigs.length === 0) {
      log(LOCAL_MESSAGES.NO_CONFIGS, chalk.red)
      return
    }

    await upgradeDependenciesToLatest({
      packageManager,
      dependencies: installedConfigs.map(toConfigPackage),
    })

    if (installedConfigs.includes('prettier')) {
      const updatedConfig = getUpdatedPrettierConfig({
        prettierConfigMeta,
        aliasesMeta: {
          aliasMap: [],
        },
      })

      if (updatedConfig)
        await updatePrettierConfig({
          rootDir,
          prettierConfigMeta,
          updatedConfig,
        })
    }

    log(LOCAL_MESSAGES.VERSIONS_UPGRADED, chalk.green, [true, false])
    log(MESSAGES.PLEASE_RESTART, [chalk.magenta, chalk.bold])

    if (
      prettierConfigMeta.found &&
      prettierConfigMeta.supported &&
      (!prettierConfigMeta.content.importOrder ||
        !prettierConfigMeta.content.experimentalBabelParserPluginsList)
    ) {
      log(LOCAL_MESSAGES.RE_RUN_ALIAS, chalk.red)
    }
  }

  public static async handle(): Promise<void> {
    try {
      await UpgradeAction.process()
    } catch (error) {
      log(error.message, chalk.red)
    }
  }
}
