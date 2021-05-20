import { Json, EslintConfigMeta, AliasesMeta } from '../../lib/shared-types'
import { tsAliasesAdder, jsAliasesAdder } from './aliases-adders'

interface GetUpdateConfigParams {
  eslintConfigMeta: EslintConfigMeta
  aliasesMeta: AliasesMeta
  useTs: boolean
}

export function getUpdatedEslintConfig({
  eslintConfigMeta,
  aliasesMeta,
  useTs,
}: GetUpdateConfigParams): Json {
  const { content } = eslintConfigMeta

  let updatedConfig = Object.assign({}, content)

  if (useTs) {
    updatedConfig = tsAliasesAdder(updatedConfig, aliasesMeta)
  } else {
    updatedConfig = jsAliasesAdder(updatedConfig, aliasesMeta)
  }

  return updatedConfig
}
