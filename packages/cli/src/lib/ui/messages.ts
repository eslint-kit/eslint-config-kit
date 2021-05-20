export const MESSAGES = {
  RUNNER_EXECUTION_ERROR: (command: string) =>
    `Failed to execute command: ${command}`,
  ONLY_YARN: (feature: string) =>
    `Only Yarn supports the following feature: "${feature}"`,
  WORKSPACES: {
    NOT_VALID: `The "--workspace" option's value should be a string`,
    NO_WORKSPACES_FOUND:
      'The "--workspace" option is only available for workspaces',
    WORKSPACE_NOT_FOUND: 'Cannot find the specified workspace',
  },
  CONFIGS_UPDATING_STARTED: 'Updating configs..',
  CONFIGS_UPDATING_SUCCEED: 'Successfully updated configs',
  COMPLETED: 'Completed!',
  PLEASE_RESTART:
    'Please restart your IDE/editor to make sure everything works properly',
  PACKAGE_MANAGER: {
    WARNING:
      "Please don't touch package.json during the dependencies installation",
    INSTALLING: 'Installing dependencies..',
    INSTALLING_EXACT: 'Installing exact dependencies..',
    INSTALLED: 'Successfully installed dependencies',
    REMOVING: 'Removing dependencies..',
    REMOVED: 'Successfully removed dependencies',
    FAILED: (error: string) => `Command failed:\n${error}`,
    FINISHED: 'All set',
  },
}
