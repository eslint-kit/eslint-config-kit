import { Config } from '../../lib/shared-types'

export interface Answers {
  updatedConfigs: Config[]
  addedConfigs: Config[]
  deletedConfigs: Config[]
  shouldAddRecommendedPrettierConfig?: boolean
}
