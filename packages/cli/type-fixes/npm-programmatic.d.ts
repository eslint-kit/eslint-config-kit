declare module 'npm-programmatic' {
  interface InstallOptions {
    cwd?: string
    save?: boolean
    saveDev?: boolean
  }

  export function install(dependencies: string[], options: InstallOptions): Promise<void>
}
