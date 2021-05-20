import * as inquirer from 'inquirer'
import { generateAliasesMeta } from '../../lib/generate-aliases-meta'
import { AliasesMeta } from '../../lib/shared-types'

interface Answers {
  aliasesMeta: AliasesMeta
}

export function askQuestions(): Promise<Answers> {
  return inquirer.prompt([
    {
      type: 'editor',
      name: 'aliasesMeta',
      message: 'Enter aliases',
      default: '{\n  "@app": "./src"\n}',
      filter: string => {
        const json = string.replace(/[\n ]/g, '')
        const paths = JSON.parse(json)

        return generateAliasesMeta(paths)
      },
    },
  ])
}
