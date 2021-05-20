import path from 'path'
import { AbstractRunner } from '../runners/abstract.runner'
import { PackageJson } from '../shared-types'
import { FileSystemReader } from '../readers'
import { PackageManagerCommands } from './types'

type SaveType = 'prod' | 'dev'

interface Options {
  useFlagForInstall: boolean
  useFlagForUninstall: boolean
}

const DEFAULT_OPTIONS: Options = {
  useFlagForInstall: true,
  useFlagForUninstall: true,
}

export abstract class AbstractPackageManager {
  constructor(
    protected runner: AbstractRunner,
    protected customOptions: Partial<Options> = {}
  ) {
    this.options = {
      ...DEFAULT_OPTIONS,
      ...customOptions,
    }
  }

  private options: Options

  public abstract get cli(): PackageManagerCommands

  private async manageDependencies({
    command,
    dependencies,
    saveType,
    exact = false,
    usingWorkspace = false,
  }: {
    command: string
    dependencies: string[]
    saveType?: SaveType
    exact?: boolean
    usingWorkspace?: boolean
  }): Promise<void> {
    const dependenciesString: string = dependencies.join(' ')

    const args: string[] = []

    args.push(command)

    if (saveType === 'prod') {
      args.push(this.cli.saveFlag)
    }

    if (saveType === 'dev') {
      args.push(this.cli.saveDevFlag)
    }

    if (exact) {
      args.push(this.cli.exactFlag)
    }

    if (!usingWorkspace) {
      args.push(this.cli.rootFlag)
    }

    args.push(dependenciesString)

    args.push('--silent')

    const argsString = args.filter(Boolean).join(' ')
    const collect = true

    await this.runner.run(argsString, collect)
  }

  public async install({
    dependencies,
    saveType,
    workspace,
    exact = false,
  }: {
    dependencies: string[]
    saveType?: SaveType
    workspace?: string
    exact?: boolean
  }): Promise<void> {
    const additionalOptions: Partial<{ saveType: SaveType }> = {}

    if (this.options.useFlagForInstall) {
      additionalOptions.saveType = saveType
    }

    if (workspace) {
      return this.manageDependencies({
        ...additionalOptions,
        command: this.cli.installWorkspace(workspace),
        dependencies,
        exact,
        usingWorkspace: true,
      })
    }

    return this.manageDependencies({
      ...additionalOptions,
      command: this.cli.install,
      dependencies,
      exact,
    })
  }

  public async uninstall({
    dependencies,
    saveType,
    workspace,
  }: {
    dependencies: string[]
    saveType?: SaveType
    workspace?: string
  }): Promise<void> {
    const additionalOptions: Partial<{ saveType: SaveType }> = {}

    if (this.options.useFlagForUninstall) {
      additionalOptions.saveType = saveType
    }

    if (workspace) {
      return this.manageDependencies({
        ...additionalOptions,
        command: this.cli.uninstallWorkspace(workspace),
        dependencies,
        usingWorkspace: true,
      })
    }

    return this.manageDependencies({
      ...additionalOptions,
      command: this.cli.uninstall,
      dependencies,
    })
  }

  public async version(): Promise<string> {
    const commandArguments = '--version'
    const collect = true
    return this.runner.run(commandArguments, collect) as Promise<string>
  }
}
