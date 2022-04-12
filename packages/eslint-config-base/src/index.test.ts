import { testConfig } from '../../../shared/testing'
import config from './index'

describe('@eslint-kit/base', () => {
  it('should match snapshots', async () => {
    await testConfig({
      config,
      files: ['basic-clear', 'basic-warn', 'basic-error', 'env-error'],
      extension: 'js',
    })
  })
})
