/* eslint-disable @typescript-eslint/no-explicit-any */

import { mocked } from 'ts-jest/utils'
import { YarnRunner } from '../runners'
import { PackageManagerCommands } from './types'
import { YarnPackageManager } from './yarn.package-manager'

const MockedYarnRunner = mocked(YarnRunner, true)

jest.mock('../runners/yarn.runner', () => ({
  __esModule: true,
  YarnRunner: jest.fn(),
}))

describe('YarnPackageManager', () => {
  let packageManager: YarnPackageManager

  beforeEach(() => {
    MockedYarnRunner.mockClear()

    MockedYarnRunner.mockImplementation(() => {
      const mockedRunner = {
        run: () => Promise.resolve(),
      }

      return (mockedRunner as unknown) as YarnRunner
    })

    packageManager = new YarnPackageManager()
  })

  it('should be created', () => {
    expect(packageManager).toBeInstanceOf(YarnPackageManager)
  })

  it('should have the correct cli commands', () => {
    const expectedValues: PackageManagerCommands = {
      install: 'add',
      installWorkspace: expect.any(Function),
      uninstall: 'remove',
      uninstallWorkspace: expect.any(Function),
      saveFlag: '',
      saveDevFlag: '-D',
      exactFlag: '-E',
      rootFlag: '-W',
    }

    expect(packageManager.cli).toMatchObject(expectedValues)
  })

  describe('install', () => {
    it('should use the proper command for installing', async () => {
      const spy = jest.spyOn((packageManager as any).runner, 'run')

      await packageManager.install({
        dependencies: ['one', 'two'],
      })
      expect(spy).toBeCalledWith('add -W one two --silent', true)

      await packageManager.install({
        dependencies: ['one', 'two'],
        saveType: 'prod',
      })
      expect(spy).toBeCalledWith('add -W one two --silent', true)

      await packageManager.install({
        dependencies: ['one', 'two'],
        saveType: 'dev',
      })
      expect(spy).toBeCalledWith('add -D -W one two --silent', true)

      await packageManager.install({
        dependencies: ['one', 'two'],
        workspace: 'foo',
      })
      expect(spy).toBeCalledWith('workspace foo add one two --silent', true)
    })
  })

  describe('uninstall', () => {
    it('should use the proper command for uninstalling', async () => {
      const spy = jest.spyOn((packageManager as any).runner, 'run')

      await packageManager.uninstall({
        dependencies: ['one', 'two'],
      })
      expect(spy).toBeCalledWith('remove -W one two --silent', true)

      await packageManager.uninstall({
        dependencies: ['one', 'two'],
        saveType: 'prod',
      })
      expect(spy).toBeCalledWith('remove -W one two --silent', true)

      await packageManager.uninstall({
        dependencies: ['one', 'two'],
        saveType: 'dev',
      })
      expect(spy).toBeCalledWith('remove -W one two --silent', true)

      await packageManager.uninstall({
        dependencies: ['one', 'two'],
        workspace: 'foo',
      })
      expect(spy).toBeCalledWith('workspace foo remove one two --silent', true)
    })
  })
})
