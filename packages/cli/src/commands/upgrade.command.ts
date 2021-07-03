import { CommanderStatic } from 'commander'
import { UpgradeAction } from '../actions'

export class UpgradeCommand {
  static load(program: CommanderStatic): void {
    program
      .command('upgrade')
      .description('Upgrade @eslint-kit configs to their latest versions')
      .action(UpgradeAction.handle)
  }
}
