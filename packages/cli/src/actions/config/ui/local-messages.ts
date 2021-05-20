export const LOCAL_MESSAGES = {
  FINISHED: 'Successfully updated configs',
  ONLY_YARN: (feature: string) =>
    `Only Yarn supports the following feature: "${feature}"`,
  ONLY_WORKSPACES: 'The "--workspace" option is only available for workspaces',
}
