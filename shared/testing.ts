import { ESLint, Linter } from "eslint"
import path from 'path'
import fs from 'fs'

export interface Options {
  config: any
  files: string[]
  extension: 'js' | 'ts' | 'tsx'
}

export async function testConfig({ config, files, extension}: Options) {
  const cli = new ESLint({
    baseConfig: config as Linter.Config<Linter.RulesRecord>,
    useEslintrc: false,
    cwd: path.resolve(process.cwd(), '../..'),
  })

  for (const file of files) {
    const filePath = path.resolve(process.cwd(), `./tests/${file}.${extension}`)
    const code = fs.readFileSync(filePath).toString()
    const isTS = ['ts', 'tsx'].includes(extension)
    const result = await cli.lintText(code, { filePath: isTS ? filePath : undefined })
    expect(result).toMatchSnapshot()
  }
}