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
  'base': 1,
  'typescript': 2,
  'node': 3,
  'react': 4,
  'react-new-jsx-transform': 5,
  'prettier': 6,
}

export const MAX_VERSIONS: MaxVersions = {
  'eslint': '7.10.0',
  'babel-eslint': '10.1.0',
  '@typescript-eslint/parser': '4.15.0',
  'eslint-import-resolver-alias': '1.1.2',
  'eslint-import-resolver-typescript': '2.3.0',
  'prettier': '2.2.1',
  '@eslint-kit/eslint-config-base': null,
  '@eslint-kit/eslint-config-node': null,
  '@eslint-kit/eslint-config-prettier': null,
  '@eslint-kit/eslint-config-react': null,
  '@eslint-kit/eslint-config-typescript': null,
}

export const MEANINGFUL_DEPENDENCIES = Object.keys(
  MAX_VERSIONS
) as MeaningfulDependency[]
