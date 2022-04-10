import { testConfig } from '../../../shared/testing'
import config from './index'

describe('@eslint-kit/node', () => {
  it('should match snapshots', async () => {
    await testConfig({
      config,
      files: [
        'env-clear.js'
      ]
    })
  })
})