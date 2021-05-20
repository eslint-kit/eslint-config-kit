import { CommanderStatic } from 'commander'
import { CheckVersionsAction } from '../actions'

export class CheckCommand {
  static load(program: CommanderStatic): void {
    program
      .command('check')
      .alias('check-versions')
      .description('Check and update dependencies versions')
      .action(CheckVersionsAction.handle)
  }
}
