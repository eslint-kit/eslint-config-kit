import { testConfig } from '../../../shared/testing'
import config from './index'

describe('@eslint-kit/prettier', () => {
  it('should match snapshots', async () => {
    await testConfig({
      config,
      files: [
        'basic-clear',
        'basic-warn'
      ],
      extension: 'js'
    })
  })
})