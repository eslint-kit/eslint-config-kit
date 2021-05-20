import { YarnRunner } from '../runners/yarn.runner'
import { AbstractPackageManager } from './abstract.package-manager'
import { PackageManagerCommands } from './types'

export class YarnPackageManager extends AbstractPackageManager {
  constructor() {
    super(new YarnRunner(), {
      useFlagForUninstall: false,
    })
  }

  get cli(): PackageManagerCommands {
    return {
      install: 'add',
      installWorkspace: name => `workspace ${name} add`,
      uninstall: 'remove',
      uninstallWorkspace: name => `workspace ${name} remove`,
      saveFlag: '',
      saveDevFlag: '-D',
      exactFlag: '-E',
      rootFlag: '-W',
    }
  }
}
