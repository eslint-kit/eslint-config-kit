import { PackageJson } from './shared-types'
import { getInstalledDependencies } from './get-installed-dependencies'
import { DEPENDENCIES } from './constants'

describe('getInstalledDependencies', () => {
  it('should work correctly', () => {
    expect(getInstalledDependencies({ packageJson: {} })).toEqual([])

    const packageJson: PackageJson = {
      dependencies: {
        moment: '123',
        redux: '321',
      },
      devDependencies: {
        eslint: '123',
        something: '321',
      },
    }

    expect(getInstalledDependencies({ packageJson })).toEqual([
      'moment',
      'redux',
      'eslint',
      'something',
    ])
  })

  it('should work correctly with react-scripts', () => {
    const packageJson: PackageJson = {
      dependencies: {
        'react-scripts': '123',
      },
    }

    expect(getInstalledDependencies({ packageJson })).toEqual([
      'react-scripts',
      'eslint',
      DEPENDENCIES.BABEL_PARSER,
    ])
  })
})
