import chalk from 'chalk'
import { addRecommendedPrettierConfig } from '../../lib/add-recommended-prettier-config'
import { getDataBySchema } from '../../lib/data-by-schema'
import { updateDependencies } from '../../lib/dependencies-work'
import { getDependenciesToDelete } from '../../lib/get-dependencies-to-delete'
import { getDependenciesToInstall } from '../../lib/get-dependencies-to-install'
import { getFinalConfigs } from '../../lib/get-final-configs'
import { getRequiredDependencies } from '../../lib/get-required-dependencies'
import { getWrongDependencies } from '../../lib/get-wrong-dependencies'
import { getWrongDependenciesToUpdate } from '../../lib/get-wrong-dependencies-to-update'
import { MESSAGES } from '../../lib/ui/messages'
import { updateEslintConfig } from '../../lib/update-eslint-config'
import { log } from '../../lib/util/log'
import { askQuestions } from './ask-questions'
import { getUpdatedEslintConfig } from './get-updated-eslint-config'
import { LOCAL_MESSAGES } from './ui/local-messages'

export class ConfigAction {
  static async process(): Promise<void> {
    const {
      rootDir,
      packageManager,
      packageJson,
      eslintConfigMeta,
      prettierConfigMeta,
      installedConfigs,
      installedDependencies,
    } = await getDataBySchema({
      rootDir: true,
      packageManager: true,
      packageJson: true,
      eslintConfigMeta: true,
      prettierConfigMeta: true,
      installedConfigs: true,
      installedDependencies: true,
    })

    const { updatedConfigs, shouldAddRecommendedPrettierConfig } =
      await askQuestions({
        prettierConfigMeta,
        installedConfigs,
      })

    const { useTs } = await getDataBySchema(
      {
        useTs: true,
      },
      { installedDependencies, installedConfigs },
      { updatedConfigs }
    )

    const finalConfigs = getFinalConfigs({
      packageJson,
      updatedConfigs,
    })

    const updatedConfig = getUpdatedEslintConfig({
      eslintConfigMeta,
      finalConfigs,
      useTs,
    })

    await updateEslintConfig({
      rootDir,
      updatedConfig,
      packageJson,
      eslintConfigMeta,
    })

    if (shouldAddRecommendedPrettierConfig) {
      addRecommendedPrettierConfig({ rootDir })
    }

    const requiredDependencies = getRequiredDependencies({
      installedDependencies,
      finalConfigs,
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

    log(LOCAL_MESSAGES.FINISHED, chalk.green, [false, true])
    log(MESSAGES.PLEASE_RESTART, [chalk.magenta, chalk.bold], [false, true])
  }

  public static async handle(): Promise<void> {
    try {
      await ConfigAction.process()
    } catch (error) {
      const isError = error instanceof Error
      if (!isError) return
      log(error.message, chalk.red)
    }
  }
}
