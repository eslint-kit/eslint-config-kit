import { testConfig } from '../../../shared/testing'
import config from './index'

describe('@eslint-kit/eact-new-jsx-transform', () => {
  it('should match snapshots', async () => {
    await testConfig({
      config,
      files: [
        'basic-clear.js'
      ]
    })
  })
})