export interface PackageManagerCommands {
  install: string
  installWorkspace: (name: string) => string
  uninstall: string
  uninstallWorkspace: (name: string) => string
  saveFlag: string
  saveDevFlag: string
  exactFlag: string
  rootFlag: string
}
