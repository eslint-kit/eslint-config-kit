import { testConfig } from '../../../shared/testing'
import config from './index'

describe('@eslint-kit/typescript', () => {
  it('should match snapshots', async () => {
    await testConfig({
      config: {
        ...config,
        parser: '@typescript-eslint/parser'
      },
      files: [
        'basic-clear.ts',
        'basic-warn.ts',
        'basic-error.ts'
      ]
    })
  })
})