export type Parser = 'babel-eslint' | '@typescript-eslint/parser'

export type MeaningfulDependency =
  | Parser
  | 'eslint'
  | '@eslint-kit/eslint-config-base'
  | '@eslint-kit/eslint-config-node'
  | '@eslint-kit/eslint-config-prettier'
  | '@eslint-kit/eslint-config-react'
  | '@eslint-kit/eslint-config-typescript'
  | 'prettier'
  | 'eslint-import-resolver-typescript'
  | 'eslint-import-resolver-alias'

export type MaxVersions = Record<MeaningfulDependency, string | null>

export interface WrongDependencies {
  notEqual: MeaningfulDependency[]
  tooLow: MeaningfulDependency[]
  tooHigh: MeaningfulDependency[]
  total: number
}

export type JsonValue =
  | undefined
  | boolean
  | number
  | string
  | JsonValue[]
  | { [key: string]: JsonValue }

export interface Json {
  [key: string]: JsonValue
}

export interface PackageJson extends Json {
  eslint?: Json
  prettier?: Json
  dependencies?: Record<string, string>
  devDependencies?: Record<string, string>
  workspaces?: string[]
}

export interface EslintConfig extends Json {
  extends?: string | string[]
  parser?: Parser
  settings?: Json
  rules?: Record<string, number | string | Json>
  root?: boolean
}

export type EslintConfigMeta =
  | {
      configFileName: string
      isPackageJson: false
      isYaml: boolean
      content: EslintConfig
    }
  | {
      configFileName: null
      isPackageJson: true
      isYaml: false
      content: EslintConfig
    }

export interface PrettierConfigMeta {
  isExist: boolean
}

export type AliasMapItem = [string, string]

export interface PathGroup {
  pattern: string
  group: 'index' | 'sibling' | 'parent' | 'internal' | 'external' | 'builtin'
  position: 'before' | 'after'
}

export interface AliasesMeta {
  aliasMap: AliasMapItem[]
  pathGroups: PathGroup[]
}

export type Config =
  | 'base'
  | 'prettier'
  | 'react'
  | 'react-new-jsx-transform'
  | 'node'
  | 'typescript'

export type PackageManager = 'npm' | 'yarn'

export interface Choice {
  name: string
  value: string | number
  checked?: boolean
  disabled?: boolean
}
