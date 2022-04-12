/* eslint-disable sonarjs/no-duplicate-string */
import { getWrongDependencies } from './get-wrong-dependencies'
import { MaxVersions } from './shared-types'

describe('getWrongDependencies', () => {
  it('should work', () => {
    expect(
      getWrongDependencies({
        packageJson: {
          dependencies: {
            'eslint': '1.0.0',
            '@typescript-eslint/parser': '^3.2.2',
          },
          devDependencies: {
            '@eslint-kit/eslint-config-base': '3.3.3',
          },
        },
        requiredDependencies: [
          '@eslint-kit/eslint-config-base',
          '@typescript-eslint/parser',
          'eslint',
          'eslint-import-resolver-alias',
          'prettier',
        ],
        maxVersions: {
          'eslint': '1.1.1',
          '@typescript-eslint/parser': null,
          '@eslint-kit/eslint-config-base': null,
        } as MaxVersions,
      })
    ).toEqual({
      notEqual: ['eslint'],
      tooLow: ['eslint'],
      tooHigh: [],
      total: 1,
    })
  })
})
