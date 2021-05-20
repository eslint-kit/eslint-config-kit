import chalk from 'chalk'
import inquirer from 'inquirer'
import { MeaningfulDependency, WrongDependencies } from './shared-types'

function createMessage({
  wrongDependencies,
}: {
  wrongDependencies: WrongDependencies
}): string {
  let result =
    'ESLint Kit uses exact versions of some packages for more stability.' +
    ' Several of your currently installed packages may be incompatible with ESLint Kit.'

  const { tooHigh, tooLow } = wrongDependencies

  if (tooHigh.length > 0) {
    result += '\n\n'
    result += 'Packages with too high version:\n\n'
    result += chalk.red(tooHigh.join('\n'))
  }

  if (tooLow.length > 0) {
    result += '\n\n'
    result += 'Packages with too low version:\n\n'
    result += chalk.yellow(tooLow.join('\n'))
  }

  result += '\n\nSelect action:\n\n'

  return result
}

type Action =
  | 'update-both'
  | 'downgrade-high'
  | 'upgrade-low'
  | 'select-manually'
  | 'do-nothing'

interface ActionChoice {
  name: string
  value: Action
}

interface GetWrongDependenciesParams {
  wrongDependencies: WrongDependencies
}

export async function getWrongDependenciesToUpdate({
  wrongDependencies,
}: GetWrongDependenciesParams): Promise<MeaningfulDependency[]> {
  if (wrongDependencies.total === 0) {
    return []
  }

  const actionChoices: ActionChoice[] = []

  actionChoices.push({
    name: 'Update all packages to exact versions (recommended)',
    value: 'update-both',
  })

  if (
    wrongDependencies.tooHigh.length > 0 &&
    wrongDependencies.tooLow.length > 0
  ) {
    actionChoices.push(
      {
        name: 'Only downgrade packages with too high version',
        value: 'downgrade-high',
      },
      {
        name: 'Only upgrade packages with too low version',
        value: 'upgrade-low',
      }
    )
  }

  actionChoices.push(
    {
      name: 'Select packages manually',
      value: 'select-manually',
    },
    {
      name: 'Do nothing (not recommended)',
      value: 'do-nothing',
    }
  )

  const { action } = await inquirer.prompt<{ action: Action }>([
    {
      type: 'list',
      name: 'action',
      message: createMessage({ wrongDependencies }),
      choices: actionChoices,
    },
  ])

  if (action === 'update-both') {
    return wrongDependencies.notEqual
  }

  if (action === 'downgrade-high') {
    return wrongDependencies.tooHigh
  }

  if (action === 'upgrade-low') {
    return wrongDependencies.tooLow
  }

  if (action === 'do-nothing') {
    return []
  }

  const { selectedPackages } = await inquirer.prompt<{
    selectedPackages: MeaningfulDependency[]
  }>([
    {
      type: 'checkbox',
      name: 'selectedPackages',
      message: 'Select packages to update:\n',
      choices: wrongDependencies.notEqual.map(dependency => {
        const action = wrongDependencies.tooHigh.includes(dependency)
          ? 'downgrade'
          : 'upgrade'

        return {
          name: `${dependency} (${action})`,
          value: dependency,
          checked: true,
        }
      }),
    },
  ])

  return selectedPackages
}
