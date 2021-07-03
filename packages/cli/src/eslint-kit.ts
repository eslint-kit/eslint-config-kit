import commander from 'commander'
import {
  ConfigCommand,
  AliasCommand,
  CheckCommand,
  UpgradeCommand,
} from './commands'

function bootstrap(): void {
  const program = commander

  program
    .version(
      require('../package.json').version,
      '-v --version',
      'Output the current version'
    )
    .usage('<command>')
    .helpOption('-h --help', 'Output usage information')
    .option('-W, --workspace <name>', 'Specify a workspace')

  ConfigCommand.load(program)
  AliasCommand.load(program)
  CheckCommand.load(program)
  UpgradeCommand.load(program)

  program.parse(process.argv)
}

bootstrap()
