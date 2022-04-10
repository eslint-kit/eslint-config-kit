import { testConfig } from '../../../shared/testing'
import config from './index'

describe('@eslint-kit/base', () => {
  it('should match snapshots', async () => {
    await testConfig({
      config,
      files: [
        'basic-clear.js',
        'basic-warn.js',
        'basic-error.js',
        'env-error.js'
      ]
    })
  })
})