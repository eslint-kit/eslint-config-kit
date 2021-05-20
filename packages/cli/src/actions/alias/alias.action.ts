import chalk from 'chalk'
import { getDataBySchema } from '../../lib/get-data-by-schema'
import { updateEslintConfig } from '../../lib/update-eslint-config'
import { log } from '../../lib/util/log'
import { MESSAGES } from '../../lib/ui/messages'
import { getDependenciesToInstall } from '../../lib/get-dependencies-to-install'
import { updateDependencies } from '../../lib/dependencies-work'
import { getRequiredDependencies } from '../../lib/get-required-dependencies'
import { getWrongDependencies } from '../../lib/get-wrong-dependencies'
import { getWrongDependenciesToUpdate } from '../../lib/get-wrong-dependencies-to-update'
import { getDependenciesToDelete } from '../../lib/get-dependencies-to-delete'
import { askQuestions } from './ask-questions'
import { getUpdatedEslintConfig } from './get-updated-eslint-config'
import { LOCAL_MESSAGES } from './ui/local-messages'

export class AliasAction {
  static async process(): Promise<void> {
    const { aliasesMeta } = await askQuestions()

    const {
      rootDir,
      packageJson,
      eslintConfigMeta,
      installedDependencies,
      useTs,
      packageManager,
      installedConfigs,
    } = await getDataBySchema({
      rootDir: true,
      packageJson: true,
      eslintConfigMeta: true,
      installedDependencies: true,
      useTs: true,
      packageManager: true,
      installedConfigs: true,
    })

    const updatedConfig = getUpdatedEslintConfig({
      eslintConfigMeta,
      aliasesMeta,
      useTs,
    })

    await updateEslintConfig({
      rootDir,
      updatedConfig,
      packageJson,
      eslintConfigMeta,
    })

    const requiredDependencies = getRequiredDependencies({
      installedDependencies,
      finalConfigs: installedConfigs,
      hasAliases: true,
      useTs,
    })

    const wrongDependencies = getWrongDependencies({
      packageJson,
      requiredDependencies,
    })

    const wrongDependenciesToUpdate = await getWrongDependenciesToUpdate({
      wrongDependencies,
    })

    const dependenciesToInstall = getDependenciesToInstall({
      requiredDependencies,
      installedDependencies,
      wrongDependenciesToUpdate,
    })

    const dependenciesToDelete = getDependenciesToDelete({
      requiredDependencies,
      installedDependencies,
      wrongDependenciesToUpdate,
    })

    await updateDependencies({
      packageManager,
      dependenciesToInstall,
      dependenciesToDelete,
    })

    log(LOCAL_MESSAGES.ADDED_ALIASES, chalk.green)
    log(MESSAGES.PLEASE_RESTART, [chalk.magenta, chalk.bold], [false, true])
  }

  public static async handle(): Promise<void> {
    try {
      await AliasAction.process()
    } catch (err) {
      log(err.message, chalk.red)
    }
  }
}
