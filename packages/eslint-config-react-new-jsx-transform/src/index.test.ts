import { testConfig } from '../../../shared/testing'
import config from './index'

describe('@eslint-kit/react-new-jsx-transform', () => {
  it('should match snapshots', async () => {
    await testConfig({
      config,
      files: ['basic-clear'],
      extension: 'js',
    })
  })
})
