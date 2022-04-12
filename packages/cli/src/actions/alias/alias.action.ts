import chalk from 'chalk'
import { getDataBySchema } from '../../lib/data-by-schema'
import { updateDependencies } from '../../lib/dependencies-work'
import { getDependenciesToDelete } from '../../lib/get-dependencies-to-delete'
import { getDependenciesToInstall } from '../../lib/get-dependencies-to-install'
import { getRequiredDependencies } from '../../lib/get-required-dependencies'
import { getUpdatedPrettierConfig } from '../../lib/get-updated-prettier-config'
import { getWrongDependencies } from '../../lib/get-wrong-dependencies'
import { getWrongDependenciesToUpdate } from '../../lib/get-wrong-dependencies-to-update'
import { MESSAGES } from '../../lib/ui/messages'
import { updateEslintConfig } from '../../lib/update-eslint-config'
import { updatePrettierConfig } from '../../lib/update-prettier-config'
import { log } from '../../lib/util/log'
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
      prettierConfigMeta,
      installedDependencies,
      useTs,
      packageManager,
      installedConfigs,
    } = await getDataBySchema({
      rootDir: true,
      packageJson: true,
      prettierConfigMeta: true,
      eslintConfigMeta: true,
      installedDependencies: true,
      useTs: true,
      packageManager: true,
      installedConfigs: true,
    })

    const updatedEslintConfig = getUpdatedEslintConfig({
      eslintConfigMeta,
      aliasesMeta,
      useTs,
    })

    const updatedPrettierConfig = getUpdatedPrettierConfig({
      prettierConfigMeta,
      aliasesMeta,
    })

    await updateEslintConfig({
      rootDir,
      updatedConfig: updatedEslintConfig,
      packageJson,
      eslintConfigMeta,
    })

    if (updatedPrettierConfig) {
      await updatePrettierConfig({
        rootDir,
        updatedConfig: updatedPrettierConfig,
        prettierConfigMeta,
      })
    }

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
    } catch (error) {
      const isError = error instanceof Error
      if (!isError) return
      log(error.message, chalk.red)
    }
  }
}
