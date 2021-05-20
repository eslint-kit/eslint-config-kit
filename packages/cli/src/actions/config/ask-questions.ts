import inquirer from 'inquirer'
import chalk from 'chalk'
import { Config, PrettierConfigMeta, Choice } from '../../lib/shared-types'
import { toMap } from '../../lib/util/to-map'
import { Answers } from './types'

interface ConfigChoice extends Choice {
  value: Config
}

const DEFAULT_CONFIG_CHOICES: ConfigChoice[] = [
  { name: 'Base (required)', value: 'base', checked: true },
  { name: 'Prettier', value: 'prettier' },
  { name: 'React', value: 'react' },
  { name: 'Node', value: 'node' },
  { name: 'TypeScript', value: 'typescript' },
]

const configToNameMapper: Record<Config, string> = {
  'base': 'Base',
  'prettier': 'Prettier',
  'react': 'React',
  'react-new-jsx-transform': 'React With New JSX Transform Support',
  'node': 'Node',
  'typescript': 'TypeScript',
}

function configToName(configKey: Config): string {
  return configToNameMapper[configKey]
}

function createConfigsMessage({
  hasInstalledConfigs,
}: {
  hasInstalledConfigs: boolean
}): string {
  let result = 'Choose configs'

  if (hasInstalledConfigs) {
    result += ' '
    result += '(uncheck installed configs to remove them)'
  }

  result += ':\n'

  return result
}

function createConfirmationMessage({
  addedConfigs,
  deletedConfigs,
  remainedConfigs,
}: {
  addedConfigs: Config[]
  deletedConfigs: Config[]
  remainedConfigs: Config[]
}): string {
  let result = 'Confirm the following changes:'

  if (addedConfigs.length > 0) {
    result += '\n\n'
    result += 'Will be installed:\n'
    result += chalk.green(addedConfigs.map(configToName).join(', '))
  }

  if (deletedConfigs.length > 0) {
    result += '\n\n'
    result += 'Will be deleted:\n'
    result += chalk.red(deletedConfigs.map(configToName).join(', '))
  }

  if (remainedConfigs.length > 0) {
    result += '\n\n'
    result += 'Will stay unchanged:\n'
    result += chalk.yellow(remainedConfigs.map(configToName).join(', '))
  }

  result += '\n\n'

  return result
}

interface AskQuestionsParams {
  prettierConfigMeta: PrettierConfigMeta
  installedConfigs: Config[]
}

export async function askQuestions({
  prettierConfigMeta,
  installedConfigs,
}: AskQuestionsParams): Promise<Answers> {
  const installedConfigsMap = toMap(installedConfigs)
  const hasInstalledConfigs = installedConfigsMap.size > 0

  const configChoices: ConfigChoice[] = DEFAULT_CONFIG_CHOICES.map(choice => {
    const { name, value } = choice

    const overridedProps: Partial<ConfigChoice> = {}

    if (installedConfigsMap.has(value) && value !== 'base') {
      overridedProps.name = `${name} (installed)`
      overridedProps.checked = true
    }

    return {
      ...choice,
      ...overridedProps,
    }
  })

  const { configs: updatedConfigs } = await inquirer.prompt<{
    configs: Config[]
  }>([
    {
      type: 'checkbox',
      name: 'configs',
      message: createConfigsMessage({ hasInstalledConfigs }),
      choices: configChoices,
      validate: input => {
        if (!input.includes('base')) {
          return 'base config is required'
        }

        return true
      },
    },
  ])

  const addedConfigs = updatedConfigs.filter(config => {
    return !installedConfigs.includes(config)
  })

  const deletedConfigs = installedConfigs.filter(config => {
    return !updatedConfigs.includes(config)
  })

  const remainedConfigs = updatedConfigs.filter(config => {
    return installedConfigs.includes(config)
  })

  const hasChanges = addedConfigs.length > 0 || deletedConfigs.length > 0

  if (hasChanges) {
    const { isConfirmed } = await inquirer.prompt<{ isConfirmed: boolean }>([
      {
        type: 'confirm',
        name: 'isConfirmed',
        message: createConfirmationMessage({
          addedConfigs,
          deletedConfigs,
          remainedConfigs,
        }),
      },
    ])

    if (!isConfirmed) {
      throw new Error('Confirmation had not been received')
    }
  }

  const { shouldAddRecommendedPrettierConfig } = await inquirer.prompt<{
    shouldAddRecommendedPrettierConfig: boolean
  }>([
    {
      type: 'confirm',
      name: 'shouldAddRecommendedPrettierConfig',
      message: 'Add recommended prettier config? (.prettierrc)',
      when: () => {
        if (prettierConfigMeta.isExist) {
          return false
        }

        return addedConfigs.includes('prettier')
      },
      default: true,
    },
  ])

  return {
    updatedConfigs,
    addedConfigs,
    deletedConfigs,
    shouldAddRecommendedPrettierConfig,
  }
}
