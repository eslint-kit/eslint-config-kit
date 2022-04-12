import { testConfig } from '../../../shared/testing'
import config from './index'

describe('@eslint-kit/react', () => {
  it('should match snapshots', async () => {
    await testConfig({
      config,
      files: ['basic-clear', 'basic-warn', 'basic-error'],
      extension: 'js',
    })
  })
})
