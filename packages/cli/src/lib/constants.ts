import { Config, MaxVersions, MeaningfulDependency } from './shared-types'

export const FILENAMES = {
  ESLINT: '.eslintrc',
  PRETTIER: '.prettierrc',
  PACKAGE_JSON: 'package.json',
}

export enum DEPENDENCIES {
  BABEL_PARSER = 'babel-eslint',
  TS_PARSER = '@typescript-eslint/parser',
}

export const CONFIG_PREFIX = '@eslint-kit/'

export const CONFIG_PRIORITIES: Record<Config, number> = {
  'patch': 1,
  'base': 2,
  'typescript': 3,
  'node': 4,
  'react': 5,
  'react-new-jsx-transform': 6,
  'prettier': 7,
}

export const MAX_VERSIONS: MaxVersions = {
  'eslint': '7.32.0',
  'babel-eslint': '10.1.0',
  '@typescript-eslint/parser': null,
  'eslint-import-resolver-alias': '1.1.2',
  'eslint-import-resolver-typescript': '2.3.0',
  'prettier': '2.3.0',
  '@eslint-kit/eslint-config-base': null,
  '@eslint-kit/eslint-config-node': null,
  '@eslint-kit/eslint-config-prettier': null,
  '@eslint-kit/eslint-config-react': null,
  '@eslint-kit/eslint-config-typescript': null,
}

export const MEANINGFUL_DEPENDENCIES = Object.keys(
  MAX_VERSIONS
) as MeaningfulDependency[]
