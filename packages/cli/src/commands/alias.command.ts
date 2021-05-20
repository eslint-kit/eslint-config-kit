import { CommanderStatic } from 'commander'
import { AliasAction } from '../actions'

export class AliasCommand {
  static load(program: CommanderStatic): void {
    program
      .command('alias')
      .description('Add / edit eslint aliases setup for eslint-plugin-import')
      .action(AliasAction.handle)
  }
}
